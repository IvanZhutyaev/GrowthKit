from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .db import engine, Base
from .auth.router import router as auth_router
from .analytics.router import router as analytics_router
from .channel_search.router import router as channel_search_router
from .ai_content.router import router as ai_content_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, debug=settings.debug, lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
    app.include_router(channel_search_router, prefix="/channel-search", tags=["channel_search"])
    app.include_router(ai_content_router, prefix="/ai-content", tags=["ai_content"])
    return app


app = create_app()

