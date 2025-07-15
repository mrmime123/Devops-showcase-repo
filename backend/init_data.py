# backend/init_data.py

from backend.database import SessionLocal, engine
from backend.models import skills_model as models_skills
from backend.crud import skills_crud as crud_skills
from backend.models import experience_model as models_exp
from backend.crud import experience_crud as crud_exp
from backend.schemas import experience_schema as schemas_exp

def init_db():
    models_skills.Base.metadata.create_all(bind=engine)
    models_exp.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Categorías
    categories = [
        "Cloud & Infraestructura", "CI/CD & DevOps", 
        "Bases de datos & Mensajería", "Seguridad & Redes", "Observabilidad"
    ]
    category_objs = {}
    for cat_name in categories:
        cat = db.query(models_skills.Category).filter_by(name=cat_name).first()
        if not cat:
            cat = crud_skills.create_category(db, cat_name)
        category_objs[cat_name] = cat

    # Skills
    skills_data = {
        "Cloud & Infraestructura": [
            {"name": "AWS", "icon_name": "FaCloud"},
            {"name": "GCP", "icon_name": "FaCloud"},
            {"name": "Docker", "icon_name": "FaCubes"},
            {"name": "Kubernetes", "icon_name": "FaCogs"},
            {"name": "Terraform", "icon_name": "SiTerraform"},
        ],
        "CI/CD & DevOps": [
            {"name": "GitOps", "icon_name": "FaCode"},
            {"name": "ArgoCD", "icon_name": "SiArgo"},
            {"name": "Argo Events", "icon_name": "SiArgo"},
            {"name": "Argo Workflows", "icon_name": "SiArgo"},
            {"name": "Scripting", "icon_name": "FaTerminal"},
            {"name": "Crossplane", "icon_name": "FaCogs"},
            {"name": "GitHub Actions", "icon_name": "SiGithubactions"},
            {"name": "CI/CD", "icon_name": "FaCogs"},
        ],
        "Bases de datos & Mensajería": [
            {"name": "MongoDB", "icon_name": "SiMongodb"},
            {"name": "PostgreSQL", "icon_name": "SiPostgresql"},
            {"name": "Redis", "icon_name": "SiRedis"},
            {"name": "Kafka", "icon_name": "SiApachekafka"},
        ],
        "Seguridad & Redes": [
            {"name": "Ciberseguridad", "icon_name": "FaShieldAlt"},
            {"name": "Redes", "icon_name": "FaNetworkWired"},
            {"name": "Firewall", "icon_name": "FaLock"},
            {"name": "VPN", "icon_name": "FaWifi"},
            {"name": "DNS", "icon_name": "FaCode"},
            {"name": "Routing", "icon_name": "FaRoute"},
        ],
        "Observabilidad": [
            {"name": "Stack Monitoring", "icon_name": "FaChartLine"},
            {"name": "Prometheus", "icon_name": "SiPrometheus"},
            {"name": "Grafana", "icon_name": "SiGrafana"},
            {"name": "Alloy", "icon_name": "FaChartLine"},
            {"name": "Mimir", "icon_name": "FaChartLine"},
            {"name": "Tempo", "icon_name": "FaChartLine"},
            {"name": "Loki", "icon_name": "FaChartLine"},
        ],
    }

    for cat_name, skills in skills_data.items():
        cat = category_objs[cat_name]
        for skill in skills:
            exists = db.query(models_skills.Skill).filter_by(name=skill["name"], category_id=cat.id).first()
            if not exists:
                crud_skills.create_skill(
                    db,
                    skill=crud_skills.schemas.SkillCreate(
                        name=skill["name"],
                        icon_name=skill["icon_name"],
                        category_id=cat.id,
                    ),
                )

    # Experiencia
    experiences_data = [
        {
            "title": "DevOps Engineer", "company": "INARI.IO", "period": "Actualidad",
            "description": "Gestiono infraestructuras cloud y pipelines CI/CD para proyectos escalables.",
        },
        {
            "title": "Analista de Ciberseguridad", "company": "EY Technology Solutions", "period": "Previo",
            "description": "Monitoreo y análisis de seguridad para proteger activos digitales.",
        },
        {
            "title": "Consultor de Seguridad SAP", "company": "Everis", "period": "Previo",
            "description": "Implementación de controles y auditorías en entornos SAP.",
        },
        {
            "title": "Becario de Proyectos", "company": "Everis", "period": "Previo",
            "description": "Colaboración en desarrollo y testing de proyectos TI.",
        },
        {
            "title": "Personal Técnico", "company": "Linkia FP", "period": "Previo",
            "description": "Soporte técnico y mantenimiento de sistemas educativos.",
        },
        {
            "title": "Técnico de Redes", "company": "Turun yliopisto - University of Turku", "period": "Previo",
            "description": "Administración de redes y soporte en infraestructura universitaria.",
        },
        {
            "title": "IT Helpdesk", "company": "Jaime Mascaro", "period": "Previo",
            "description": "Atención y resolución de incidencias IT.",
        },
    ]

    for exp in experiences_data:
        exists = db.query(models_exp.Experience).filter_by(title=exp["title"], company=exp["company"]).first()
        if not exists:
            crud_exp.create_experience(
                db,
                experience=schemas_exp.ExperienceCreate(**exp)
            )

    db.close()
    print("✅ Base de datos inicializada con categorías, skills y experiencias")
