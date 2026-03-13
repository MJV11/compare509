"""
ABA 509 Full Data Harvester
============================
Downloads ALL available structured data from the ABA Required Disclosures API
for all ABA-accredited law schools, across 3 class years.

DATASETS COLLECTED:
  1. employment_outcomes.csv  — from scrape_509.py (already running separately)
  2. bar_passage_firsttime.csv  — first-time bar passage rates
  3. bar_passage_ultimate.csv   — two-year ultimate bar passage rates
  4. 509_basics.csv             — school basics, academic calendar
  5. 509_firstyearclass.csv     — 1L class size, LSAT, GPA
  6. 509_curriculum.csv         — curricular offerings
  7. 509_faculty.csv            — faculty resources
  8. 509_diversity.csv          — JD enrollment by race/ethnicity/gender (244 cols!)
  9. 509_scholarships.csv       — grants and scholarships
  10. 509_tuition.csv           — tuition, fees, living expenses, conditional scholarships
  11. 509_attrition.csv         — attrition data
  12. 509_transfers.csv         — transfers in/out

Each dataset has one row per school per year, keyed on SchoolName + SchoolYear.

USAGE:
    python3 scrape_all_509.py                    # 2023, 2022, 2021
    python3 scrape_all_509.py --years 2023 2022  # specific years
    python3 scrape_all_509.py --section bar      # only bar passage
    python3 scrape_all_509.py --section diversity # only enrollment/diversity

REQUIREMENTS:
    pip install requests pandas openpyxl
"""

import argparse
import os
import sys
import time

import pandas as pd
import requests
from io import BytesIO

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

DEFAULT_YEARS = [2023, 2022, 2021]
REQUEST_DELAY = 0.5

BASE_API = "https://backend.abarequireddisclosures.org/api/"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Referer": "https://abarequireddisclosures.org/",
    "Origin":  "https://abarequireddisclosures.org",
}

# ---------------------------------------------------------------------------
# Dataset definitions
# Each entry: (key, label, endpoint, extra_params_fn, output_file)
# ---------------------------------------------------------------------------

def _std509_params(year, section_name):
    return {"year": year, "scetionName": section_name}   # note the typo in the API

def _bar_params(year, section_name):
    return {"year": year, "sectionName": section_name}   # bar passage has correct spelling

DATASETS = [
    # (key, display_name, endpoint_path, section_name, output_csv)
    (
        "bar_firsttime",
        "Bar Passage — First Time",
        "BarPassageOutcomes/GenerateBarPassageCompilationReport",
        "First Time Bar Passage",
        "bar_passage_firsttime.csv",
        _bar_params,
    ),
    (
        "bar_ultimate",
        "Bar Passage — Two-Year Ultimate",
        "BarPassageOutcomes/GenerateBarPassageCompilationReport",
        "Two-Year Ultimate Bar Passage",
        "bar_passage_ultimate.csv",
        _bar_params,
    ),
    (
        "basics",
        "The Basics / Academic Calendar",
        "AnnualQuestionnaire/GetAllCompilationData",
        "The Basics/Academic Calendar",
        "509_basics.csv",
        _std509_params,
    ),
    (
        "firstyear",
        "First Year Class (LSAT/GPA/Size)",
        "AnnualQuestionnaire/GetAllCompilationData",
        "First Year Class",
        "509_firstyearclass.csv",
        _std509_params,
    ),
    (
        "curriculum",
        "Curricular Offerings",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Curricular Offerings",
        "509_curriculum.csv",
        _std509_params,
    ),
    (
        "faculty",
        "Faculty Resources",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Faculty Resources",
        "509_faculty.csv",
        _std509_params,
    ),
    (
        "diversity",
        "JD Enrollment and Ethnicity (Diversity)",
        "AnnualQuestionnaire/GetAllCompilationData",
        "JD Enrollment and Ethnicity",
        "509_diversity.csv",
        _std509_params,
    ),
    (
        "scholarships",
        "Grants and Scholarships",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Grants and Scholarships",
        "509_scholarships.csv",
        _std509_params,
    ),
    (
        "tuition",
        "Tuition, Fees, Living Expenses & Conditional Scholarships",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Tuitions and Fees/Living Expenses/Cond. Scholarships",
        "509_tuition.csv",
        _std509_params,
    ),
    (
        "attrition",
        "Attrition",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Attrition",
        "509_attrition.csv",
        _std509_params,
    ),
    (
        "transfers",
        "Transfers",
        "AnnualQuestionnaire/GetAllCompilationData",
        "Transfers",
        "509_transfers.csv",
        _std509_params,
    ),
]


