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
  somodate - Somali date/time formatter
  
  Usage:
    somodate date [isoDate] [calendar]    # Date with calendar choice
    somodate time [isoDate]               # 24h time
    somodate datetime [isoDate] [calendar] # Date + time with calendar choice
    somodate relative [isoDate]           # maanta / shalay / berri
    somodate today [calendar]             # Today's date
    somodate now [calendar]               # Current date and time
    
    # Legacy commands (still supported):
    somodate hijri [isoDate]              # Hijri in Somali
    somodate both [isoDate]               # Gregorian + Hijri
    
  Calendar options: gregorian, western, hijri, islamic, both, dual
  Default calendar: gregorian
  
  Examples:
    somodate today hijri                  # Today in Hijri
    somodate now both                     # Current time with both calendars
    somodate date 2025-12-25 islamic      # Christmas in Islamic calendar
  `.trim()
  );
}

switch (cmd) {
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
