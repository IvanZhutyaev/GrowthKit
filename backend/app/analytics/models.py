from datetime import date

from sqlalchemy import BigInteger, Date, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from ..auth.models import Channel


class ChannelMetrics(Base):
    __tablename__ = "channel_metrics"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    channel_id: Mapped[int] = mapped_column(ForeignKey("channels.id", ondelete="CASCADE"))
    date: Mapped[date] = mapped_column(Date, index=True)
    subscribers: Mapped[int] = mapped_column(Integer)
    views: Mapped[int] = mapped_column(BigInteger)
    posts: Mapped[int] = mapped_column(Integer)
    reactions: Mapped[int] = mapped_column(Integer)

    channel: Mapped[Channel] = relationship()

