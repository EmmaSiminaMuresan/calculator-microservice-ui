# Calculator Microservice & React UI

A combined FastAPI microservice and React + Vite + TypeScript front‑end that provides a simple calculator with power, Fibonacci, and factorial endpoints. Built for clarity, extensibility, and a polished developer experience.

---

## 📺 Demo


https://github.com/user-attachments/assets/cbd1c9e2-6309-4f3c-a02b-f8a03fb92707


---

## 📋 Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Backend](#backend)

   * [Install & Run](#install--run)
5. [Frontend](#frontend)

   * [Install & Run](#install--run-1)
6. [API Reference](#api-reference)
7. [Testing](#testing)
8. [Code Quality](#code-quality)
9. [Extensibility](#extensibility)
10. [License](#license)

---

## ✨ Features

* **FastAPI** backend with three endpoints:

  * `POST /pow` → calculates xⁿ
  * `POST /fibonacci/{n}` → nth Fibonacci number
  * `POST /factorial/{n}` → n!
* **SQLite** for request logging
* **Pydantic** for data validation
* **API key** authentication & **CORS** support
* **React + Vite + TypeScript** front‑end with flip‑card UI
* Consistent style via **flake8**, **Prettier**, and **ESLint**

---

## 🔧 Prerequisites

* Python 3.8+
* Node.js 14+ and npm

---

## ⚙️ Environment Setup

Create `.env` files in each folder and add them to `.gitignore`.

**backend/.env**

```dotenv
DATABASE_URL=sqlite:///./requests.db
API_KEY=supersecretkey
FRONTEND_ORIGIN=http://localhost:3000
```

**frontend/.env**

```dotenv
VITE_API_URL=http://localhost:8000
```

---

## 🖥️ Backend

### Install & Run

```bash
cd backend
python -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows PowerShell
.venv\Scripts\Activate.ps1

pip install --upgrade pip
pip install -r requirements.txt

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🎨 Frontend

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

* UI: [http://localhost:3000](http://localhost:3000)

---

## 📖 API Reference

> All requests require header `x-api-key: supersecretkey`.

### 1. Power

```http
POST /pow
Content-Type: application/json

{ "x": number, "y": number }
```

**Response:** `{ "operation":"pow","result":number }`

### 2. Fibonacci

```http
POST /fibonacci/{n}
```

**Response:** `{ "operation":"fibonacci","result":number }`

### 3. Factorial

```http
POST /factorial/{n}
```

**Response:** `{ "operation":"factorial","result":number }`

---

## 🧪 Testing

Use Swagger UI or curl:

```bash
curl -X POST http://localhost:8000/pow \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: supersecretkey' \
  -d '{"x":2,"y":3}'
```

---

## ✅ Code Quality

* **Backend**: `flake8` (max‑length=88)
* **Frontend**: `Prettier` + `ESLint`

---

## 🚀 Extensibility

* Add caching (Redis) or message streaming (Kafka)
* Integrate metrics (Prometheus/Grafana)
* Swap SQLite for Postgres or another DB

---

*Happy coding!* 🚀

