from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from models.query_request import QueryRequest
from services import query as queryService

app = FastAPI()

templates = Jinja2Templates(directory="templates")


@app.post("/query")
async def Query(payload: QueryRequest):
    return queryService.query(payload.query, user_filters=payload.filters)
