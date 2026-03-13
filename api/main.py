"""
ABA 509 Data API
FastAPI backend — loads all 12 CSV datasets into memory on startup,
serves them via a clean REST API.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

DATA_DIR = Path(__file__).parent.parent  # /compare509/
DICT_PATH = DATA_DIR / "column_dictionary.json"

DATASETS: dict[str, dict] = {
    "employment": {
        "file": "aba_509_employment_all_schools.csv",
        "label": "Employment Outcomes",
        "school_col": "schoolname",
        "year_col": "cohort",
    },
    "bar_passage_firsttime": {
        "file": "bar_passage_firsttime.csv",
        "label": "Bar Passage — First Time",
        "school_col": "School Name",
        "year_col": "SchoolYear",
    },
    "bar_passage_ultimate": {
        "file": "bar_passage_ultimate.csv",
        "label": "Bar Passage — Two-Year Ultimate",
        "school_col": "School Name",
        "year_col": "SchoolYear",
    },
    "basics": {
        "file": "509_basics.csv",
        "label": "The Basics / Academic Calendar",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "firstyearclass": {
        "file": "509_firstyearclass.csv",
        "label": "First Year Class",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "curriculum": {
        "file": "509_curriculum.csv",
        "label": "Curricular Offerings",
        "school_col": "School Name",
        "year_col": "SchoolYear",
    },
    "faculty": {
        "file": "509_faculty.csv",
        "label": "Faculty Resources",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "diversity": {
        "file": "509_diversity.csv",
        "label": "JD Enrollment and Ethnicity",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "scholarships": {
        "file": "509_scholarships.csv",
        "label": "Grants and Scholarships",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "tuition": {
        "file": "509_tuition.csv",
        "label": "Tuition, Fees & Living Expenses",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "attrition": {
        "file": "509_attrition.csv",
        "label": "Attrition",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
    "transfers": {
        "file": "509_transfers.csv",
        "label": "Transfers",
        "school_col": "SchoolName",
        "year_col": "SchoolYear",
    },
}

# ---------------------------------------------------------------------------
# App + CORS
# ---------------------------------------------------------------------------

app = FastAPI(
    title="ABA 509 Data API",
    description="Query ABA-required law school disclosure data (2022–2025).",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# In-memory store (populated on startup)
# ---------------------------------------------------------------------------

_frames: dict[str, pd.DataFrame] = {}
_column_dict: dict[str, Any] = {}


@app.on_event("startup")
def load_data() -> None:
    # Load column dictionary
    if DICT_PATH.exists():
        with open(DICT_PATH) as f:
            _column_dict.update(json.load(f))

    # Load each CSV
    for key, cfg in DATASETS.items():
        path = DATA_DIR / cfg["file"]
        if path.exists():
            df = pd.read_csv(path, dtype=str, keep_default_na=False)
            # Normalise NaN-like strings
            df.replace({"nan": None, "NaN": None, "": None}, inplace=True)
            _frames[key] = df
        else:
            print(f"[WARN] Missing file: {path}")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _df(key: str) -> pd.DataFrame:
    if key not in _frames:
        raise HTTPException(status_code=404, detail=f"Dataset '{key}' not found.")
    return _frames[key]


def _school_col(key: str) -> str:
    return DATASETS[key]["school_col"]


def _year_col(key: str) -> str:
    return DATASETS[key]["year_col"]


def _rows_to_records(df: pd.DataFrame) -> list[dict]:
    """Convert dataframe to JSON-serialisable records, dropping None values."""
    return [
        {k: v for k, v in row.items() if v is not None}
        for row in df.to_dict(orient="records")
    ]


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.get("/", tags=["meta"])
def root():
    return {
        "message": "ABA 509 Data API",
        "docs": "/docs",
        "endpoints": [
            "/datasets",
            "/schools",
            "/data/{dataset}",
            "/school/{school_name}",
            "/columns/{dataset}",
            "/dictionary",
        ],
    }


# ── Meta ─────────────────────────────────────────────────────────────────────


@app.get("/datasets", tags=["meta"])
def list_datasets():
    """List all available datasets with key, label, and available years."""
    result = []
    for key, cfg in DATASETS.items():
        if key not in _frames:
            continue
        df = _frames[key]
        yr_col = cfg["year_col"]
        years = sorted(df[yr_col].dropna().unique().tolist()) if yr_col in df.columns else []
        result.append(
            {
                "key": key,
                "label": cfg["label"],
                "rows": len(df),
                "columns": len(df.columns),
                "years": years,
            }
        )
    return result


@app.get("/schools", tags=["meta"])
def list_schools(
    dataset: str = Query("basics", description="Dataset key to pull school names from"),
):
    """Return a sorted list of all unique school names."""
    df = _df(dataset)
    col = _school_col(dataset)
    if col not in df.columns:
        raise HTTPException(status_code=400, detail=f"School column '{col}' not in dataset.")
    schools = sorted(df[col].dropna().unique().tolist())
    return {"count": len(schools), "schools": schools}


@app.get("/columns/{dataset}", tags=["meta"])
def list_columns(dataset: str):
    """Return all column names for a dataset with their human-readable labels."""
    df = _df(dataset)
    file_key = DATASETS[dataset]["file"]
    col_dict = _column_dict.get(file_key, {}).get("columns", {})
    return [
        {"column": col, "label": col_dict.get(col, col)}
        for col in df.columns
    ]


@app.get("/dictionary", tags=["meta"])
def get_full_dictionary():
    """Return the full column dictionary for all files."""
    return _column_dict


# ── Data queries ─────────────────────────────────────────────────────────────


@app.get("/data/{dataset}", tags=["data"])
def query_dataset(
    dataset: str,
    school: str | None = Query(None, description="Filter by school name (partial, case-insensitive)"),
    year: str | None = Query(None, description="Filter by year (e.g. 2023)"),
    columns: str | None = Query(None, description="Comma-separated list of columns to return"),
    limit: int = Query(100, ge=1, le=5000, description="Max rows to return"),
    offset: int = Query(0, ge=0, description="Row offset for pagination"),
):
    """
    Query any dataset with optional filters.

    - **school**: partial name match (case-insensitive)
    - **year**: exact year match
    - **columns**: comma-separated column names to include
    - **limit** / **offset**: pagination
    """
    df = _df(dataset).copy()

    if school:
        col = _school_col(dataset)
        if col in df.columns:
            df = df[df[col].str.contains(school, case=False, na=False)]

    if year:
        col = _year_col(dataset)
        if col in df.columns:
            df = df[df[col].astype(str) == str(year)]

    if columns:
        requested = [c.strip() for c in columns.split(",")]
        valid = [c for c in requested if c in df.columns]
        if not valid:
            raise HTTPException(status_code=400, detail="None of the requested columns exist.")
        df = df[valid]

    total = len(df)
    df = df.iloc[offset : offset + limit]

    return {
        "dataset": dataset,
        "total": total,
        "offset": offset,
        "limit": limit,
        "rows": _rows_to_records(df),
    }


@app.get("/school/{school_name}", tags=["data"])
def get_school_all_datasets(
    school_name: str,
    year: str | None = Query(None, description="Filter by year"),
):
    """
    Return data for a specific school across ALL datasets.
    Uses exact match first, falls back to case-insensitive partial match.
    """
    result: dict[str, Any] = {"school": school_name, "year": year, "datasets": {}}

    for key, cfg in DATASETS.items():
        if key not in _frames:
            continue
        df = _frames[key].copy()
        col = cfg["school_col"]

        if col not in df.columns:
            continue

        # exact match first
        mask = df[col].str.lower() == school_name.lower()
        if not mask.any():
            # partial fallback
            mask = df[col].str.contains(school_name, case=False, na=False)

        df = df[mask]

        if year:
            yr_col = cfg["year_col"]
            if yr_col in df.columns:
                df = df[df[yr_col].astype(str) == str(year)]

        if not df.empty:
            result["datasets"][key] = {
                "label": cfg["label"],
                "rows": _rows_to_records(df),
            }

    if not result["datasets"]:
        raise HTTPException(status_code=404, detail=f"No data found for '{school_name}'.")

    return result


@app.get("/compare", tags=["data"])
def compare_schools(
    schools: str = Query(..., description="Comma-separated school names"),
    dataset: str = Query("firstyearclass", description="Dataset key"),
    year: str | None = Query(None, description="Filter by year"),
    columns: str | None = Query(None, description="Comma-separated column names"),
):
    """
    Compare multiple schools side-by-side within a single dataset.
    """
    df = _df(dataset).copy()
    school_col = _school_col(dataset)
    school_list = [s.strip() for s in schools.split("|") if s.strip()]

    combined = pd.DataFrame()
    for s in school_list:
        sub = df[df[school_col].str.lower() == s.lower()]
        combined = pd.concat([combined, sub], ignore_index=True)

    if year:
        yr_col = _year_col(dataset)
        if yr_col in combined.columns:
            combined = combined[combined[yr_col].astype(str) == str(year)]

    if columns:
        requested = [c.strip() for c in columns.split(",")]
        valid = [c for c in requested if c in combined.columns]
        if valid:
            # always keep school + year cols
            keep_cols = [school_col, _year_col(dataset)] + [c for c in valid if c not in (school_col, _year_col(dataset))]
            combined = combined[[c for c in keep_cols if c in combined.columns]]

    return {
        "dataset": dataset,
        "schools": school_list,
        "year": year,
        "rows": _rows_to_records(combined),
    }
