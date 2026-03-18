import logging
import base64
import time
from io import BytesIO
from pathlib import Path
from typing import ClassVar, Iterable, List, Optional, Type
import requests
from PIL import Image
import tenacity

from docling_core.types.doc import BoundingBox, CoordOrigin
from docling_core.types.doc.page import BoundingRectangle, TextCell

from docling.datamodel.accelerator_options import AcceleratorOptions
from docling.datamodel.base_models import Page
from docling.datamodel.document import ConversionResult
from docling.datamodel.pipeline_options import OcrOptions
from docling.models.base_ocr_model import BaseOcrModel
from docling.utils.profiling import TimeRecorder

from infrastructure.config import get_settings

_log = logging.getLogger(__name__)

class VlmOcrOptions(OcrOptions):
    kind: ClassVar[str] = "vlm_ocr"
    lang: List[str] = []
    model_name: Optional[str] = None  # Sourced from settings if not provided
    api_key: Optional[str] = None
    prompt: str = "Provide a detailed transcription of all text within this image. Output only the transcribed text, maintaining the original layout and structure as much as possible."

class VlmOcrModel(BaseOcrModel):
    def __init__(
        self,
        *,
        enabled: bool,
        artifacts_path: Optional[Path],
        options: VlmOcrOptions,
        accelerator_options: AcceleratorOptions,
    ):
        super().__init__(
            enabled=enabled,
            artifacts_path=artifacts_path,
            options=options,
            accelerator_options=accelerator_options,
        )
        self.options: VlmOcrOptions  # type: ignore
        self.settings = get_settings()
        self.api_key = self.options.api_key or self.settings.OPENROUTER_API_KEY
        self.model_name = self.options.model_name or self.settings.OCR_MODEL_NAME
        
        if not self.api_key:
            _log.warning("OPENROUTER_API_KEY not found. VlmOcrModel will be disabled.")
            self.enabled = False
        
        if not self.model_name:
            _log.warning("OCR_MODEL_NAME not found in settings. VlmOcrModel will be disabled.")
            self.enabled = False

    @tenacity.retry(
        wait=tenacity.wait_exponential(multiplier=2, min=5, max=20),
        stop=tenacity.stop_after_attempt(5),
        retry=tenacity.retry_if_exception_type(requests.exceptions.HTTPError),
        before_sleep=lambda retry_state: _log.info(f"Retrying OpenRouter call... (attempt {retry_state.attempt_number})")
    )
    def _call_openrouter(self, payload: dict, headers: dict) -> str:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )
        try:
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            if e.response is not None:
                _log.error(f"OpenRouter API Error: {e.response.text}")
            raise e
            
        result = response.json()
        return result["choices"][0]["message"]["content"]

    def __call__(
        self, conv_res: ConversionResult, page_batch: Iterable[Page]
    ) -> Iterable[Page]:
        if not self.enabled:
            yield from page_batch
            return

        for page in page_batch:
            assert page._backend is not None
            if not page._backend.is_valid():
                yield page
                continue

            with TimeRecorder(conv_res, "ocr"):
                
                # --- Fallback Strategy: Skip if digital text already exists ---
                if getattr(self.options, 'force_full_page_ocr', False) is False:
                    # Collect existing programmatic text from the page
                    existing_text = "".join([c.text for c in getattr(page, 'cells', []) if getattr(c, 'text', None)])
                    if len(existing_text.strip()) > 50:
                        _log.info(f"Page {page.page_no}: Digital text detected natively. Skipping VLM OCR.")
                        yield page
                        continue

                # Small delay to respect rate limits between pages
                if page.page_no > 1:
                    time.sleep(3.0)

                # Get the full page image
                scale = 2.0
                full_image = page._backend.get_page_image(scale=scale)
                
                buffered = BytesIO()
                full_image.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
                
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://github.com/DS4SD/docling",
                    "X-Title": "Docling Custom VLM OCR"
                }
                
                payload = {
                    "model": self.model_name,
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": self.options.prompt
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/png;base64,{img_str}"
                                    }
                                }
                            ]
                        }
                    ]
                }
                
                try:
                    transcribed_text = self._call_openrouter(payload, headers)
                    
                    page_size = page._backend.get_size()
                    cell = TextCell(
                        index=0,
                        text=transcribed_text,
                        orig=transcribed_text,
                        from_ocr=True,
                        confidence=1.0,
                        rect=BoundingRectangle.from_bounding_box(
                            BoundingBox(
                                l=0, t=0, r=page_size.width, b=page_size.height,
                                coord_origin=CoordOrigin.TOPLEFT
                            )
                        )
                    )
                    
                    self.post_process_cells([cell], page)
                    _log.info(f"Page {page.page_no}: Successfully performed OCR with {self.model_name}")
                    
                except Exception as e:
                    _log.error(f"Error performing OCR with {self.model_name} on page {page.page_no}: {e}")
                
            yield page

    @classmethod
    def get_options_type(cls) -> Type[OcrOptions]:
        return VlmOcrOptions
