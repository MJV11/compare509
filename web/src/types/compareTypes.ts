// ---------------------------------------------------------------------------
// Shared types for the Compare feature
// ---------------------------------------------------------------------------

export type SchoolData = Record<string, string>;

export type StatDef =
  | { type: "value"; label: string; key: string; signed?: true }
  | { type: "pct"; label: string; numKey: string; denomKey: string; denomDataset?: string }
  | { type: "pct-group"; label: string; denomKey: string; denomDataset?: string;
      breakdown: { label: string; numKey: string }[];
    }
  | { type: "pct-stored"; label: string; key: string; rawKey?: string }
  | { type: "range"; label: string; p25: string; p50: string; p75: string }
  | { type: "states"; label: string; keys: string[]; numKeys: string[]; denomKey: string };

export interface Section {
  heading: string;
  dataset: string;
  rows: StatDef[];
}

// ---------------------------------------------------------------------------
// All sections (single scrollable column per school)
// ---------------------------------------------------------------------------

export const SECTIONS: Section[] = [
  {
    heading: "Overview",
    dataset: "employment",
    rows: [
      { type: "value", label: "Total Graduates", key: "total_grads" },
      { type: "pct", label: "Employment Rate (Long-Term/Full-Time)", numKey: "lt_emp", denomKey: "total_grads" },
      { type: "pct", label: "Unemployed – Seeking", numKey: "unemp_seek", denomKey: "total_grads" },
      { type: "pct", label: "Unemployed – Not Seeking", numKey: "unemp_ns", denomKey: "total_grads" },
      { type: "pct", label: "Employment Status Unknown", numKey: "emp_stat_unk", denomKey: "total_grads" },
    ],
  },
  {
    heading: "Employment by Job Type",
    dataset: "employment",
    rows: [
      { type: "pct-group", label: "Bar Passage Required", denomKey: "total_grads",
        breakdown: [ { label: "Full-Time Long-Term", numKey: "bar_ftlt" }, { label: "Full-Time Short-Term", numKey: "bar_ftst" }, { label: "Part-Time Long-Term", numKey: "bar_ptlt" }, { label: "Part-Time Short-Term", numKey: "bar_ptst" } ],
      },
      { type: "pct-group", label: "JD Advantage", denomKey: "total_grads",
        breakdown: [ { label: "Full-Time Long-Term", numKey: "jda_ftlt" }, { label: "Full-Time Short-Term", numKey: "jda_ftst" }, { label: "Part-Time Long-Term", numKey: "jda_ptlt" }, { label: "Part-Time Short-Term", numKey: "jda_ptst" } ],
      },
      { type: "pct-group", label: "Professional", denomKey: "total_grads",
        breakdown: [ { label: "Full-Time Long-Term", numKey: "prof_ftlt" }, { label: "Full-Time Short-Term", numKey: "prof_ftst" }, { label: "Part-Time Long-Term", numKey: "prof_ptlt" }, { label: "Part-Time Short-Term", numKey: "prof_ptst" } ],
      },
      { type: "pct-group", label: "Non-Professional", denomKey: "total_grads",
        breakdown: [ { label: "Full-Time Long-Term", numKey: "nprof_ftlt" }, { label: "Full-Time Short-Term", numKey: "nprof_ftst" }, { label: "Part-Time Long-Term", numKey: "nprof_ptlt" }, { label: "Part-Time Short-Term", numKey: "nprof_ptst" } ],
      },
      { type: "pct-group", label: "Undeterminable", denomKey: "total_grads",
        breakdown: [ { label: "Full-Time Long-Term", numKey: "undet_ftlt" }, { label: "Full-Time Short-Term", numKey: "undet_ftst" }, { label: "Part-Time Long-Term", numKey: "undet_ptlt" }, { label: "Part-Time Short-Term", numKey: "undet_ptst" } ],
      },
      { type: "pct", label: "Law School/Univ. Funded",   numKey: "lawfund_emp", denomKey: "total_grads" },
      { type: "pct", label: "Graduate Degree Pursuing (Full-Time)", numKey: "gradsch_ft", denomKey: "total_grads" },
      { type: "pct", label: "Deferred Employment",        numKey: "emp_def",    denomKey: "total_grads" },
      { type: "pct", label: "Total Full-Time Long-Term",  numKey: "total_ftlt", denomKey: "total_grads" },
      { type: "pct", label: "Total Full-Time Short-Term", numKey: "total_ftst", denomKey: "total_grads" },
      { type: "pct", label: "Total Part-Time Long-Term",  numKey: "total_ptlt", denomKey: "total_grads" },
      { type: "pct", label: "Total Part-Time Short-Term", numKey: "total_ptst", denomKey: "total_grads" },
    ],
  },
  {
    heading: "Employment by Employer Type",
    dataset: "employment",
    rows: [
      { type: "pct", label: "Business & Industry",   numKey: "bsind_emp",  denomKey: "total_grads" },
      { type: "pct", label: "Government",            numKey: "gov_emp",    denomKey: "total_grads" },
      { type: "pct", label: "Public Interest",       numKey: "pub_emp",    denomKey: "total_grads" },
      { type: "pct", label: "Federal Clerkship",     numKey: "fedclk_emp", denomKey: "total_grads" },
      { type: "pct", label: "State/Local Clerkship", numKey: "locclk_emp", denomKey: "total_grads" },
      { type: "pct", label: "Other Clerkship (Full-Time Long-Term)", numKey: "othclk_ftlt", denomKey: "total_grads" },
      { type: "pct", label: "Academia",              numKey: "acad_emp",   denomKey: "total_grads" },
      { type: "pct", label: "Unknown Employer Type", numKey: "unk_emp",    denomKey: "total_grads" },
    ],
  },
  {
    heading: "Employment by Firm Size",
    dataset: "employment",
    rows: [
      { type: "pct", label: "Solo",        numKey: "solo_emp",         denomKey: "total_grads" },
      { type: "pct", label: "2–10",        numKey: "sz_1_10_emp",      denomKey: "total_grads" },
      { type: "pct", label: "11–25",       numKey: "sz_11_25_emp",     denomKey: "total_grads" },
      { type: "pct", label: "26–50",       numKey: "sz_26_50_emp",     denomKey: "total_grads" },
      { type: "pct", label: "51–100",      numKey: "sz_51_100_emp",    denomKey: "total_grads" },
      { type: "pct", label: "101–250",     numKey: "sz_101_250_emp",   denomKey: "total_grads" },
      { type: "pct", label: "251–500",     numKey: "sz_251_500_emp",   denomKey: "total_grads" },
      { type: "pct", label: "501+",        numKey: "sz_501up_emp",     denomKey: "total_grads" },
      { type: "pct", label: "Unknown Size", numKey: "sz_unk_emp",      denomKey: "total_grads" },
    ],
  },
  {
    heading: "Funded Positions",
    dataset: "employment",
    rows: [
      { type: "pct", label: "Total Funded",                  numKey: "funded_emp",    denomKey: "total_grads" },
      { type: "pct", label: "Bar Passage Required (Funded)", numKey: "fundbar_emp",   denomKey: "total_grads" },
      { type: "pct", label: "JD Advantage (Funded)",         numKey: "fundjda_emp",   denomKey: "total_grads" },
      { type: "pct", label: "Professional (Funded)",         numKey: "fundprof_emp",  denomKey: "total_grads" },
      { type: "pct", label: "Non-Professional (Funded)",     numKey: "fundnprof_emp", denomKey: "total_grads" },
    ],
  },
  {
    heading: "Geographic Distribution",
    dataset: "employment",
    rows: [
      {
        type: "states",
        label: "Top States",
        keys: ["state_emp1", "state_emp2", "state_emp3"],
        numKeys: ["state_emp1_num", "state_emp2_num", "state_emp3_num"],
        denomKey: "total_grads",
      },
      { type: "pct", label: "Foreign Country", numKey: "foreign_emp_num", denomKey: "total_grads" },
    ],
  },
  {
    heading: "Admissions",
    dataset: "firstyearclass",
    rows: [
      { type: "value", label: "Applications", key: "Applications" },
      { type: "pct", label: "Offers of Admission", numKey: "Offers", denomKey: "Applications" },
      { type: "pct", label: "Total Enrolled (Yield)", numKey: "TotalEnrollees", denomKey: "Offers" },
      { type: "pct", label: "Full-Time Enrolled", numKey: "FTEnrollees", denomKey: "TotalEnrollees" },
      { type: "pct", label: "Part-Time Enrolled", numKey: "PTEnrollees", denomKey: "TotalEnrollees" },
      { type: "range", label: "LSAT", p25: "All25thPercentileLSAT", p50: "All50thPercentileLSAT", p75: "All75thPercentileLSAT" },
      { type: "range", label: "UGPA", p25: "All25thPercentileUGPA", p50: "All50thPercentileUGPA", p75: "All75thPercentileUGPA" },
    ],
  },
  {
    heading: "Bar Passage",
    dataset: "bar_passage_firsttime",
    rows: [
      { type: "value", label: "Graduates (Most Recent Year)",           key: "Graduates In 2023" },
      { type: "value", label: "Did Not Take the Bar",                   key: "Graduates who did not take the bar in 2023" },
      { type: "value", label: "No Information",                         key: "Graduates with No Information" },
      { type: "value", label: "First-Time Takers",                      key: "Total First Time Takers" },
      { type: "value", label: "First-Time Takers from Prior Years",     key: "First Time Takers from Prior Years" },
      { type: "pct",   label: "First-Time Passers",                     numKey: "Total First Time Passers", denomKey: "Total First Time Takers" },
      { type: "value", label: "School Pass Rate",                       key: "AvgSchoolPassPercent*" },
      { type: "value", label: "State Avg Pass Rate",                    key: "AvgStatePassPercent**" },
      { type: "value", label: "Difference vs State Avg", key: "TotalDifferencePercent***", signed: true },
      { type: "value", label: "Pass % incl. Alternative Pathways",      key: "Pass % including Grads Admitted via Alternative Pathways" },
    ],
  },
  {
    heading: "Demographics (Current Students)",
    dataset: "diversity",
    rows: [
      { type: "value", label: "Total JD Students",            key: "TotalGrandTotal" },
      { type: "pct",   label: "Women (1L)",                   numKey: "TotalWomenJD1",          denomKey: "TotalJD1Total" },
      { type: "pct",   label: "Hispanic/Latino (1L)",         numKey: "OtherHispJD1Total",      denomKey: "TotalJD1Total" },
      { type: "pct",   label: "Black/African American (1L)",  numKey: "BlackJD1Total",          denomKey: "TotalJD1Total" },
      { type: "pct",   label: "Asian (1L)",                   numKey: "AsianJD1Total",          denomKey: "TotalJD1Total" },
      { type: "pct",   label: "American Indian (1L)",         numKey: "AmericanIndianJD1Total", denomKey: "TotalJD1Total" },
      { type: "pct",   label: "Two or More Races (1L)",       numKey: "RaceJD1Total",           denomKey: "TotalJD1Total" },
      { type: "pct",   label: "White (1L)",                   numKey: "WhiteJD1Total",          denomKey: "TotalJD1Total" },
      { type: "pct",   label: "Nonresident Alien (1L)",       numKey: "NRJD1Total",             denomKey: "TotalJD1Total" },
    ],
  },
  {
    heading: "Attrition",
    dataset: "attrition",
    rows: [
      { type: "pct-stored", label: "Academic Dismissal Rate (1L)", key: "AcademicAttrition_TotalJD1Percentage", rawKey: "AcademicAttrition_TotalJD1Total" },
      { type: "pct-stored", label: "Academic Dismissal Rate (Upper)", key: "AcademicAttrition_TotalULPercentage", rawKey: "AcademicAttrition_TotalULTotal" },
      { type: "pct-stored", label: "Other Departure Rate (1L)", key: "OtherAttrition_TotalJD1Percentage", rawKey: "OtherAttrition_TotalJD1Total" },
      { type: "pct-stored", label: "Other Departure Rate (Upper)", key: "OtherAttrition_TotalULPercentage", rawKey: "OtherAttrition_TotalULTotal" },
    ],
  },
  {
    heading: "Transfers",
    dataset: "transfers",
    rows: [
      { type: "pct",   label: "Transfers Out (% of 1L class)",          numKey: "JD1 Transfers Out", denomKey: "TotalJD1Total", denomDataset: "diversity" },
      { type: "pct",   label: "Transfers In (% of total enrollment)",   numKey: "TransferIn",        denomKey: "TotalGrandTotal", denomDataset: "diversity" },
      { type: "range", label: "Transfer Student JD1 GPA", p25: "25th Percentile JD1 GPA", p50: "50th Percentile JD1 GPA", p75: "75th Percentile JD1 GPA" },
    ],
  },
  {
    heading: "Tuition & Costs",
    dataset: "tuition",
    rows: [
      { type: "value", label: "Full-Time Resident Tuition",         key: "FT_Resident_Semester" },
      { type: "value", label: "Full-Time Resident Annual Fees",     key: "FTRS_AnnualFees" },
      { type: "value", label: "Full-Time Non-Resident Tuition",     key: "FT_NonResident_Semester" },
      { type: "value", label: "Full-Time Non-Resident Annual Fees", key: "FTNRS_AnnualFees" },
      { type: "value", label: "Living On-Campus",            key: "Living_On_Campus" },
      { type: "value", label: "Living Off-Campus",           key: "Living_Off_Campus" },
      { type: "value", label: "Living At Home",              key: "Living_At_Home" },
      { type: "value", label: "Tuition Guarantee Program",   key: "Tuition_Guarantee_Program" },
      { type: "value", label: "Offers Scholarships",         key: "OfferScholorships" },
    ],
  },
];

// All unique datasets referenced across all sections
export const ALL_DATASETS = [...new Set(SECTIONS.map((s) => s.dataset))];
