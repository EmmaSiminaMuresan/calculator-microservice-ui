from sqlalchemy.orm import Session
from . import models

def log_request(db: Session, operation: str, input_str: str, result: float):
    record = models.Request(
        operation=operation, input=input_str, result=result
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record