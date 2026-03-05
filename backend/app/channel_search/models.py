from sqlalchemy import BigInteger, String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class SearchableChannel(Base):
    __tablename__ = "searchable_channels"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    telegram_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    username: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    subscribers: Mapped[int] = mapped_column(Integer)
    engagement_rate: Mapped[float] = mapped_column()

