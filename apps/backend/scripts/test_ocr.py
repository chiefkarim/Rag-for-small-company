import logging
import sys
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.models.factories import get_ocr_factory
from features.ingestion.custom_ocr import VlmOcrModel, VlmOcrOptions

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s:%(message)s")
_log = logging.getLogger("enterprise-rag")

def test_custom_ocr():
    # 1. Register the custom VLM OCR model on BOTH instances to be safe
    # Docling's singleton factory behavior can be flaky in test scripts
    for allow_ext in [False, True]:
        factory = get_ocr_factory(allow_external_plugins=allow_ext)
        if "vlm_ocr" not in factory.registered_kind:
            factory.register(VlmOcrModel, plugin_name="custom", plugin_module_name="features.ingestion.custom_ocr")
    
    # 2. Verify registration
    factory = get_ocr_factory(allow_external_plugins=True)
    registered_engines = factory.registered_kind
    _log.info(f"Registered engines: {registered_engines}")

    # 3. Configure Pipeline Options
    pipeline_options = PdfPipelineOptions()
    pipeline_options.do_ocr = True
    pipeline_options.allow_external_plugins = True
    
    pipeline_options.ocr_options = VlmOcrOptions()
    pipeline_options.ocr_options.force_full_page_ocr = False
    
    _log.info(f"OCR Options kind: {pipeline_options.ocr_options.kind}")

    # 4. Create Converter
    converter = DocumentConverter(
        format_options={
            InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
        }
    )

    # 5. Run conversion
    pdf_path = "test_data/departments/general/fakeit.pdf"
    _log.info(f"Starting conversion for {pdf_path} (Model from settings/env)...")
    
    try:
        result = converter.convert(pdf_path)
        markdown_output = result.document.export_to_markdown()
        
        _log.info("Conversion complete!")
        _log.info(f"Markdown length: {len(markdown_output)}")
        
        if len(markdown_output) > 100:
            _log.info("SUCCESS: OCR output generated successfully.")
            print("\n--- TRANSCRIPTION PREVIEW ---\n")
            print(markdown_output[-500:])
            print("\n---\n")
        else:
            _log.error("FAILED: Generated markdown is suspiciously short.")
            
    except Exception as e:
        _log.error(f"FAILED: An error occurred during conversion: {e}")

if __name__ == "__main__":
    test_custom_ocr()