# ---------------------------------------------------------------------------
# Fetch helpers
# ---------------------------------------------------------------------------

def fetch_xlsx(endpoint: str, params: dict, max_retries: int = 3) -> pd.DataFrame | None:
    """Fetch an Excel file from the API and return as DataFrame."""
    url = BASE_API + endpoint
    for attempt in range(max_retries):
        try:
            r = requests.get(url, params=params, headers=HEADERS, timeout=45)
            r.raise_for_status()
            ct = r.headers.get("Content-Type", "")
            if "spreadsheet" not in ct and "excel" not in ct and "octet" not in ct:
                print(f"    ✗ Unexpected content-type: {ct}")
                return None
            df = pd.read_excel(BytesIO(r.content), engine="openpyxl")
            if df.empty:
                print(f"    ✗ Empty Excel returned")
                return None
            return df
        except Exception as exc:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                print(f"    ✗ Failed after {max_retries} attempts: {exc}")
                return None


def normalise(df: pd.DataFrame, year: int) -> pd.DataFrame:
    """Ensure year column exists and is filled."""
    # Normalise column names
    df.columns = [str(c).strip() for c in df.columns]

    # Find or create the year column
    year_col = next(
        (c for c in df.columns if c.lower() in ("schoolyear", "year", "cohort")), None
    )
    if year_col:
        df[year_col] = df[year_col].fillna(year)
    else:
        cols = list(df.columns)
        df = pd.concat([df.iloc[:, :1],
                        pd.DataFrame({"SchoolYear": [year] * len(df)}),
                        df.iloc[:, 1:]], axis=1)
        cols = [cols[0], "SchoolYear"] + cols[1:]

    return df


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Download all ABA 509 structured data for all schools, 3 years."
    )
    parser.add_argument(
        "--years", nargs="+", type=int, default=DEFAULT_YEARS,
        help="Class years to collect (default: 2023 2022 2021)",
    )
    parser.add_argument(
        "--section", default=None,
        help=(
            "Only fetch one dataset key, e.g.: bar_firsttime, bar_ultimate, "
            "basics, firstyear, curriculum, faculty, diversity, "
            "scholarships, tuition, attrition, transfers"
        ),
    )
    args = parser.parse_args()

    datasets_to_run = DATASETS
    if args.section:
        datasets_to_run = [d for d in DATASETS if d[0] == args.section]
        if not datasets_to_run:
            print(f"Unknown section key '{args.section}'. Valid keys:")
            for d in DATASETS:
                print(f"  {d[0]:20s}  {d[1]}")
            sys.exit(1)

    print("=" * 66)
    print("ABA 509 Full Data Harvester")
    print("=" * 66)
    print(f"Target years    : {args.years}")
    print(f"Datasets to run : {len(datasets_to_run)}")
    print()

    for key, label, endpoint, section_name, output_csv, params_fn in datasets_to_run:
        print(f"\n{'─'*66}")
        print(f"  {label}")
        print(f"  → {output_csv}")
        print(f"{'─'*66}")

        yearly_frames = []

        for year in args.years:
            params = params_fn(year, section_name)
            print(f"  Fetching {year}...", end=" ", flush=True)
            df = fetch_xlsx(endpoint, params)
            if df is not None:
                df = normalise(df, year)
                print(f"✓  ({df.shape[0]} rows × {df.shape[1]} cols)")
                yearly_frames.append(df)
            else:
                print("✗")
            time.sleep(REQUEST_DELAY)

        if not yearly_frames:
            print(f"  ⚠ No data retrieved for {label}")
            continue

        # Stack all years
        master = pd.concat(yearly_frames, ignore_index=True, sort=False)

        # Move school name + year to front
        name_col = next((c for c in master.columns if "school" in c.lower() and "name" in c.lower()), None)
        year_col = next((c for c in master.columns if c.lower() in ("schoolyear", "year", "cohort")), None)
        front = [c for c in [name_col, year_col] if c]
        rest  = [c for c in master.columns if c not in front]
        master = master[front + rest]

        master.to_csv(output_csv, index=False)
        size_kb = os.path.getsize(output_csv) / 1024
        print(f"\n  ✓ Saved → {output_csv}  ({size_kb:.0f} KB, {len(master)} rows, {len(master.columns)} cols)")

    print()
    print("=" * 66)
    print("Done! Files written:")
    for key, label, endpoint, section_name, output_csv, _ in datasets_to_run:
        if os.path.exists(output_csv):
            size_kb = os.path.getsize(output_csv) / 1024
            print(f"  {output_csv:45s}  {size_kb:6.0f} KB")
    print("=" * 66)


if __name__ == "__main__":
    main()
