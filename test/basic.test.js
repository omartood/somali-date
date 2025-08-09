import { describe, it, expect } from "vitest";
import {
  formatDateSomali, formatTimeSomali, formatDateTimeSomali, formatRelativeSomali,
  formatHijriSomali, formatDate, formatDateTime, today, now,
  numberToSomali, formatSomaliTraditional, getSomaliSeason,
  formatRelativeSomaliDetailed, formatDurationSomali, formatAgeSomali,
  isHoliday, getHolidayName, getUpcomingHolidays, isBusinessDay,
  addBusinessDays, gregorianToHijri, getPrayerTimesSomali,
  formatDateSomaliWithNumbers, formatDateRange
} from "../src/index.js";

describe("somali-date", () => {
  // Basic formatting tests
  it("formats a date (long)", () => {
    const s = formatDateSomali(new Date("2025-08-14T10:00:00Z"), { weekday: "long", month: "long" });
    expect(s.includes("Agoosto")).toBe(true);
  });

  it("formats time 24h", () => {
    const s = formatTimeSomali(new Date("2025-08-14T07:05:09Z"));
    expect(/\d{2}:\d{2}/.test(s)).toBe(true);
  });

  it("formats datetime", () => {
    const s = formatDateTimeSomali(new Date("2025-08-14T07:05:09Z"));
    expect(s).toMatch(/ \d{2}:\d{2}$/);
  });

  it("relative wording", () => {
    const today = new Date();
    expect(formatRelativeSomali(today)).toBe("maanta");
  });

  // Hijri calendar tests
  it("formats Hijri dates", () => {
    const s = formatHijriSomali(new Date("2025-08-14T10:00:00Z"));
    expect(s).toContain("1447");
  });

  // Easy function tests
  it("easy formatDate function works", () => {
    const s = formatDate(new Date("2025-08-14T10:00:00Z"), "gregorian");
    expect(s.includes("Agoosto")).toBe(true);
  });

  it("easy formatDate with hijri", () => {
    const s = formatDate(new Date("2025-08-14T10:00:00Z"), "hijri");
    expect(s).toContain("1447");
  });

  it("today function works", () => {
    const s = today();
    expect(typeof s).toBe("string");
    expect(s.length).toBeGreaterThan(0);
  });

  it("now function works", () => {
    const s = now();
    expect(typeof s).toBe("string");
    expect(s).toMatch(/\d{2}:\d{2}$/);
  });

  // Number conversion tests
  it("converts numbers to Somali", () => {
    expect(numberToSomali(1)).toBe("kow");
    expect(numberToSomali(25)).toBe("shan iyo labaatan");
    expect(numberToSomali(100)).toBe("boqol");
  });

  // Traditional calendar tests
  it("gets Somali season", () => {
    const season = getSomaliSeason(new Date("2025-08-14"));
    expect(season).toBeTruthy();
    expect(season.season).toBe("Xagaa");
  });

  it("formats traditional Somali date", () => {
    const s = formatSomaliTraditional(new Date("2025-08-14"));
    expect(s).toContain("Xagaa");
  });

  // Duration and age tests
  it("formats duration in Somali", () => {
    const oneHour = 60 * 60 * 1000;
    const s = formatDurationSomali(oneHour);
    expect(s).toBe("saacad");
  });

  it("formats age in Somali", () => {
    const birthDate = new Date("1990-01-01");
    const referenceDate = new Date("2025-01-01");
    const s = formatAgeSomali(birthDate, referenceDate);
    expect(s).toContain("sannadood");
  });

  // Holiday tests
  it("checks independence day", () => {
    const independenceDay = new Date("2025-06-26");
    expect(isHoliday(independenceDay)).toBe(true);
    expect(getHolidayName(independenceDay)).toBe("Maalinta Madaxbannida");
  });

  it("gets upcoming holidays", () => {
    const holidays = getUpcomingHolidays(365);
    expect(Array.isArray(holidays)).toBe(true);
  });

  // Business day tests
  it("checks business days", () => {
    const friday = new Date("2025-08-15"); // Friday
    const saturday = new Date("2025-08-16"); // Saturday
    expect(isBusinessDay(friday)).toBe(false); // Friday is not a business day in Somalia
    expect(isBusinessDay(saturday)).toBe(true); // Saturday is a business day
  });

  it("adds business days", () => {
    const startDate = new Date("2025-08-14");
    const result = addBusinessDays(startDate, 5);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBeGreaterThan(startDate.getTime());
  });

  // Calendar conversion tests
  it("converts Gregorian to Hijri", () => {
    const hijri = gregorianToHijri(new Date("2025-08-14"));
    expect(hijri).toHaveProperty("hYear");
    expect(hijri).toHaveProperty("hMonth");
    expect(hijri).toHaveProperty("hDay");
    expect(hijri.hYear).toBe(1447);
  });

  // Prayer times tests
  it("gets prayer times", () => {
    const prayers = getPrayerTimesSomali(new Date());
    expect(prayers).toHaveProperty("Subax");
    expect(prayers).toHaveProperty("Duhur");
    expect(prayers).toHaveProperty("Casar");
    expect(prayers).toHaveProperty("Maghrib");
    expect(prayers).toHaveProperty("Cisha");
  });

  // Somali numerals tests
  it("formats date with Somali numerals", () => {
    const s = formatDateSomaliWithNumbers(new Date("2025-08-14"), { numerals: "somali" });
    expect(s).toContain("afar iyo toban"); // 14 in Somali
  });

  // Date range tests
  it("formats date ranges", () => {
    const start = new Date("2025-08-14");
    const end = new Date("2025-08-20");
    const s = formatDateRange(start, end);
    expect(s).toContain("-");
    expect(s).toContain("Agoosto");
  });

  // Detailed relative tests
  it("formats detailed relative dates", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const s = formatRelativeSomaliDetailed(yesterday);
    expect(s).toBe("shalay");
  });
});
