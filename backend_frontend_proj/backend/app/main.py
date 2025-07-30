# backend/app/main.py

import os
from dotenv import load_dotenv

from fastapi import FastAPI, Depends, HTTPException, Header, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine, Base
from . import crud, utils, models
from .schemas import CalcRequest, CalcResponse

# ─── Load env ─────────────────────────────
load_dotenv()
API_KEY = os.getenv("API_KEY", "")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

# ─── Ensure tables exist ───────────────────
Base.metadata.create_all(bind=engine)

# ─── App & CORS ────────────────────────────
app = FastAPI(title="Calculator API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Dependencies ──────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def api_key_header(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")

# ─── Endpoints ─────────────────────────────

@app.post(
    "/pow",
    response_model=CalcResponse,
    dependencies=[Depends(api_key_header)]
)
async def compute_pow(
    req: CalcRequest,
    db: Session = Depends(get_db),
):
    y = req.y or 0.0
    result = req.x ** y
    crud.log_request(db, "pow", f"x={req.x},y={y}", result)
    return {"operation": "pow", "result": result}


@app.post(
    "/fibonacci/{n}",
    response_model=CalcResponse,
    dependencies=[Depends(api_key_header)]
)
async def compute_fibonacci(
    n: int = Path(..., ge=0),
    db: Session = Depends(get_db),
):
    result = utils.fib(n)
    crud.log_request(db, "fibonacci", f"n={n}", float(result))
    return {"operation": "fibonacci", "result": float(result)}


@app.post(
    "/factorial/{n}",
    response_model=CalcResponse,
    dependencies=[Depends(api_key_header)]
)
async def compute_factorial(
    n: int = Path(..., ge=0),
    db: Session = Depends(get_db),
):
    result = utils.fact(n)
    crud.log_request(db, "factorial", f"n={n}", float(result))
    return {"operation": "factorial", "result": float(result)}
