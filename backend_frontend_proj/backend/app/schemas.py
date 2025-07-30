from pydantic import BaseModel
from typing import Optional

class CalcRequest(BaseModel):
    x: float
    y: Optional[float] = None  # used only for pow

class CalcResponse(BaseModel):
    operation: str
    result: float