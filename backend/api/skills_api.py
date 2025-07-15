# backend/app/api/skills.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models import skills_model as modelSkills
from backend.schemas import skills_schema as schemaSkills
from backend.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemaSkills.SkillGroup])
def read_skills(db: Session = Depends(get_db)):
    categories = db.query(modelSkills.Category).all()
    skill_groups = []
    for category in categories:
        skill_groups.append(
            schemaSkills.SkillGroup(
                category=category.name,
                skills=[
                    schemaSkills.Skill.model_validate(skill, from_attributes=True)
                    for skill in category.skills
                ]
            )
        )
    return skill_groups

