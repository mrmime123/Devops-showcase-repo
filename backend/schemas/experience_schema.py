from pydantic import BaseModel, ConfigDict

class ExperienceBase(BaseModel):
    title: str
    company: str
    period: str
    description: str

class ExperienceCreate(ExperienceBase):
    pass

class Experience(ExperienceBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
