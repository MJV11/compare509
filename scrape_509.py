"""
ABA 509 Employment Outcomes Scraper
=====================================
Fetches employment outcome PDFs for all ABA-accredited law schools
from the official backend API at backend.abarequireddisclosures.org,
parses each PDF into structured rows, and combines everything into
one master CSV.

HOW IT WORKS:
  The portal (abarequireddisclosures.org) is a Vue.js SPA that calls a
  REST API at backend.abarequireddisclosures.org/api/. The relevant endpoints are:

    GET /api/Master/GetEQUniversityListByYear?schoolYear=YEAR
      → Returns list of all schools + their schoolCode for the given year.

    GET /api/EmploymentOutcomes/GenerateIndividualEQSummaryReport?schoolId=ID&year=YEAR
      → Returns a 1-page PDF with employment outcomes tables for that school/year.

  This script:
    1. Calls the school-list endpoint for each target year
    2. Downloads the 1-page PDF for each school
    3. Parses tables from the PDF using pdfplumber
    4. Maps each row to the standard column schema (bar_ftlt, jda_ftlt, etc.)
    5. Appends all rows into a master CSV

REQUIREMENTS:
    pip install requests pandas pdfplumber openpyxl

USAGE:
    python3 scrape_509.py                    # default: 2023, 2022, 2021
    python3 scrape_509.py --years 2023 2022  # specific years
    python3 scrape_509.py --resume           # skip schools already in output CSV
"""

import argparse
import os
import sys
import time

import pandas as pd
import pdfplumber
import requests
from io import BytesIO

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

OUTPUT_FILE = "aba_509_employment_all_schools.csv"
DEFAULT_YEARS = [2024, 2023, 2022, 2021]
REQUEST_DELAY = 0.4   # seconds between requests (be polite)
MAX_RETRIES   = 3

BASE_API  = "https://backend.abarequireddisclosures.org/api/"
SCHOOL_LIST_EP = BASE_API + "Master/GetEQUniversityListByYear"
PDF_EP         = BASE_API + "EmploymentOutcomes/GenerateIndividualEQSummaryReport"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Referer": "https://abarequireddisclosures.org/",
    "Origin":  "https://abarequireddisclosures.org",
}

# ---------------------------------------------------------------------------
# PDF → structured row
# ---------------------------------------------------------------------------

def _safe_int(val):
    """Convert a string cell to int, returning None if blank/non-numeric."""
    if val is None:
        return None
    v = str(val).strip().replace(",", "")
    if v in ("", "-", "N/A", "n/a"):
        return None
    try:
        return int(float(v))
    except ValueError:
        return None


