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
