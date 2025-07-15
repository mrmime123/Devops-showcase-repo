from sqlalchemy.orm import Session
from backend.models import experience_model as models
from backend.schemas import experience_schema as schemas

def get_experiences(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Experience).offset(skip).limit(limit).all()

def create_experience(db: Session, experience: schemas.ExperienceCreate):
    db_experience = models.Experience(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience
