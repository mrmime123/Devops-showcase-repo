from sqlalchemy.orm import Session

from backend.schemas import skills_schema as schemas
from backend.models import skills_model as models_skills
from backend.models import skills_model as models_skills

def get_skills_by_category(db: Session, category_id: int):
    return db.query(models_skills.Skill).filter(models_skills.Skill.category_id == category_id).all()

def get_all_categories(db: Session):
    return db.query(models_skills.Category).all()

def create_category(db: Session, name: str):
    db_category = models_skills.Category(name=name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def create_skill(db: Session, skill: schemas.SkillCreate):
    db_skill = models_skills.Skill(
        name=skill.name,
        icon_name=skill.icon_name,
        category_id=skill.category_id
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill
