from llama_index.core import (
    VectorStoreIndex,
)
from infrastructure.vector_store_provider import VectorStoreProvider


def query(query: str):
    provider = VectorStoreProvider()

    index = VectorStoreIndex.from_vector_store(vector_store=provider.get_vector_store())

    retriever = index.as_retriever()
    retrieved_nodes = retriever.retrieve(query)
    return retrieved_nodes
