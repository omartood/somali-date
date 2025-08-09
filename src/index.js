// Somali Gregorian months & weekdays
const MONTHS_LONG = [
    "Janaayo", "Febraayo", "Maarso", "Abriil", "Maajo", "Juun",
    "Luuliyo", "Agoosto", "Sebteembar", "Oktoobar", "Nofeembar", "Diseembar"
  ];
  const MONTHS_SHORT = [
    "Jan", "Feb", "Mar", "Abr", "Majo", "Juun",
    "Llyo", "Ago", "Seb", "Okt", "Nof", "Dis"
  ];
  const WEEKDAYS_LONG = ["Axad", "Isniin", "Talaado", "Arbaco", "Khamiis", "Jimco", "Sabti"];
  const WEEKDAYS_SHORT = ["Axd", "Isn", "Tal", "Arb", "Khm", "Jmc", "Sbt"];
  
  // Hijri months in Somali
  const HIJRI_MONTHS_LONG = [
    "Muxarram", "Safar", "Rabiicul Awwal", "Rabiicul Thaani",
    "Jumaadal Uula", "Jumaadal Aakhir", "Rajab", "Shacbaan",
    "Ramadaan", "Shawwaal", "Dhul-Qacda", "Dhul-Xijja"
  ];
  const HIJRI_MONTHS_SHORT = [
    "Mux", "Saf", "Rab-I", "Rab-II", "Jum-I", "Jum-II", "Raj", "Sha",
    "Ram", "Shw", "DhQ", "DhX"
  ];
  
  // --- Date helpers ---
  function toDate(d) {
    if (d instanceof Date) return d;
    const x = new Date(d);
    if (Number.isNaN(+x)) throw new Error("Invalid date input");
    return x;
  }
  const p2 = (n) => String(n).padStart(2, "0");
  
  // --- Gregorian to Julian Day Number ---
  function g2jdn(y, m, day) {
    const a = Math.floor((14 - m) / 12);
    const y2 = y + 4800 - a;
    const m2 = m + 12 * a - 3;
    return day + Math.floor((153 * m2 + 2) / 5) + 365 * y2 +
      Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
  }
  
  // --- JDN to Hijri (Kuwaiti algorithm) ---
  function jdnToHijri(jd) {
    let l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    const j =
      Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
      Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l =
      l -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    const m = Math.floor((24 * l) / 709);
    const d = l - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;
    return { hYear: y, hMonth: m, hDay: d };
  }
  
  // --- Gregorian (Somali) formatters ---
  function formatDateSomali(date, opts = {}) {
    const d = toDate(date);
    const {
      weekday = "none", month = "long", numeric = true
    } = opts;
    const m = month === "short" ? MONTHS_SHORT[d.getMonth()] : MONTHS_LONG[d.getMonth()];
    const parts = [];
    if (weekday !== "none") {
      const wd = weekday === "short" ? WEEKDAYS_SHORT[d.getDay()] : WEEKDAYS_LONG[d.getDay()];
      parts.push(`${wd},`);
    }
    if (numeric) {
      parts.push(`${d.getDate()} ${m} ${d.getFullYear()}`);
    } else {
      parts.push(m);
    }
    return parts.join(" ").trim();
  }
  
  function formatTimeSomali(date, opts = {}) {
    const d = toDate(date);
    const { seconds = false } = opts;
    const hh = p2(d.getHours());
    const mm = p2(d.getMinutes());
    const ss = p2(d.getSeconds());
    return seconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  }
  
  function formatDateTimeSomali(date, opts = {}) {
    const left = formatDateSomali(date, opts);
    const right = formatTimeSomali(date, { seconds: !!opts.seconds });
    return `${left} ${right}`;
  }
  
  function formatRelativeSomali(from, to = new Date()) {
    const a = toDate(from);
    const b = toDate(to);
    const diffDays = Math.round((a.setHours(0,0,0,0) - b.setHours(0,0,0,0)) / 86400000);
    if (diffDays === 0) return "maanta";
    if (diffDays === -1) return "shalay";
    if (diffDays === 1) return "berri";
    if (diffDays < 0) return `${Math.abs(diffDays)} maalmood ka hor`;
    return `${diffDays} maalmood gudahood`;
  }
  
  // --- Hijri formatters ---
  function formatHijriSomali(date, opts = {}) {
    const d = toDate(date);
    const jdn = g2jdn(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const { hYear, hMonth, hDay } = jdnToHijri(jdn);
    const { weekday = "none", month = "long", numeric = true } = opts;
    const mName = (month === "short" ? HIJRI_MONTHS_SHORT : HIJRI_MONTHS_LONG)[hMonth - 1];
    const parts = [];
    if (weekday !== "none") {
      const wd = weekday === "short" ? WEEKDAYS_SHORT[d.getDay()] : WEEKDAYS_LONG[d.getDay()];
      parts.push(`${wd},`);
    }
    parts.push(numeric ? `${hDay} ${mName} ${hYear}` : mName);
    return parts.join(" ").trim();
  }
  
  function formatDateSomaliWithHijri(date, opts = {}) {
    const g = formatDateSomali(date, opts);
    const h = formatHijriSomali(date, { weekday: "none", month: opts.month ?? "long" });
    return `${g} — (${h} Hijri)`;
  }
  
  // --- Easy calendar selection functions ---
  function formatDate(date, calendar = "gregorian", opts = {}) {
    const defaultOpts = { weekday: "long", month: "long", ...opts };
    switch (calendar.toLowerCase()) {
      case "hijri":
      case "islamic":
        return formatHijriSomali(date, defaultOpts);
      case "both":
      case "dual":
        return formatDateSomaliWithHijri(date, defaultOpts);
      case "gregorian":
      case "western":
      default:
        return formatDateSomali(date, defaultOpts);
    }
  }
  
  function formatDateTime(date, calendar = "gregorian", opts = {}) {
    const defaultOpts = { weekday: "long", month: "long", ...opts };
    const timeStr = formatTimeSomali(date, { seconds: !!opts.seconds });
    
    switch (calendar.toLowerCase()) {
      case "hijri":
      case "islamic":
        return `${formatHijriSomali(date, defaultOpts)} ${timeStr}`;
      case "both":
      case "dual":
        return `${formatDateSomaliWithHijri(date, defaultOpts)} ${timeStr}`;
      case "gregorian":
      case "western":
      default:
        return formatDateTimeSomali(date, defaultOpts);
    }
  }
  
  // Quick preset functions
  const today = (calendar = "gregorian") => formatDate(new Date(), calendar);
  const now = (calendar = "gregorian") => formatDateTime(new Date(), calendar);
  
  // --- Exports ---
  module.exports = {
    formatDateSomali,
    formatTimeSomali,
    formatDateTimeSomali,
    formatRelativeSomali,
    MONTHS_LONG, MONTHS_SHORT, WEEKDAYS_LONG, WEEKDAYS_SHORT,
    HIJRI_MONTHS_LONG, HIJRI_MONTHS_SHORT,
    formatHijriSomali,
    formatDateSomaliWithHijri,
    // Easy functions
    formatDate,
    formatDateTime,
    today,
    now
  };
  