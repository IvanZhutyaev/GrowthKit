from functools import lru_cache

from pydantic import BaseSettings, AnyUrl


class Settings(BaseSettings):
    app_name: str = "GrowthKit"
    debug: bool = False
    database_url: AnyUrl
    redis_url: AnyUrl | None = None
    telegram_bot_token: str | None = None
    openai_api_key: str | None = None
    allowed_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()