def parse_pdf(pdf_bytes: bytes, school_name: str, school_id: int, year: int) -> dict:
    """
    Parse a single-page ABA Employment Summary PDF into a flat dict
    matching the standard 509 CSV column schema.
    """
    row = {
        "cohort":     year,
        "schoolid":   school_id,
        "schoolname": school_name,
    }

    try:
        with pdfplumber.open(BytesIO(pdf_bytes)) as pdf:
            if not pdf.pages:
                return row
            page   = pdf.pages[0]
            tables = page.extract_tables()
    except Exception as exc:
        print(f"    [ERROR] PDF parse error ({school_name} {year}): {exc}")
        return row

    # Helper: given a table (list of lists), build a dict keyed on row[0]
    def tbl_to_dict(tbl):
        d = {}
        for r in tbl[1:]:   # skip header row
            if r and r[0]:
                # Normalize key: strip whitespace, collapse embedded newlines,
                # and normalise em-dashes to regular hyphens so 2024 labels
                # ("Employed – Bar Admission Required/Anticipated") match the
                # same lookup paths as earlier years.
                key = str(r[0]).strip().replace("\n", " ").replace("\u2013", "-").replace("\u2014", "-")
                d[key] = r[1:]
        return d

    # ----------------------------------------------------------------
    # TABLE 0: EMPLOYMENT STATUS  (bar, jda, prof, nprof, undet, misc)
    # cols: [label, ftlt, ftst, ptlt, ptst, number]
    # ----------------------------------------------------------------
    if len(tables) > 0:
        d = tbl_to_dict(tables[0])

        def emp(key, col):
            return _safe_int(d.get(key, [None]*5)[col])

        # Bar passage required  (label changed in 2024 to "Bar Admission Required/Anticipated")
        bar_key = next(
            (k for k in d if "Bar Passage Required" in k or "Bar Admission Required" in k),
            "Employed - Bar Passage Required",
        )
        row["bar_ftlt"]  = emp(bar_key, 0)
        row["bar_ftst"]  = emp(bar_key, 1)
        row["bar_ptlt"]  = emp(bar_key, 2)
        row["bar_ptst"]  = emp(bar_key, 3)
        row["bar_emp"]   = emp(bar_key, 4)

        # JD advantage
        row["jda_ftlt"]  = emp("Employed - J.D. Advantage", 0)
        row["jda_ftst"]  = emp("Employed - J.D. Advantage", 1)
        row["jda_ptlt"]  = emp("Employed - J.D. Advantage", 2)
        row["jda_ptst"]  = emp("Employed - J.D. Advantage", 3)
        row["jda_emp"]   = emp("Employed - J.D. Advantage", 4)

        # Professional position
        row["prof_ftlt"] = emp("Employed - Professional Position", 0)
        row["prof_ftst"] = emp("Employed - Professional Position", 1)
        row["prof_ptlt"] = emp("Employed - Professional Position", 2)
        row["prof_ptst"] = emp("Employed - Professional Position", 3)
        row["prof_emp"]  = emp("Employed - Professional Position", 4)

        # Non-professional / Other
        row["nprof_ftlt"] = emp("Employed - Other Position", 0)
        row["nprof_ftst"] = emp("Employed - Other Position", 1)
        row["nprof_ptlt"] = emp("Employed - Other Position", 2)
        row["nprof_ptst"] = emp("Employed - Other Position", 3)
        row["nprof_emp"]  = emp("Employed - Other Position", 4)

        # Undeterminable
        row["undet_ftlt"] = emp("Employed - Undeterminable", 0)
        row["undet_ftst"] = emp("Employed - Undeterminable", 1)
        row["undet_ptlt"] = emp("Employed - Undeterminable", 2)
        row["undet_ptst"] = emp("Employed - Undeterminable", 3)
        row["undet_emp"]  = emp("Employed - Undeterminable", 4)

        # Law school / university funded (status table has this too)
        row["lawfund_emp"] = emp("Employed - Law School/University Funded", 4)

        # Misc single-value fields (no ft/pt breakdown in PDF)
        row["gradsch_ft"]   = _safe_int(_first_nonempty(d.get("Enrolled in Graduate Studies", [])))
        # "Start Date Deferred" label includes a specific date that changes each year
        emp_def_key = next((k for k in d if "Start Date" in k), None)
        row["emp_def"]      = _safe_int(_first_nonempty(d[emp_def_key])) if emp_def_key else None
        row["unemp_ns"]     = _safe_int(_first_nonempty(d.get("Unemployed - Not Seeking", [])))
        row["unemp_seek"]   = _safe_int(_first_nonempty(d.get("Unemployed - Seeking", [])))
        row["emp_stat_unk"] = _safe_int(_first_nonempty(d.get("Employment Status Unknown", [])))
        # "Total Graduates" key has an embedded newline that gets normalized to a space
        total_grads_key = next((k for k in d if k.startswith("Total Graduates")), None)
        row["total_grads"]  = _safe_int(_first_nonempty(d[total_grads_key])) if total_grads_key else None

        # Compute lt_emp (total long-term employed)
        try:
            lt_fields = ["bar_ftlt","bar_ptlt","jda_ftlt","jda_ptlt",
                         "prof_ftlt","prof_ptlt","nprof_ftlt","nprof_ptlt",
                         "undet_ftlt","undet_ptlt"]
            row["lt_emp"] = sum(row[f] or 0 for f in lt_fields)
        except Exception:
            pass

    # ----------------------------------------------------------------
    # TABLE 1: EMPLOYMENT TYPE  (firm sizes, business, govt, etc.)
    # cols: [label, ftlt, ftst, ptlt, ptst, number]
    # ----------------------------------------------------------------
    if len(tables) > 1:
        d2 = tbl_to_dict(tables[1])

        def et(key, col):
            return _safe_int(d2.get(key, [None]*5)[col])

        row["solo_ftlt"]       = et("Solo", 0);    row["solo_ftst"]       = et("Solo", 1)
        row["solo_ptlt"]       = et("Solo", 2);    row["solo_ptst"]       = et("Solo", 3)
        row["solo_emp"]        = et("Solo", 4)

        row["sz_1_10_ftlt"]    = et("1 - 10", 0);  row["sz_1_10_ftst"]    = et("1 - 10", 1)
        row["sz_1_10_ptlt"]    = et("1 - 10", 2);  row["sz_1_10_ptst"]    = et("1 - 10", 3)
        row["sz_1_10_emp"]     = et("1 - 10", 4)

        row["sz_11_25_ftlt"]   = et("11 - 25", 0); row["sz_11_25_ftst"]   = et("11 - 25", 1)
        row["sz_11_25_ptlt"]   = et("11 - 25", 2); row["sz_11_25_ptst"]   = et("11 - 25", 3)
        row["sz_11_25_emp"]    = et("11 - 25", 4)

        row["sz_26_50_ftlt"]   = et("26 - 50", 0); row["sz_26_50_ftst"]   = et("26 - 50", 1)
        row["sz_26_50_ptlt"]   = et("26 - 50", 2); row["sz_26_50_ptst"]   = et("26 - 50", 3)
        row["sz_26_50_emp"]    = et("26 - 50", 4)

        row["sz_51_100_ftlt"]  = et("51 - 100", 0);  row["sz_51_100_ftst"]  = et("51 - 100", 1)
        row["sz_51_100_ptlt"]  = et("51 - 100", 2);  row["sz_51_100_ptst"]  = et("51 - 100", 3)
        row["sz_51_100_emp"]   = et("51 - 100", 4)

        row["sz_101_250_ftlt"] = et("101 - 250", 0); row["sz_101_250_ftst"] = et("101 - 250", 1)
        row["sz_101_250_ptlt"] = et("101 - 250", 2); row["sz_101_250_ptst"] = et("101 - 250", 3)
        row["sz_101_250_emp"]  = et("101 - 250", 4)

        row["sz_251_500_ftlt"] = et("251 - 500", 0); row["sz_251_500_ftst"] = et("251 - 500", 1)
        row["sz_251_500_ptlt"] = et("251 - 500", 2); row["sz_251_500_ptst"] = et("251 - 500", 3)
        row["sz_251_500_emp"]  = et("251 - 500", 4)

        row["sz_501up_ftlt"]   = et("501 +", 0);  row["sz_501up_ftst"]   = et("501 +", 1)
        row["sz_501up_ptlt"]   = et("501 +", 2);  row["sz_501up_ptst"]   = et("501 +", 3)
        row["sz_501up_emp"]    = et("501 +", 4)

        row["sz_unk_ftlt"]     = et("Unknown Size", 0); row["sz_unk_ftst"]     = et("Unknown Size", 1)
        row["sz_unk_ptlt"]     = et("Unknown Size", 2); row["sz_unk_ptst"]     = et("Unknown Size", 3)
        row["sz_unk_emp"]      = et("Unknown Size", 4)

        row["bsind_ftlt"]  = et("Business & Industry", 0); row["bsind_ftst"]  = et("Business & Industry", 1)
        row["bsind_ptlt"]  = et("Business & Industry", 2); row["bsind_ptst"]  = et("Business & Industry", 3)
        row["bsind_emp"]   = et("Business & Industry", 4)

        row["gov_ftlt"]    = et("Government", 0); row["gov_ftst"]    = et("Government", 1)
        row["gov_ptlt"]    = et("Government", 2); row["gov_ptst"]    = et("Government", 3)
        row["gov_emp"]     = et("Government", 4)

        row["pub_ftlt"]    = et("Public Interest", 0); row["pub_ftst"]    = et("Public Interest", 1)
        row["pub_ptlt"]    = et("Public Interest", 2); row["pub_ptst"]    = et("Public Interest", 3)
        row["pub_emp"]     = et("Public Interest", 4)

        row["fedclk_ftlt"] = et("Clerkships - Federal", 0); row["fedclk_ftst"] = et("Clerkships - Federal", 1)
        row["fedclk_ptlt"] = et("Clerkships - Federal", 2); row["fedclk_ptst"] = et("Clerkships - Federal", 3)
        row["fedclk_emp"]  = et("Clerkships - Federal", 4)

        row["locclk_ftlt"] = et("Clerkships - State, Local, and Territorial", 0)
        row["locclk_ftst"] = et("Clerkships - State, Local, and Territorial", 1)
        row["locclk_ptlt"] = et("Clerkships - State, Local, and Territorial", 2)
        row["locclk_ptst"] = et("Clerkships - State, Local, and Territorial", 3)
        row["locclk_emp"]  = et("Clerkships - State, Local, and Territorial", 4)

        row["othclk_ftlt"] = _safe_int(None)  # Tribal + International clerkships (rare)
        for clk_label in ["Clerkships - Tribal", "Clerkships - International"]:
            v = et(clk_label, 4)
            if v:
                row["othclk_ftlt"] = (row["othclk_ftlt"] or 0) + v

        row["acad_ftlt"]   = et("Education", 0); row["acad_ftst"]   = et("Education", 1)
        row["acad_ptlt"]   = et("Education", 2); row["acad_ptst"]   = et("Education", 3)
        row["acad_emp"]    = et("Education", 4)

        row["unk_ftlt"]    = et("Employer Type Unknown", 0); row["unk_ftst"]    = et("Employer Type Unknown", 1)
        row["unk_ptlt"]    = et("Employer Type Unknown", 2); row["unk_ptst"]    = et("Employer Type Unknown", 3)
        row["unk_emp"]     = et("Employer Type Unknown", 4)

        # Totals row from employment type table
        total_row = d2.get("Total", [None]*5)
        row["total_ftlt"]     = _safe_int(total_row[0]) if len(total_row) > 0 else None
        row["total_ftst"]     = _safe_int(total_row[1]) if len(total_row) > 1 else None
        row["total_ptlt"]     = _safe_int(total_row[2]) if len(total_row) > 2 else None
        row["total_ptst"]     = _safe_int(total_row[3]) if len(total_row) > 3 else None
        row["total_emp_type"] = _safe_int(total_row[4]) if len(total_row) > 4 else None

    # ----------------------------------------------------------------
    # TABLE 2: LAW SCHOOL / UNIVERSITY FUNDED POSITIONS
    # ----------------------------------------------------------------
    if len(tables) > 2:
        d3 = tbl_to_dict(tables[2])

        def lf(key, col):
            return _safe_int(d3.get(key, [None]*5)[col])

        bar_key3 = next(
            (k for k in d3 if "Bar Passage Required" in k or "Bar Admission Required" in k),
            "Employed - Bar Passage Required",
        )
        row["fundbar_ftlt"]   = lf(bar_key3, 0)
        row["fundbar_ftst"]   = lf(bar_key3, 1)
        row["fundbar_ptlt"]   = lf(bar_key3, 2)
        row["fundbar_ptst"]   = lf(bar_key3, 3)
        row["fundbar_emp"]    = lf(bar_key3, 4)

        row["fundjda_ftlt"]   = lf("Employed - J.D. Advantage", 0)
        row["fundjda_ftst"]   = lf("Employed - J.D. Advantage", 1)
        row["fundjda_ptlt"]   = lf("Employed - J.D. Advantage", 2)
        row["fundjda_ptst"]   = lf("Employed - J.D. Advantage", 3)
        row["fundjda_emp"]    = lf("Employed - J.D. Advantage", 4)

        row["fundprof_ftlt"]  = lf("Employed - Professional Position", 0)
        row["fundprof_ftst"]  = lf("Employed - Professional Position", 1)
        row["fundprof_ptlt"]  = lf("Employed - Professional Position", 2)
        row["fundprof_ptst"]  = lf("Employed - Professional Position", 3)
        row["fundprof_emp"]   = lf("Employed - Professional Position", 4)

        row["fundnprof_ftlt"] = lf("Employed - Other Position", 0)
        row["fundnprof_ftst"] = lf("Employed - Other Position", 1)
        row["fundnprof_ptlt"] = lf("Employed - Other Position", 2)
        row["fundnprof_ptst"] = lf("Employed - Other Position", 3)
        row["fundnprof_emp"]  = lf("Employed - Other Position", 4)

        total_lf = d3.get("Total Employed by Law School/University", [None]*5)
        row["funded_emp"]     = _safe_int(total_lf[4]) if len(total_lf) > 4 else None

    # ----------------------------------------------------------------
    # TABLE 3+: EMPLOYMENT LOCATION (top 3 states + foreign)
    # ----------------------------------------------------------------
    for tbl in tables[3:]:
        for r in tbl:
            if not r or not r[0]:
                continue
            label = str(r[0]).strip()
            if "Largest Employment" in label and len(r) >= 3:
                num = str(r[1]).strip() if len(r) > 1 else ""
                val = str(r[2]).strip() if len(r) > 2 else ""
                if "1st" in label or "Largest Employment" == label.split(" - ")[-1] if " - " in label else False:
                    row["state_emp1"]     = num or val
                    row["state_emp1_num"] = _safe_int(val if num else None)
                elif "2nd" in label:
                    row["state_emp2"]     = num or val
                    row["state_emp2_num"] = _safe_int(val if num else None)
                elif "3rd" in label:
                    row["state_emp3"]     = num or val
                    row["state_emp3_num"] = _safe_int(val if num else None)
            if "Foreign Countr" in label and len(r) >= 2:
                row["foreign_emp_num"] = _safe_int(r[1])

        # Also try to get location from text if table parsing missed it
    if "state_emp1" not in row or row.get("state_emp1") is None:
        try:
            text = pdf.pages[0].extract_text() if False else ""  # already extracted above
        except Exception:
            pass

    return row


