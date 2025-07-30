from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from .database import Base

class Request(Base):
    __tablename__ = 'requests'

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, index=True)
    input = Column(String)
    result = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())