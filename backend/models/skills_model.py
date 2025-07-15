from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    skills = relationship("Skill", back_populates="category")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    icon_name = Column(String, index=True)  # nombre del icono, por ejemplo 'FaCloud'
    category_id = Column(Integer, ForeignKey("categories.id"))

    category = relationship("Category", back_populates="skills")