def _first_nonempty(lst):
    """Return first non-empty/None value from a list."""
    for v in lst:
        if v not in (None, "", "-"):
            return v
    return None


# ---------------------------------------------------------------------------
# API helpers
# ---------------------------------------------------------------------------

def get_schools(year: int) -> list[dict]:
    """Return list of {schoolCode, schoolName} for a given year."""
    for attempt in range(MAX_RETRIES):
        try:
            r = requests.get(
                SCHOOL_LIST_EP,
                params={"schoolYear": year},
                headers=HEADERS,
                timeout=30,
            )
            r.raise_for_status()
            entities = r.json().get("universityListEntities", [])
            return entities
        except Exception as exc:
            if attempt < MAX_RETRIES - 1:
                time.sleep(2)
            else:
                print(f"  [ERROR] Failed to get school list for {year}: {exc}")
                return []


def fetch_pdf(school_id: int, year: int) -> bytes | None:
    """Download the employment summary PDF for one school/year."""
    for attempt in range(MAX_RETRIES):
        try:
            r = requests.get(
                PDF_EP,
                params={"schoolId": school_id, "year": year},
                headers=HEADERS,
                timeout=45,
            )
            r.raise_for_status()
            if r.headers.get("Content-Type", "").startswith("application/pdf"):
                return r.content
            return None
        except Exception as exc:
            if attempt < MAX_RETRIES - 1:
                time.sleep(2 ** attempt)
            else:
                return None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Scrape ABA 509 employment data for all schools.")
    parser.add_argument("--years", nargs="+", type=int, default=DEFAULT_YEARS,
                        help="Class years to collect (default: 2024 2023 2022 2021)")
    parser.add_argument("--resume", action="store_true",
                        help="Skip (school, year) combos already present in the output CSV")
    parser.add_argument("--out", default=OUTPUT_FILE,
                        help=f"Output CSV path (default: {OUTPUT_FILE})")
    args = parser.parse_args()

    print("=" * 62)
    print("ABA 509 Employment Outcomes Scraper")
    print("=" * 62)
    print(f"Target years : {args.years}")
    print(f"Output file  : {args.out}")
    print(f"Resume mode  : {args.resume}")
    print()

    # Load existing data if resuming
    already_done = set()
    existing_rows = []
    if args.resume and os.path.exists(args.out):
        df_existing = pd.read_csv(args.out)
        existing_rows = df_existing.to_dict("records")
        for rec in existing_rows:
            already_done.add((str(rec.get("schoolid")), str(rec.get("cohort"))))
        print(f"Resuming: {len(already_done)} school/year combos already collected.\n")

    all_rows = list(existing_rows)
    total_schools = 0
    total_fetched = 0
    total_failed  = 0

    for year in args.years:
        print(f"\n── Class Year {year} ──────────────────────────────────────")
        schools = get_schools(year)
        if not schools:
            print(f"  [ERROR] Could not fetch school list for {year}, skipping.")
            continue

        print(f"  Schools found: {len(schools)}")
        total_schools += len(schools)

        for idx, school in enumerate(schools, 1):
            sid   = school["schoolCode"]
            sname = school["schoolName"]
            key   = (str(sid), str(year))

            if key in already_done:
                print(f"  [{idx:3d}/{len(schools)}] SKIP  {sname}")
                continue

            print(f"  [{idx:3d}/{len(schools)}] {sname} ({sid})...", end=" ", flush=True)
            pdf_bytes = fetch_pdf(sid, year)

            if pdf_bytes is None:
                print("[ERROR] download failed")
                total_failed += 1
                all_rows.append({"cohort": year, "schoolid": sid, "schoolname": sname})
                continue

            row = parse_pdf(pdf_bytes, sname, sid, year)
            all_rows.append(row)
            total_fetched += 1
            print(f"  OK (grads={row.get('total_grads','?')}, bar_ftlt={row.get('bar_ftlt','?')})")

            time.sleep(REQUEST_DELAY)

        # Save after each year (checkpoint)
        _save_csv(all_rows, args.out)
        print(f"\n  Checkpoint saved -> {args.out}  ({len(all_rows)} rows so far)")

    # Final save
    _save_csv(all_rows, args.out)

    print()
    print("=" * 62)
    print(f"Done!")
    print(f"   Schools requested : {total_schools}")
    print(f"   PDFs parsed       : {total_fetched}")
    print(f"   Failed            : {total_failed}")
    print(f"   Output            : {args.out}")
    size_mb = os.path.getsize(args.out) / (1024 * 1024)
    print(f"   File size         : {size_mb:.2f} MB")
    print("=" * 62)


def _save_csv(rows: list[dict], path: str):
    df = pd.DataFrame(rows)
    # Put identifier columns first
    front = ["cohort", "schoolid", "schoolname"]
    cols = front + [c for c in df.columns if c not in front]
    df = df[[c for c in cols if c in df.columns]]
    df.to_csv(path, index=False)


if __name__ == "__main__":
    main()
