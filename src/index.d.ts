export type WeekdayOpt = "none" | "short" | "long";
export type MonthOpt = "long" | "short";

export function formatDateSomali(
  date: Date | string | number,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean }
): string;

export function formatTimeSomali(
  date: Date | string | number,
  opts?: { seconds?: boolean }
): string;

export function formatDateTimeSomali(
  date: Date | string | number,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean; seconds?: boolean }
): string;

export function formatRelativeSomali(
  from: Date | string | number,
  to?: Date | string | number
): string;

export const MONTHS_LONG: string[];
export const MONTHS_SHORT: string[];
export const WEEKDAYS_LONG: string[];
export const WEEKDAYS_SHORT: string[];

export const HIJRI_MONTHS_LONG: string[];
export const HIJRI_MONTHS_SHORT: string[];

export function formatHijriSomali(
  date: Date | string | number,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean }
): string;

export function formatDateSomaliWithHijri(
  date: Date | string | number,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean }
): string;

export type CalendarType = "gregorian" | "western" | "hijri" | "islamic" | "both" | "dual";

export function formatDate(
  date: Date | string | number,
  calendar?: CalendarType,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean }
): string;

export function formatDateTime(
  date: Date | string | number,
  calendar?: CalendarType,
  opts?: { weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean; seconds?: boolean }
): string;

export function today(calendar?: CalendarType): string;
export function now(calendar?: CalendarType): string;

// Advanced features
export function numberToSomali(num: number): string;

export function formatSomaliTraditional(
  date: Date | string | number,
  opts?: { includeGregorian?: boolean }
): string;

export function getSomaliSeason(date: Date | string | number): {
  season: string;
  description: string;
} | null;

export function formatRelativeSomaliDetailed(
  from: Date | string | number,
  to?: Date | string | number,
  opts?: { includeTime?: boolean }
): string;

export function formatDurationSomali(milliseconds: number): string;

export function formatAgeSomali(
  birthDate: Date | string | number,
  referenceDate?: Date | string | number
): string;

export function formatDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
  calendar?: CalendarType,
  opts?: { compact?: boolean; weekday?: WeekdayOpt; month?: MonthOpt }
): string;

export function formatDateSomaliWithNumbers(
  date: Date | string | number,
  opts?: { numerals?: "arabic" | "somali"; weekday?: WeekdayOpt; month?: MonthOpt; numeric?: boolean }
): string;

// Holiday functions
export function isHoliday(date: Date | string | number): boolean;
export function getHolidayName(date: Date | string | number): string | null;
export function getUpcomingHolidays(days?: number): Array<{
  date: Date;
  name: string;
  daysFromNow: number;
  formatted: string;
}>;

// Business day functions
export function isBusinessDay(date: Date | string | number): boolean;
export function addBusinessDays(date: Date | string | number, days: number): Date;

// Calendar conversion
export function gregorianToHijri(date: Date | string | number): {
  hYear: number;
  hMonth: number;
  hDay: number;
};
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): Date;

// Prayer times
export function getPrayerTimesSomali(
  date: Date | string | number,
  latitude?: number,
  longitude?: number
): {
  Subax: string;
  Duhur: string;
  Casar: string;
  Maghrib: string;
  Cisha: string;
};

// Additional constants
export const NUMBERS_SOMALI: Record<number, string>;
export const SOMALI_SEASONS: Record<string, { months: number[]; description: string }>;
export const SOMALI_HOLIDAYS: Record<string, string>;
