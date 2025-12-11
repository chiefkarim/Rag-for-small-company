from llama_index.core import StorageContext, load_index_from_storage, Settings
from llama_index.embeddings.fastembed import FastEmbedEmbedding
from utils import dump_json

Settings.embed_model = FastEmbedEmbedding(
    model_name="BAAI/bge-small-en-v1.5",
    local_files_only=False,
)

storage_context = StorageContext.from_defaults(persist_dir="./indexed-data/")
index = load_index_from_storage(storage_context=storage_context)

query = "Where can i find the specs for the http protocol?"
retriever = index.as_retriever()
retrieved_nodes = retriever.retrieve(query)
dump_json("result.json", retrieved_nodes)
