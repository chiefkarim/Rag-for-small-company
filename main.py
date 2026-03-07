from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Request
from starlette.responses import HTMLResponse
from databases.db import DatabaseConfig
from infrastructure.vector_store_provider import VectorStoreProvider
from deps import get_vectore_store
from models.department import Department
from models.query_request import QueryRequest
from services import query as queryService
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from routes.projects import router as projects_router
from routes.users import router as users_router
from routes.users_projects import router as users_projects_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db = DatabaseConfig()
    app.state.vector_store = VectorStoreProvider()
    yield


app = FastAPI(lifespan=lifespan)


templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="./static/"), name="static")
app.include_router(projects_router)
app.include_router(users_router)
app.include_router(users_projects_router)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    departments = [d.value for d in Department]
    return templates.TemplateResponse(
        "query.html",
        {"request": request, "departments": departments},
    )


@app.post("/query")
async def Query(payload: QueryRequest, vectore_store=Depends(get_vectore_store)):
    return queryService.query(
        vectore_store=vectore_store, query=payload.query, user_filters=payload.filters
    )
