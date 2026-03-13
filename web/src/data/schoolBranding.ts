export interface SchoolBranding {
  primary: string;   // light tint for card header background
  secondary: string; // rich brand color for border, text, accents
  sealUrl: string;   // clearbit logo URL
}

const BRANDING: Record<string, SchoolBranding> = {
  "akron, the university of": {
    primary: "#9d9362", secondary: "#070c72",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/University_of_Akron_seal.svg/330px-University_of_Akron_seal.svg.png",
  },
  "alabama, the university of": {
    primary: "#828a8f", secondary: "#9e1b32",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/University_of_Alabama_Seal.png",
  },
  "albany law school": {
    primary: "#eeb211", secondary: "#46166b",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/99/Albany_suny_univ_seal.png",
  },
  "american university": {
    primary: "#004FA2", secondary: "#E0263C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/American_University_Seal.svg/500px-American_University_Seal.svg.png",
  },
  "appalachian school of law": {
    primary: "#005d27", secondary: "#005d27",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Appalachian_School_of_Law_seal.png",
  },
  "arizona state university": {
    primary: "#ffc627", secondary: "#8b1d41",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Arizona_State_University_seal.svg/1280px-Arizona_State_University_seal.svg.png",
  },
  "arizona, the university of": {
    primary: "#0C234B", secondary: "#AB0520",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/University_of_Arizona_seal.svg/1280px-University_of_Arizona_seal.svg.png",
  },
  "arkansas at little rock, university of": {
    primary: "#a7a9ac", secondary: "#6e2639",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/8/86/University_of_Arkansas_at_Little_Rock_Seal.png",
  },
  "arkansas, university of": {
    primary: "#6e2639", secondary: "#a2002f",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_of_Arkansas_seal.svg/1280px-University_of_Arkansas_seal.svg.png",
  },
  "atlanta's john marshall law school": {
    primary: "#48a0ff", secondary: "#1a3a5c",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Atlanta%27s_John_Marshall_Law_School_seal.png/250px-Atlanta%27s_John_Marshall_Law_School_seal.png",
  },
  "ave maria school of law": {
    primary: "#8b6e4b", secondary: "#0033a1",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/65/Ave_maria_univ_seal.png",
  },
  "baltimore, university of": {
    primary: "#7eb0cd", secondary: "#0076a8",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/University_of_Baltimore_seal.png/120px-University_of_Baltimore_seal.png",
  },
  "barry university": {
    primary: "#000000", secondary: "#6e2639",
    sealUrl: "https://jordanwalbesser.com/wp-content/uploads/2022/06/BarryUniversity_Seal.png",
  },
  "baylor university": {
    primary: "#FFB81C", secondary: "#154734",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Baylor_University_seal.svg/1280px-Baylor_University_seal.svg.png",
  },
  "belmont university": {
    primary: "#B21029", secondary: "#001D54",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/a/aa/Belmont_University_Seal_Full_Color_2022.png",
  },
  "boston college": {
    primary: "#b29d6c", secondary: "#8A100B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Boston_College_seal.svg/1280px-Boston_College_seal.svg.png",
  },
  "boston university": {
    primary: "#F20000", secondary: "#CC0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Boston_University_seal.svg/1280px-Boston_University_seal.svg.png",
  },
  "brigham young university": {
    primary: "#005CBA", secondary: "#002E5D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/BYU-Hawaii_Medallion_Logo.svg/1280px-BYU-Hawaii_Medallion_Logo.svg.png",
  },
  "brooklyn law school": {
    primary: "#0062ff", secondary: "#002868",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Columbia_Law_School_logo.png/330px-Columbia_Law_School_logo.png",
  },
  "buffalo, university at": {
    primary: "#0071E9", secondary: "#005BBB",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/4/40/University-at-Buffalo-logo-300x300.png",
  },
  "california western school of law": {
    primary: "#005aff", secondary: "#003087",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/UC_Law_San_Francisco_Seal.svg/1280px-UC_Law_San_Francisco_Seal.svg.png",
  },
  "california-berkeley, university of": {
    primary: "#FDB515", secondary: "#003262",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1280px-Seal_of_University_of_California%2C_Berkeley.svg.png",
  },
  "california-davis, university of": {
    primary: "#FFBF00", secondary: "#002851",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/The_University_of_California_Davis.svg/1280px-The_University_of_California_Davis.svg.png",
  },
  "california-irvine, university of": {
    primary: "#fecc07", secondary: "#255799",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Concordia_University_Irvine_seal.svg/1280px-Concordia_University_Irvine_seal.svg.png",
  },
  "california-los angeles, university of": {
    primary: "#FFD100", secondary: "#2774AE",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/CSU%2C_Los_Angeles_seal.svg/1280px-CSU%2C_Los_Angeles_seal.svg.png",
  },
  "california-san francisco, university of": {
    primary: "#052049", secondary: "#18A3AC",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/University_of_California%2C_San_Francisco_logo.svg/1280px-University_of_California%2C_San_Francisco_logo.svg.png",
  },
  "campbell university": {
    primary: "#EA7125", secondary: "#1E252B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Campbell_University_seal.svg/1280px-Campbell_University_seal.svg.png",
  },
  "capital university law school": {
    primary: "#6C00D8", secondary: "#663399",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Capital_University_seal.svg/1280px-Capital_University_seal.svg.png",
  },
  "cardozo, yeshiva university": {
    primary: "#555150", secondary: "#325A89",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Cardozo_logo_2.jpg",
  },
  "case western reserve university": {
    primary: "#0053C4", secondary: "#003071",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Case_Western_Reserve_University_seal.svg/1280px-Case_Western_Reserve_University_seal.svg.png",
  },
  "catholic university of america, the": {
    primary: "#FFBB00", secondary: "#FFC72C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Catholic_univ_america_seal.png",
  },
  "chapman university": {
    primary: "#231f20", secondary: "#a50034",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/6e/Chapman_University_logo.gif",
  },
  "charleston school of law": {
    primary: "#BF0000", secondary: "#660000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/SCOLSeal.png",
  },
  "chicago, the university of": {
    primary: "#CC0000", secondary: "#800000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/960px-University_of_Chicago_shield.svg.png",
  },
  "chicago-kent, illinois institute of technology": {
    primary: "#8c8984", secondary: "#cc0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Illinois_Institute_of_Technology_%28seal%29.svg/1280px-Illinois_Institute_of_Technology_%28seal%29.svg.png",
  },
  "cincinnati, university of": {
    primary: "#000000", secondary: "#E00122",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/University_of_Cincinnati_seal.svg/960px-University_of_Cincinnati_seal.svg.png",
  },
  "city university of new york, university of": {
    primary: "#838687", secondary: "#004C93",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/City_University_of_New_York_seal.svg/1280px-City_University_of_New_York_seal.svg.png",
  },
  "cleveland state university": {
    primary: "#69BE28", secondary: "#006A4D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/c/c9/Cleveland_State_University_logo.png",
  },
  "colorado, university of": {
    primary: "#565A5D", secondary: "#C8BA89",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Seal_of_the_University_of_Colorado.svg/1280px-Seal_of_the_University_of_Colorado.svg.png",
  },
  "columbia university": {
    primary: "#43c6fa", secondary: "#B9D9EB",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Coat_of_Arms_of_Columbia_University.svg/960px-Coat_of_Arms_of_Columbia_University.svg.png",
  },
  "connecticut, university of": {
    primary: "#0030A3", secondary: "#000E2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/University_of_Connecticut_seal.svg/1280px-University_of_Connecticut_seal.svg.png",
  },
  "cooley law school": {
    primary: "#48a0ff", secondary: "#1a3a5c",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Northwestern_University_seal.svg/1280px-Northwestern_University_seal.svg.png",
  },
  "cornell university": {
    primary: "#E0263C", secondary: "#B31B1B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1280px-Cornell_University_seal.svg.png",
  },
  "creighton university": {
    primary: "#0070DF", secondary: "#0054A6",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Creighton_University_seal.svg/1280px-Creighton_University_seal.svg.png",
  },
  "dayton, university of": {
    primary: "#002F87", secondary: "#D70036",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/University_of_Dayton.svg/1280px-University_of_Dayton.svg.png",
  },
  "depaul university": {
    primary: "#E4002B", secondary: "#054696",
    sealUrl: "https://logo.clearbit.com/depaul.edu",
  },
  "denver, university of": {
    primary: "#A89968", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/University_of_Denver_seal.svg/1280px-University_of_Denver_seal.svg.png",
  },
  "detroit mercy, university of": {
    primary: "#A6093D", secondary: "#002D72",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/University_of_Detroit_Mercy_seal.svg/1280px-University_of_Detroit_Mercy_seal.svg.png",
  },
  "district of columbia, university of": {
    primary: "#EFBD47", secondary: "#b7312c",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/University_of_the_District_of_Columbia_seal.svg/1280px-University_of_the_District_of_Columbia_seal.svg.png",
  },
  "drake university": {
    primary: "#0065C5", secondary: "#003B73",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/99/DrakeSeal.png",
  },
  "drexel university": {
    primary: "#FFC600", secondary: "#07294D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Drexel_University_seal.svg/1280px-Drexel_University_seal.svg.png",
  },
  "duke university": {
    primary: "#003BC0", secondary: "#012169",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Duke_University_seal.svg/1280px-Duke_University_seal.svg.png",
  },
  "duquesne university": {
    primary: "#091F40", secondary: "#D31245",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Seal_of_Duquesne_University.svg/1280px-Seal_of_Duquesne_University.svg.png",
  },
  "elon university": {
    primary: "#B59A57", secondary: "#73000A",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Elon_University_seal.svg/1280px-Elon_University_seal.svg.png",
  },
  "emory university": {
    primary: "#b58500", secondary: "#012169",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Emory_University_Seal.svg/1280px-Emory_University_Seal.svg.png",
  },
  "faulkner university": {
    primary: "#0044DC", secondary: "#0032a0",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/8/82/FaulknerUniversitySeal.png",
  },
  "florida a&m university": {
    primary: "#00843D", secondary: "#FF8200",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Florida_A%26M_University_seal.png",
  },
  "florida international university": {
    primary: "#B6862C", secondary: "#081E3F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Florida_Internation_University_seal.svg/1280px-Florida_Internation_University_seal.svg.png",
  },
  "florida state university": {
    primary: "#CEB888", secondary: "#782F40",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Florida_State_University_seal.svg/1280px-Florida_State_University_seal.svg.png",
  },
  "florida, university of": {
    primary: "#0021A5", secondary: "#FA4616",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/University_of_Florida_seal.svg/1280px-University_of_Florida_seal.svg.png",
  },
  "fordham university": {
    primary: "#D4003A", secondary: "#900028",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Fordham_University_seal.svg/960px-Fordham_University_seal.svg.png",
  },
  "george mason university": {
    primary: "#FFCC33", secondary: "#006633",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/George_Mason_University_seal.svg/1280px-George_Mason_University_seal.svg.png",
  },
  "george washington university, the": {
    primary: "#033C5A", secondary: "#AA9868",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/George_Washington_University_seal.svg/1280px-George_Washington_University_seal.svg.png",
  },
  "georgetown university": {
    primary: "#63666A", secondary: "#041E42",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Georgetown_University_seal.svg/1280px-Georgetown_University_seal.svg.png",
  },
  "georgia state university": {
    primary: "#004CDF", secondary: "#0039A6",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/Georgia_State_University_Official_Seal.png",
  },
  "georgia, university of": {
    primary: "#2C2A29", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/University_of_Georgia_seal.png",
  },
  "golden gate university": {
    primary: "#767676", secondary: "#003468",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/1/1e/Golden_Gate_University_Seal.jpg",
  },
  "gonzaga university": {
    primary: "#0051B3", secondary: "#06274F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Gonzaga_University_coat_of_arms.svg/960px-Gonzaga_University_coat_of_arms.svg.png",
  },
  "harvard university": {
    primary: "#000000", secondary: "#A31F36",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1280px-Harvard_University_coat_of_arms.svg.png",
  },
  "hawaii, university of": {
    primary: "#00AF77", secondary: "#024731",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/University_of_Hawaii_seal.svg/1280px-University_of_Hawaii_seal.svg.png",
  },
  "hofstra university": {
    primary: "#004DD4", secondary: "#003591",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/Hofstra_University_%28seal%29.png",
  },
  "houston, university of": {
    primary: "#F00027", secondary: "#C8102E",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/University_of_Houston_seal.svg/1280px-University_of_Houston_seal.svg.png",
  },
  "howard university": {
    primary: "#E51937", secondary: "#003A63",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Howard_University_seal.svg/1280px-Howard_University_seal.svg.png",
  },
  "idaho, university of": {
    primary: "#F1B300", secondary: "#808080",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/University_of_Idaho_seal.svg/1280px-University_of_Idaho_seal.svg.png",
  },
  "illinois, university of": {
    primary: "#13294B", secondary: "#FF5F05",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/University_of_Illinois_seal.svg/1280px-University_of_Illinois_seal.svg.png",
  },
  "illinois-chicago, university of": {
    primary: "#D50032", secondary: "#001E62",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Illinois_at_Chicago_circle_logo.svg/1280px-University_of_Illinois_at_Chicago_circle_logo.svg.png",
  },
  "indiana university-bloomington": {
    primary: "#990000", secondary: "#EDEBEB",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Indiana_University_seal.svg/1280px-Indiana_University_seal.svg.png",
  },
  "indiana university-indianapolis": {
    primary: "#7D110C", secondary: "#fff",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Indiana_University_seal.svg/1280px-Indiana_University_seal.svg.png",
  },
  "inter american university of puerto rico": {
    primary: "#FED557", secondary: "#008066",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_Inter.JPG/1280px-Logo_Inter.JPG",
  },
  "iowa, university of": {
    primary: "#CEB888", secondary: "#000000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/University_of_Iowa_seal.svg/1280px-University_of_Iowa_seal.svg.png",
  },
  "jacksonville university": {
    primary: "#00B294", secondary: "#004d40",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Jacksonville_University_seal.svg/1280px-Jacksonville_University_seal.svg.png",
  },
  "kansas, the university of": {
    primary: "#0051BA", secondary: "#E8000D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/University_of_Kansas_seal.svg/1280px-University_of_Kansas_seal.svg.png",
  },
  "kentucky, university of": {
    primary: "#0046DC", secondary: "#0033A0",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/University_of_Kentucky_seal.svg/1280px-University_of_Kentucky_seal.svg.png",
  },
  "lewis & clark law school": {
    primary: "#FF4300", secondary: "#E66B3F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/c/ce/Lewis_and_clark_college_seal.png",
  },
  "liberty university": {
    primary: "#E70007", secondary: "#B72025",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Liberty_University_seal.svg/1280px-Liberty_University_seal.svg.png",
  },
  "lincoln memorial university": {
    primary: "#bfbab5", secondary: "#002d72",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/8/85/Seal_of_LMU_2023.png",
  },
  "louisiana state university": {
    primary: "#FDD023", secondary: "#461D7C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Seal-of-Louisiana-State-University.svg/1280px-Seal-of-Louisiana-State-University.svg.png",
  },
  "louisville, university of": {
    primary: "#000000", secondary: "#AD0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/University_of_Louisville_seal.svg/1280px-University_of_Louisville_seal.svg.png",
  },
  "loyola marymount university-los angeles": {
    primary: "#0076A5", secondary: "#AB0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/LMU_Lions_logo.svg/1280px-LMU_Lions_logo.svg.png",
  },
  "loyola university-chicago": {
    primary: "#FEBC18", secondary: "#8D0034",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/LoyolaUniversityChicagoSeal.png",
  },
  "loyola university-new orleans": {
    primary: "#f4aa00", secondary: "#660000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Loyolaseal.png/120px-Loyolaseal.png",
  },
  "maine, university of": {
    primary: "#5DADFF", secondary: "#B0D7FF",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/e/e5/University_of_Maine_seal.png",
  },
  "marquette university": {
    primary: "#FFCC00", secondary: "#003366",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/f/f2/Marquette_University_seal.jpg",
  },
  "maryland, university of": {
    primary: "#FFD200", secondary: "#E21833",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/University_of_Maryland_seal.svg/1280px-University_of_Maryland_seal.svg.png",
  },
  "massachusetts/dartmouth, university of": {
    primary: "#FFC92D", secondary: "#004B8D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/University_of_Massachusetts_Dartmouth_seal.svg/1280px-University_of_Massachusetts_Dartmouth_seal.svg.png",
  },
  "memphis, the university of": {
    primary: "#898D8D", secondary: "#003087",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/University_of_Memphis_seal.svg/960px-University_of_Memphis_seal.svg.png",
  },
  "mercer university": {
    primary: "#F76800", secondary: "#222222",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/0/07/Mercer_University_seal.png",
  },
  "miami, university of": {
    primary: "#FF6300", secondary: "#F47321",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/University_of_Miami_seal.svg/1280px-University_of_Miami_seal.svg.png",
  },
  "michigan state university": {
    primary: "#00AE87", secondary: "#18453B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Michigan_State_University_seal.svg/1280px-Michigan_State_University_seal.svg.png",
  },
  "michigan, university of": {
    primary: "#00274C", secondary: "#FFCB05",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Seal_of_the_University_of_Michigan.svg/1280px-Seal_of_the_University_of_Michigan.svg.png",
  },
  "minnesota, university of": {
    primary: "#FFCC33", secondary: "#7A0019",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Seal_of_the_University_of_Minnesota.svg/1280px-Seal_of_the_University_of_Minnesota.svg.png",
  },
  "mississippi college": {
    primary: "#F2A900", secondary: "#003057",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/95/Mississippi_College_seal.png",
  },
  "mississippi, the university of": {
    primary: "#ff152f", secondary: "#ce1126",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Mississippi_seal.svg/1280px-University_of_Mississippi_seal.svg.png",
  },
  "missouri, university of": {
    primary: "#FDB719", secondary: "#000000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/University_of_Missouri_seal.svg/1280px-University_of_Missouri_seal.svg.png",
  },
  "missouri-kansas city, university of": {
    primary: "#FFDD00", secondary: "#0066CC",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/UMKC_Nima_25.jpg/1280px-UMKC_Nima_25.jpg",
  },
  "mitchell/hamline school of law": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/7/73/Mitchell-Hamline_Law_School_seal.png",
  },
  "montana, university of": {
    primary: "#6B6B6B", secondary: "#70002e",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/e/e9/University_of_Montana_seal.png",
  },
  "nebraska, university of": {
    primary: "#F5F1E7", secondary: "#D00000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Seal_of_the_University_of_Nebraska.svg/1280px-Seal_of_the_University_of_Nebraska.svg.png",
  },
  "nevada-las vegas, university of": {
    primary: "#666666", secondary: "#B10202",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/University_of_Nevada%2C_Las_Vegas_seal.svg/1280px-University_of_Nevada%2C_Las_Vegas_seal.svg.png",
  },
  "new england law/boston": {
    primary: "#48a0ff", secondary: "#1a3a5c",
    sealUrl: "https://logo.clearbit.com/nesl.edu",
  },
  "new hampshire, university of": {
    primary: "#0046AD", secondary: "#001B43",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Seal-of-University-of-New-Hampshire.svg/1280px-Seal-of-University-of-New-Hampshire.svg.png",
  },
  "new mexico, the university of": {
    primary: "#A7A8AA", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/NMSU_seal.png",
  },
  "new york law school": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/Yale_Law_School_%28coat_of_arms%29.png",
  },
  "new york university": {
    primary: "#7F00D2", secondary: "#57068C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/New_York_University_Seal.svg/1280px-New_York_University_Seal.svg.png",
  },
  "north carolina central university": {
    primary: "#8E908F", secondary: "#8B2331",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/North_Carolina_Central_University_seal.svg/1280px-North_Carolina_Central_University_seal.svg.png",
  },
  "north carolina, university of": {
    primary: "#0092F5", secondary: "#4B9CD3",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/0/0e/University_of_North_Carolina_system_seal.png",
  },
  "north dakota, university of": {
    primary: "#00D95F", secondary: "#009A44",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/UNDseal.png/120px-UNDseal.png",
  },
  "north texas at dallas, university of": {
    primary: "#0000FF", secondary: "#0000FF",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/8/85/UNT_Dallas_seal_in_blue.png",
  },
  "northeastern university": {
    primary: "#F00027", secondary: "#C8102E",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bb/NU_RGB_seal_R.png",
  },
  "northern illinois university": {
    primary: "#000000", secondary: "#C8102E",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/96/Northern_illinois_univ_seal.png",
  },
  "northern kentucky university": {
    primary: "#000000", secondary: "#FFC72C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Northern_Kentucky_University_seal.svg/1280px-Northern_Kentucky_University_seal.svg.png",
  },
  "northwestern university": {
    primary: "#5200CE", secondary: "#4E2A84",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Northwestern_University_seal.svg/1280px-Northwestern_University_seal.svg.png",
  },
  "notre dame, university of": {
    primary: "#AE9142", secondary: "#0C2340",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/University_of_Notre_Dame_seal_%282%29.svg/1280px-University_of_Notre_Dame_seal_%282%29.svg.png",
  },
  "nova southeastern university": {
    primary: "#666D70", secondary: "#003893",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nova_Southeastern_University_seal.svg/1280px-Nova_Southeastern_University_seal.svg.png",
  },
  "ohio northern university": {
    primary: "#FF3500", secondary: "#FA653D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/OhioNorthernSeal.gif/250px-OhioNorthernSeal.gif",
  },
  "ohio state university, the": {
    primary: "#A7B1B7", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Ohio_State_University_seal.svg/1280px-Ohio_State_University_seal.svg.png",
  },
  "oklahoma city university": {
    primary: "#008FD9", secondary: "#00669B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Oklahoma_City_University_seal.svg/1280px-Oklahoma_City_University_seal.svg.png",
  },
  "oklahoma, university of": {
    primary: "#DDCBA4", secondary: "#841617",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/University_of_Oklahoma_seal.svg/1280px-University_of_Oklahoma_seal.svg.png",
  },
  "oregon, university of": {
    primary: "#FEE11A", secondary: "#007030",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Seal_of_the_University_of_Oregon.svg/1280px-Seal_of_the_University_of_Oregon.svg.png",
  },
  "pace university": {
    primary: "#FFC61E", secondary: "#00337F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Pace_University_seal.svg/1280px-Pace_University_seal.svg.png",
  },
  "pacific, university of the": {
    primary: "#000000", secondary: "#B51217",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Pacific_University_Oregon_seal.svg/1280px-Pacific_University_Oregon_seal.svg.png",
  },
  "penn state dickinson law": {
    primary: "#0f73ff", secondary: "#041e42",
    sealUrl: "https://logo.clearbit.com/psu.edu",
  },
  "penn state university": {
    primary: "#004CAE", secondary: "#001E44",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Pennsylvania_State_University_seal.svg/1280px-Pennsylvania_State_University_seal.svg.png",
  },
  "pennsylvania, university of": {
    primary: "#011F5B", secondary: "#990000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1280px-UPenn_shield_with_banner.svg.png",
  },
  "pepperdine university": {
    primary: "#C25700", secondary: "#00205C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Pepperdine_University_seal.svg/1280px-Pepperdine_University_seal.svg.png",
  },
  "pittsburgh, university of": {
    primary: "#FFB81C", secondary: "#003594",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/University_of_Pittsburgh_seal.svg/1280px-University_of_Pittsburgh_seal.svg.png",
  },
  "pontifical catholic university of puerto rico": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/PUCPR.JPG",
  },
  "puerto rico, university of": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/University_of_Puerto_Rico_Logo.png/250px-University_of_Puerto_Rico_Logo.png",
  },
  "quinnipiac university": {
    primary: "#fdb427", secondary: "#0b233f",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Quinnipiac_University_Seal.svg/1280px-Quinnipiac_University_Seal.svg.png",
  },
  "regent university": {
    primary: "#069948", secondary: "#002f6c",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/e/eb/Regent_university_seal_color.png",
  },
  "richmond, university of": {
    primary: "#990000", secondary: "#000066",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/University_of_Richmond_seal.svg/1280px-University_of_Richmond_seal.svg.png",
  },
  "roger williams university": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/9/94/Roger_Williams_University_seal.png",
  },
  "rutgers university": {
    primary: "#F2003C", secondary: "#CC0033",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Rutgers_University_seal.svg/1280px-Rutgers_University_seal.svg.png",
  },
  "saint louis university": {
    primary: "#0052DE", secondary: "#003DA5",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Saint_Louis_University_seal.png",
  },
  "samford university": {
    primary: "#BA0C2F", secondary: "#0C2340",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Samford_University_seal.png/250px-Samford_University_seal.png",
  },
  "san diego, university of": {
    primary: "#0067C4", secondary: "#003B70",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/University_of_San_Diego_seal.svg/1280px-University_of_San_Diego_seal.svg.png",
  },
  "san francisco, university of": {
    primary: "#FDBB30", secondary: "#00543C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/University_of_San_Francisco_coat_of_arms.gif",
  },
  "santa clara university": {
    primary: "#CF001C", secondary: "#862633",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Santa_Clara_U_Seal.svg/1280px-Santa_Clara_U_Seal.svg.png",
  },
  "seattle university": {
    primary: "#E10000", secondary: "#AA0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Seattle_University_seal.svg/1280px-Seattle_University_seal.svg.png",
  },
  "seton hall university": {
    primary: "#A2AAAD", secondary: "#004488",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Seton_Hall_University_Seal.svg/960px-Seton_Hall_University_Seal.svg.png",
  },
  "south carolina, university of": {
    primary: "#000000", secondary: "#73000A",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/University_of_South_Carolina_seal.svg/960px-University_of_South_Carolina_seal.svg.png",
  },
  "south dakota, university of": {
    primary: "#E20000", secondary: "#AD0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/University_of_South_Dakota_seal.svg/1280px-University_of_South_Dakota_seal.svg.png",
  },
  "south texas college of law houston": {
    primary: "#ff0000", secondary: "#8b0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/South_Texas_College_of_Law.jpg/1280px-South_Texas_College_of_Law.jpg",
  },
  "southern california, university of": {
    primary: "#FFCC00", secondary: "#990000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/University_of_Southern_California_%28USC%29_seal.svg/1280px-University_of_Southern_California_%28USC%29_seal.svg.png",
  },
  "southern illinois university": {
    primary: "#171717", secondary: "#6c0633",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Southern_Illinois_University_seal.png",
  },
  "southern methodist university": {
    primary: "#354CA1", secondary: "#CC0035",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Southern_Methodist_University_seal.svg/1280px-Southern_Methodist_University_seal.svg.png",
  },
  "southern university": {
    primary: "#FFC72C", secondary: "#69B3E7",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Southern_University_seal.svg/1280px-Southern_University_seal.svg.png",
  },
  "southwestern law school": {
    primary: "#005aff", secondary: "#003087",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/8/89/SouthwesternLaw_Logo.png",
  },
  "st. john's university": {
    primary: "#F30025", secondary: "#CF102D",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/St_Johns_Uni_crest.svg/960px-St_Johns_Uni_crest.svg.png",
  },
  "st. mary's university": {
    primary: "#003366", secondary: "#F2BF49",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/StMarysSealclean.png",
  },
  "st. thomas university (miami)": {
    primary: "#002855", secondary: "#862633",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/St_thomas_univ_fl_seal.png",
  },
  "st. thomas, (minneapolis) university of": {
    primary: "#999999", secondary: "#663399",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/e/ea/University_of_St_Thomas_Seal.png",
  },
  "stanford university": {
    primary: "#D20000", secondary: "#8C1515",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1280px-Seal_of_Leland_Stanford_Junior_University.svg.png",
  },
  "stetson university": {
    primary: "#17D300", secondary: "#3D8E33",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Stetson_Univ_Seal.svg/1280px-Stetson_Univ_Seal.svg.png",
  },
  "suffolk university": {
    primary: "#c6a141", secondary: "#142f53",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Suffolk_University_coat_of_arms.svg/1280px-Suffolk_University_coat_of_arms.svg.png",
  },
  "syracuse university": {
    primary: "#FF6C00", secondary: "#F76900",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Syracuse_University_seal.svg/1280px-Syracuse_University_seal.svg.png",
  },
  "temple university": {
    primary: "#DE0026", secondary: "#A41E35",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Temple_University_seal.svg/1280px-Temple_University_seal.svg.png",
  },
  "tennessee, university of": {
    primary: "#ff8200", secondary: "#ff8200",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Seal_of_the_University_of_Tennessee.svg/960px-Seal_of_the_University_of_Tennessee.svg.png",
  },
  "texas a&m university": {
    primary: "#B40000", secondary: "#500000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Texas_A%26M_University_seal.svg/1280px-Texas_A%26M_University_seal.svg.png",
  },
  "texas southern university": {
    primary: "#9149ff", secondary: "#4b2683",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Texas_Southern_University_seal.svg/1280px-Texas_Southern_University_seal.svg.png",
  },
  "texas tech university": {
    primary: "#000000", secondary: "#E90802",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Texas_Tech_University_seal.svg/1280px-Texas_Tech_University_seal.svg.png",
  },
  "texas, university of": {
    primary: "#EB6B00", secondary: "#BF5700",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/University_of_Texas_at_Austin_seal.svg/1280px-University_of_Texas_at_Austin_seal.svg.png",
  },
  "the ohio state university": {
    primary: "#A7B1B7", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Ohio_State_University_seal.svg/1280px-Ohio_State_University_seal.svg.png",
  },
  "toledo, the university of": {
    primary: "#FFD200", secondary: "#003E7E",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/UT_Hortz.svg/1280px-UT_Hortz.svg.png",
  },
  "touro university": {
    primary: "#005eff", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/7/75/TouroSeal.png",
  },
  "tulane university": {
    primary: "#71C5E8", secondary: "#21543F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tulane_University_Logo.svg/960px-Tulane_University_Logo.svg.png",
  },
  "tulsa, the university of": {
    primary: "#C2A01E", secondary: "#0A2240",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/University_of_Tulsa_seal.png",
  },
  "utah, the university of": {
    primary: "#F20000", secondary: "#CC0000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/University_of_Utah_seal.svg/1280px-University_of_Utah_seal.svg.png",
  },
  "vanderbilt university": {
    primary: "#CFAE70", secondary: "#000000",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Vanderbilt_University_seal.svg/1280px-Vanderbilt_University_seal.svg.png",
  },
  "vermont law school": {
    primary: "#00ff7f", secondary: "#006633",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/64/VermontLawSchoolSeal.gif",
  },
  "villanova university": {
    primary: "#0048BE", secondary: "#002664",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Villanova_University_seal.svg/1280px-Villanova_University_seal.svg.png",
  },
  "virginia, university of": {
    primary: "#232D4B", secondary: "#E57200",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/University_of_Virginia_seal.svg/1280px-University_of_Virginia_seal.svg.png",
  },
  "wake forest university": {
    primary: "#000000", secondary: "#9E7E38",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Wake_Forest_University_seal.svg/1280px-Wake_Forest_University_seal.svg.png",
  },
  "washburn university": {
    primary: "#005BBB", secondary: "#002E5E",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Washburn_University_seal.svg/1280px-Washburn_University_seal.svg.png",
  },
  "washington university (st. louis)": {
    primary: "#ff0050", secondary: "#a50034",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/WashU_St._Louis_seal.svg/1280px-WashU_St._Louis_seal.svg.png",
  },
  "washington and lee university": {
    primary: "#003087", secondary: "#707372",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Washington_and_lee_univ_seal.png",
  },
  "washington, university of": {
    primary: "#B7A57A", secondary: "#4B2E83",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/University_of_Washington_seal.svg/1280px-University_of_Washington_seal.svg.png",
  },
  "wayne state university": {
    primary: "#FFCC33", secondary: "#0C5449",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Wayne_State_University_seal.svg/1280px-Wayne_State_University_seal.svg.png",
  },
  "west virginia university": {
    primary: "#002855", secondary: "#EAAA00",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/West_Virginia_University_seal.svg/1280px-West_Virginia_University_seal.svg.png",
  },
  "western new england university": {
    primary: "#E6B012", secondary: "#003082",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Seal_of_Western_New_England_University.svg/1280px-Seal_of_Western_New_England_University.svg.png",
  },
  "western state, westcliff university": {
    primary: "#0273ae", secondary: "#00275a",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Irvine_Valley_College_seal.svg/1280px-Irvine_Valley_College_seal.svg.png",
  },
  "widener university commonwealth law school": {
    primary: "#ffd461", secondary: "#008aff",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/0/0f/Widener_University_Seal.png",
  },
  "widener university delaware law school": {
    primary: "#ffd461", secondary: "#008aff",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/0/0f/Widener_University_Seal.png",
  },
  "willamette university": {
    primary: "#C6AA76", secondary: "#BA0C2F",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/WillametteUniversitySeal.png",
  },
  "william & mary": {
    primary: "#B9975B", secondary: "#115740",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/d/d7/College_of_William_%26_Mary_Coat_of_Arms.png",
  },
  "wilmington university school of law": {
    primary: "#00CF7C", secondary: "#008751",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Seal-of-Wilmington-University.svg/1280px-Seal-of-Wilmington-University.svg.png",
  },
  "wisconsin, university of": {
    primary: "#EE0008", secondary: "#C5050C",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Seal_of_the_University_of_Wisconsin.svg/1280px-Seal_of_the_University_of_Wisconsin.svg.png",
  },
  "wyoming, university of": {
    primary: "#FFC425", secondary: "#492F24",
    sealUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/University_of_Wyoming_seal.svg/1280px-University_of_Wyoming_seal.svg.png",
  },
  "yale university": {
    primary: "#005FC1", secondary: "#00356B",
    sealUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/1280px-Yale_University_Shield_1.svg.png",
  },
};

const FALLBACK: SchoolBranding = {
  primary: "#f0f4f8",
  secondary: "#334155",
  sealUrl: "",
};

export function getBranding(schoolName: string): SchoolBranding {
  return BRANDING[schoolName.toLowerCase().trim()] ?? FALLBACK;
}
