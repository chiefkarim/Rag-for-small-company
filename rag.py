from llama_index.core import StorageContext, load_index_from_storage, Settings
from llama_index.embeddings.fastembed import FastEmbedEmbedding
from llama_index.core.postprocessor import SentenceTransformerRerank
from utils import dump_json

Settings.embed_model = FastEmbedEmbedding(
    model_name="BAAI/bge-small-en-v1.5",
    local_files_only=False,
)

storage_context = StorageContext.from_defaults(persist_dir="./indexed-data/")
index = load_index_from_storage(storage_context=storage_context)

retriever = index.as_retriever(similarity_top_k=10)
query = "what is the link to the specs for the http protocol?"
nodes = retriever.retrieve(query)

reranking_post_processor = SentenceTransformerRerank(
    model="ibm-granite/granite-embedding-reranker-english-r2",
    top_n=3,
)
reranked_nodes = reranking_post_processor.postprocess_nodes(nodes, query_str=query)
dump_json("reranked.json", reranked_nodes)
