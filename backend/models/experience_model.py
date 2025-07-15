from sqlalchemy import Column, Integer, String
from backend.database import Base

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String)
    period = Column(String)
    description = Column(String)
