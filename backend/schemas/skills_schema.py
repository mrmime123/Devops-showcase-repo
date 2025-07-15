from pydantic import BaseModel, ConfigDict

class SkillBase(BaseModel):
    name: str
    icon_name: str

class SkillCreate(SkillBase):
    category_id: int

class Skill(SkillBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)

class SkillGroup(BaseModel):
    category: str
    skills: list[Skill]
