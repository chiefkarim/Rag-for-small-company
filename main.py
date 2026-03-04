from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from services import query as queryService

app = FastAPI()

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def QueryForm(request: Request):
    return templates.TemplateResponse("query.html", {"request": request})


@app.post("/query")
async def Query(query: str = Form(...), department: str = Form(...)):
    return queryService.query(query, user_filters={"department": department})
