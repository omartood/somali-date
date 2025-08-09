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
  
  // Somali number words
  const NUMBERS_SOMALI = {
    0: "eber", 1: "kow", 2: "laba", 3: "saddex", 4: "afar", 5: "shan", 6: "lix", 7: "todobaad", 8: "siddeed", 9: "sagaal",
    10: "toban", 11: "kow iyo toban", 12: "laba iyo toban", 13: "saddex iyo toban", 14: "afar iyo toban", 15: "shan iyo toban",
    16: "lix iyo toban", 17: "todobaad iyo toban", 18: "siddeed iyo toban", 19: "sagaal iyo toban", 20: "labaatan",
    30: "soddon", 40: "afartan", 50: "konton", 60: "lixdan", 70: "toddobaatan", 80: "siddeetan", 90: "sagaashan",
    100: "boqol", 1000: "kun"
  };
  
  // Somali traditional seasons
  const SOMALI_SEASONS = {
    "Jilaal": { months: [12, 1, 2, 3], description: "Dry season" },
    "Gu": { months: [4, 5, 6], description: "Main rainy season" },
    "Xagaa": { months: [7, 8, 9], description: "Hot dry season" },
    "Dayr": { months: [10, 11], description: "Short rainy season" }
  };
  
  // Somali and Islamic holidays
  const SOMALI_HOLIDAYS = {
    // Fixed Gregorian holidays
    "01-01": "Sanadka Cusub", // New Year
    "06-26": "Maalinta Madaxbannida", // Independence Day
    "07-01": "Maalinta Midnimada", // Unity Day
    // Islamic holidays (approximate - need lunar calculation)
    "ramadan-end": "Ciid al-Fitr",
    "hajj-end": "Ciid al-Adha",
    "prophet-birthday": "Mawlid an-Nabi",
    "hijri-new-year": "Sanadka Cusub ee Hijri"
  };
  
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
  
  // --- Number conversion functions ---
  function numberToSomali(num) {
    if (num === 0) return NUMBERS_SOMALI[0];
    if (num < 0) return `taban ${numberToSomali(Math.abs(num))}`;
    if (num <= 20) return NUMBERS_SOMALI[num];
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;
      return ones === 0 ? NUMBERS_SOMALI[tens] : `${NUMBERS_SOMALI[ones]} iyo ${NUMBERS_SOMALI[tens]}`;
    }
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      const hundredStr = hundreds === 1 ? "boqol" : `${numberToSomali(hundreds)} boqol`;
      return remainder === 0 ? hundredStr : `${hundredStr} iyo ${numberToSomali(remainder)}`;
    }
    if (num < 1000000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      const thousandStr = thousands === 1 ? "kun" : `${numberToSomali(thousands)} kun`;
      return remainder === 0 ? thousandStr : `${thousandStr} iyo ${numberToSomali(remainder)}`;
    }
    return num.toString(); // Fallback for very large numbers
  }

  // --- Traditional Somali calendar functions ---
  function getSomaliSeason(date) {
    const d = toDate(date);
    const month = d.getMonth() + 1;
    for (const [season, info] of Object.entries(SOMALI_SEASONS)) {
      if (info.months.includes(month)) {
        return { season, description: info.description };
      }
    }
    return null;
  }

  function formatSomaliTraditional(date, opts = {}) {
    const d = toDate(date);
    const seasonInfo = getSomaliSeason(d);
    const { includeGregorian = false } = opts;
    
    if (!seasonInfo) return formatDateSomali(date, opts);
    
    const seasonStr = `${seasonInfo.season} (${seasonInfo.description})`;
    return includeGregorian ? `${formatDateSomali(date, opts)} - ${seasonStr}` : seasonStr;
  }

  // --- Holiday functions ---
  function isHoliday(date) {
    const d = toDate(date);
    const monthDay = `${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
    return SOMALI_HOLIDAYS[monthDay] !== undefined;
  }

  function getHolidayName(date) {
    const d = toDate(date);
    const monthDay = `${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
    return SOMALI_HOLIDAYS[monthDay] || null;
  }

  function getUpcomingHolidays(days = 30) {
    const today = new Date();
    const upcoming = [];
    
    for (let i = 0; i < days; i++) {
      const checkDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const holiday = getHolidayName(checkDate);
      if (holiday) {
        upcoming.push({
          date: checkDate,
          name: holiday,
          daysFromNow: i,
          formatted: formatDateSomali(checkDate)
        });
      }
    }
    
    return upcoming;
  }

  // --- Business day functions ---
  function isBusinessDay(date) {
    const d = toDate(date);
    const dayOfWeek = d.getDay();
    // In Somalia, Friday is typically a day off, Saturday-Thursday are work days
    return dayOfWeek !== 5; // 5 = Friday (Jimco)
  }

  function addBusinessDays(date, days) {
    const d = new Date(toDate(date));
    let addedDays = 0;
    
    while (addedDays < Math.abs(days)) {
      d.setDate(d.getDate() + (days > 0 ? 1 : -1));
      if (isBusinessDay(d)) {
        addedDays++;
      }
    }
    
    return d;
  }

  // --- Enhanced relative date functions ---
  function formatRelativeSomaliDetailed(from, to = new Date(), opts = {}) {
    const a = toDate(from);
    const b = toDate(to);
    const { includeTime = false } = opts;
    
    const diffMs = a.getTime() - b.getTime();
    const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.round(diffMs / (60 * 60 * 1000));
    const diffMinutes = Math.round(diffMs / (60 * 1000));
    
    // Same day
    if (diffDays === 0) {
      if (!includeTime) return "maanta";
      if (Math.abs(diffHours) < 1) {
        if (Math.abs(diffMinutes) < 5) return "hadda";
        return diffMinutes > 0 ? `${diffMinutes} daqiiqo gudahood` : `${Math.abs(diffMinutes)} daqiiqo ka hor`;
      }
      return diffHours > 0 ? `${diffHours} saacadood gudahood` : `${Math.abs(diffHours)} saacadood ka hor`;
    }
    
    // Days
    if (diffDays === -1) return includeTime ? `shalay ${formatTimeSomali(a)}` : "shalay";
    if (diffDays === 1) return includeTime ? `berri ${formatTimeSomali(a)}` : "berri";
    if (diffDays === -2) return "doraad";
    if (diffDays === 2) return "saakuun";
    
    // Weeks
    if (Math.abs(diffDays) < 7) {
      const dayName = WEEKDAYS_LONG[a.getDay()];
      return diffDays > 0 ? `${dayName} soo socda` : `${dayName} ee tegay`;
    }
    
    // Default to regular relative
    return formatRelativeSomali(from, to);
  }

  // --- Duration formatting ---
  function formatDurationSomali(milliseconds) {
    const ms = Math.abs(milliseconds);
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
    
    if (years > 0) {
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      let result = years === 1 ? "sannad" : `${years} sannadood`;
      if (months > 0) {
        result += months === 1 ? " iyo bil" : ` iyo ${months} bilood`;
      }
      return result;
    }
    
    if (days > 0) {
      const remainingHours = hours % 24;
      let result = days === 1 ? "maalin" : `${days} maalmood`;
      if (remainingHours > 0) {
        result += remainingHours === 1 ? " iyo saacad" : ` iyo ${remainingHours} saacadood`;
      }
      return result;
    }
    
    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      let result = hours === 1 ? "saacad" : `${hours} saacadood`;
      if (remainingMinutes > 0) {
        result += remainingMinutes === 1 ? " iyo daqiiqo" : ` iyo ${remainingMinutes} daqiiqo`;
      }
      return result;
    }
    
    if (minutes > 0) {
      return minutes === 1 ? "daqiiqo" : `${minutes} daqiiqo`;
    }
    
    return seconds === 1 ? "ilbiriqsi" : `${seconds} ilbiriqsi`;
  }

  // --- Age formatting ---
  function formatAgeSomali(birthDate, referenceDate = new Date()) {
    const birth = toDate(birthDate);
    const ref = toDate(referenceDate);
    const ageMs = ref.getTime() - birth.getTime();
    
    if (ageMs < 0) return "weli ma dhalan";
    
    return formatDurationSomali(ageMs);
  }

  // --- Date range formatting ---
  function formatDateRange(startDate, endDate, calendar = "gregorian", opts = {}) {
    const start = toDate(startDate);
    const end = toDate(endDate);
    const { compact = false } = opts;
    
    // Same day
    if (start.toDateString() === end.toDateString()) {
      return formatDate(start, calendar, opts);
    }
    
    // Same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      if (compact) {
        const monthName = calendar === "hijri" ? 
          HIJRI_MONTHS_LONG[start.getMonth()] : 
          MONTHS_LONG[start.getMonth()];
        return `${start.getDate()}-${end.getDate()} ${monthName} ${start.getFullYear()}`;
      }
    }
    
    // Different dates
    const startFormatted = formatDate(start, calendar, { ...opts, weekday: "none" });
    const endFormatted = formatDate(end, calendar, { ...opts, weekday: "none" });
    return `${startFormatted} - ${endFormatted}`;
  }

  // --- Calendar conversion utilities ---
  function gregorianToHijri(date) {
    const d = toDate(date);
    const jdn = g2jdn(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return jdnToHijri(jdn);
  }

  function hijriToGregorian(hYear, hMonth, hDay) {
    // Simplified conversion - would need more complex algorithm for precision
    const approxGregorianYear = hYear + 622;
    return new Date(approxGregorianYear, hMonth - 1, hDay);
  }

  // --- Enhanced formatting with Somali numerals ---
  function formatDateSomaliWithNumbers(date, opts = {}) {
    const d = toDate(date);
    const { numerals = "arabic", ...restOpts } = opts;
    
    if (numerals === "somali") {
      const day = numberToSomali(d.getDate());
      const month = MONTHS_LONG[d.getMonth()];
      const year = numberToSomali(d.getFullYear());
      
      const parts = [];
      if (restOpts.weekday !== "none") {
        const wd = restOpts.weekday === "short" ? WEEKDAYS_SHORT[d.getDay()] : WEEKDAYS_LONG[d.getDay()];
        parts.push(`${wd},`);
      }
      parts.push(`${day} ${month} ${year}`);
      return parts.join(" ").trim();
    }
    
    return formatDateSomali(date, restOpts);
  }

  // --- Prayer times (basic implementation) ---
  function getPrayerTimesSomali(date, latitude = 2.0469, longitude = 45.3182) { // Mogadishu coordinates
    const d = toDate(date);
    // Simplified prayer time calculation - in real implementation, use proper astronomical calculations
    const times = {
      "Subax": "05:30",
      "Duhur": "12:15",
      "Casar": "15:45", 
      "Maghrib": "18:30",
      "Cisha": "19:45"
    };
    
    return times;
  }

  // Quick preset functions
  const today = (calendar = "gregorian") => formatDate(new Date(), calendar);
  const now = (calendar = "gregorian") => formatDateTime(new Date(), calendar);
  
  // --- Exports ---
  module.exports = {
    // Core formatting functions
    formatDateSomali,
    formatTimeSomali,
    formatDateTimeSomali,
    formatRelativeSomali,
    formatHijriSomali,
    formatDateSomaliWithHijri,
    
    // Easy functions
    formatDate,
    formatDateTime,
    today,
    now,
    
    // Advanced features
    numberToSomali,
    formatSomaliTraditional,
    getSomaliSeason,
    formatRelativeSomaliDetailed,
    formatDurationSomali,
    formatAgeSomali,
    formatDateRange,
    formatDateSomaliWithNumbers,
    
    // Holiday functions
    isHoliday,
    getHolidayName,
    getUpcomingHolidays,
    
    // Business day functions
    isBusinessDay,
    addBusinessDays,
    
    // Calendar conversion
    gregorianToHijri,
    hijriToGregorian,
    
    // Prayer times
    getPrayerTimesSomali,
    
    // Constants
    MONTHS_LONG, MONTHS_SHORT, WEEKDAYS_LONG, WEEKDAYS_SHORT,
    HIJRI_MONTHS_LONG, HIJRI_MONTHS_SHORT,
    NUMBERS_SOMALI, SOMALI_SEASONS, SOMALI_HOLIDAYS
  };
  