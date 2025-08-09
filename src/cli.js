#!/usr/bin/env node
const {
  formatDateSomali,
  formatTimeSomali,
  formatDateTimeSomali,
  formatRelativeSomali,
  formatHijriSomali,
  formatDateSomaliWithHijri,
  formatDate,
  formatDateTime,
  today,
  now,
  numberToSomali,
  formatSomaliTraditional,
  getSomaliSeason,
  formatRelativeSomaliDetailed,
  formatDurationSomali,
  formatAgeSomali,
  formatDateRange,
  formatDateSomaliWithNumbers,
  isHoliday,
  getHolidayName,
  getUpcomingHolidays,
  isBusinessDay,
  addBusinessDays,
  gregorianToHijri,
  getPrayerTimesSomali,
} = require("./index");

const args = process.argv.slice(2);
const [cmd, ...rest] = args;

// Parse arguments - support both old and new formats
let argDate, calendar;
if (rest.length === 1) {
  // Could be date or calendar
  if (
    ["gregorian", "western", "hijri", "islamic", "both", "dual"].includes(
      rest[0]
    )
  ) {
    calendar = rest[0];
  } else {
    argDate = rest[0];
  }
} else if (rest.length === 2) {
  [argDate, calendar] = rest;
}

const d = argDate ? new Date(argDate) : new Date();

function help() {
  console.log(
    `
  somodate - Comprehensive Somali date/time formatter
  
  Basic Commands:
    somodate date [isoDate] [calendar]    # Date with calendar choice
    somodate time [isoDate]               # 24h time
    somodate datetime [isoDate] [calendar] # Date + time with calendar choice
    somodate today [calendar]             # Today's date
    somodate now [calendar]               # Current date and time
    
  Advanced Features:
    somodate traditional [isoDate]        # Somali traditional season
    somodate season [isoDate]             # Get current season info
    somodate relative-detailed [isoDate]  # Detailed relative time
    somodate age <birthDate>              # Calculate age in Somali
    somodate duration <milliseconds>      # Format duration
    somodate numbers <number>             # Convert number to Somali
    somodate somali-numbers [isoDate]     # Date with Somali numerals
    
  Holiday & Business:
    somodate holiday [isoDate]            # Check if date is holiday
    somodate holidays [days]              # Upcoming holidays (default: 30 days)
    somodate business-day [isoDate]       # Check if business day
    somodate add-business <isoDate> <days> # Add business days
    
  Prayer Times:
    somodate prayer [isoDate]             # Prayer times for date
    
  Calendar Conversion:
    somodate convert-hijri [isoDate]      # Convert to Hijri
    
  Calendar options: gregorian, western, hijri, islamic, both, dual
  Default calendar: gregorian
  
  Examples:
    somodate today hijri                  # Today in Hijri
    somodate traditional                  # Current traditional season
    somodate age 1990-01-01              # Age calculation
    somodate numbers 25                   # "shan iyo labaatan"
    somodate holidays 7                   # Next week's holidays
    somodate prayer                       # Today's prayer times
  `.trim()
  );
}

switch (cmd) {
  // Basic commands
  case "date":
    console.log(formatDate(d, calendar));
    break;
  case "time":
    console.log(formatTimeSomali(d));
    break;
  case "datetime":
    console.log(formatDateTime(d, calendar));
    break;
  case "relative":
    console.log(formatRelativeSomali(d, new Date()));
    break;
  case "today":
    console.log(today(calendar));
    break;
  case "now":
    console.log(now(calendar));
    break;

  // Advanced features
  case "traditional":
    console.log(formatSomaliTraditional(d, { includeGregorian: true }));
    break;
  case "season":
    const seasonInfo = getSomaliSeason(d);
    console.log(
      seasonInfo
        ? `${seasonInfo.season} - ${seasonInfo.description}`
        : "Unknown season"
    );
    break;
  case "relative-detailed":
    console.log(
      formatRelativeSomaliDetailed(d, new Date(), { includeTime: true })
    );
    break;
  case "age":
    if (!argDate) {
      console.error("Birth date required for age calculation");
      process.exit(1);
    }
    console.log(formatAgeSomali(d));
    break;
  case "duration":
    const ms = parseInt(rest[0]);
    if (isNaN(ms)) {
      console.error("Valid milliseconds number required");
      process.exit(1);
    }
    console.log(formatDurationSomali(ms));
    break;
  case "numbers":
    const num = parseInt(rest[0]);
    if (isNaN(num)) {
      console.error("Valid number required");
      process.exit(1);
    }
    console.log(numberToSomali(num));
    break;
  case "somali-numbers":
    console.log(
      formatDateSomaliWithNumbers(d, {
        numerals: "somali",
        weekday: "long",
        month: "long",
      })
    );
    break;

  // Holiday & Business
  case "holiday":
    const holidayName = getHolidayName(d);
    if (holidayName) {
      console.log(`${formatDateSomali(d)} - ${holidayName}`);
    } else {
      console.log(`${formatDateSomali(d)} - Ma aha maalin cid ah`);
    }
    break;
  case "holidays":
    const days = parseInt(rest[0]) || 30;
    const upcoming = getUpcomingHolidays(days);
    if (upcoming.length === 0) {
      console.log(`Cidaha soo socda ${days} maalmood ma jiraan`);
    } else {
      console.log(`Cidaha soo socda ${days} maalmood:`);
      upcoming.forEach((h) => {
        const dayText =
          h.daysFromNow === 0
            ? "maanta"
            : h.daysFromNow === 1
            ? "berri"
            : `${h.daysFromNow} maalmood gudahood`;
        console.log(`  ${h.formatted} (${dayText}) - ${h.name}`);
      });
    }
    break;
  case "business-day":
    console.log(
      isBusinessDay(d) ? "Haa, maalin shaqo ah" : "Maya, ma aha maalin shaqo"
    );
    break;
  case "add-business":
    const businessDays = parseInt(rest[1]);
    if (isNaN(businessDays)) {
      console.error("Valid number of business days required");
      process.exit(1);
    }
    const newDate = addBusinessDays(d, businessDays);
    console.log(formatDateSomali(newDate, { weekday: "long", month: "long" }));
    break;

  // Prayer times
  case "prayer":
    const prayers = getPrayerTimesSomali(d);
    console.log(`Waqtiyada salaadda ${formatDateSomali(d)}:`);
    Object.entries(prayers).forEach(([name, time]) => {
      console.log(`  ${name}: ${time}`);
    });
    break;

  // Calendar conversion
  case "convert-hijri":
    const hijriDate = gregorianToHijri(d);
    console.log(
      `${formatDateSomali(d)} = ${hijriDate.hDay} ${hijriDate.hMonth} ${
        hijriDate.hYear
      } Hijri`
    );
    break;

  // Legacy commands (backward compatibility)
  case "hijri":
    console.log(formatHijriSomali(d, { weekday: "long", month: "long" }));
    break;
  case "both":
    console.log(
      formatDateSomaliWithHijri(d, { weekday: "long", month: "long" })
    );
    break;
  case "help":
  case undefined:
    help();
    break;
  default:
    console.error("Unknown command.\n");
    help();
    process.exit(1);
}
