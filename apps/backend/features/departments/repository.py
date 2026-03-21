from sqlalchemy import select
from sqlalchemy.orm import Session
from features.departments.models import DepartmentModel
from infrastructure.databases.orm import Department

def get_departments(db: Session) -> list[DepartmentModel]:
    rows = db.scalars(select(Department)).all()
    return [DepartmentModel.model_validate(row) for row in rows]

def get_department_by_id(db: Session, id: int) -> DepartmentModel | None:
    row = db.get(Department, id)
    return DepartmentModel.model_validate(row) if row else None

def create_department(db: Session, name: str) -> DepartmentModel | None:
    new_dept = Department(name=name)
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)
    return DepartmentModel.model_validate(new_dept)

def update_department(db: Session, id: int, name: str) -> DepartmentModel | None:
    dept = db.query(Department).filter(Department.id == id).first()
    if dept:
        dept.name = name
        db.commit()
        db.refresh(dept)
        return DepartmentModel.model_validate(dept)
    return None

def delete_department(db: Session, id: int) -> bool:
    dept = db.get(Department, id)
    if dept:
        db.delete(dept)
        db.commit()
        return True
    return False
