from typing import Optional
from llama_index.core import (
    VectorStoreIndex,
)
from qdrant_client.http.models import Filter

from infrastructure.vector_store_provider import VectorStoreProvider
from models.query_request import QueryFilters
from services.filter_handler import FilterHandlerFactory


def query(
    vectore_store: VectorStoreProvider,
    query: str,
    user_filters: Optional[QueryFilters] = None,
):
    must = []

    if user_filters:
        filter_handler = FilterHandlerFactory().filter_handler
        must = filter_handler.apply_filters(user_filters)

    qdrant_filters = Filter(must=must) if len(must) != 0 else None

    index = VectorStoreIndex.from_vector_store(
        vector_store=vectore_store.get_vector_store()
    )
    filters = {"qdrant_filters": qdrant_filters} if qdrant_filters else {}
    retriever = index.as_retriever(vector_store_kwargs=(filters))
    return retriever.retrieve(query)
