# API Reference

## Core Functions

### `formatDateSomali(date, options?)`
Format Gregorian dates in Somali.

**Parameters:**
- `date` - Date object, string, or number
- `options` - Formatting options
  - `weekday` - `'none'` | `'short'` | `'long'` (default: `'none'`)
  - `month` - `'long'` | `'short'` (default: `'long'`)
  - `numeric` - `boolean` - Include day and year numbers (default: `true`)

**Example:**
```javascript
formatDateSomali(new Date(), { weekday: 'long', month: 'long' });
// "Sabti, 9 Agoosto 2025"
```

### `formatTimeSomali(date, options?)`
Format time in 24-hour format.

**Parameters:**
- `date` - Date object, string, or number
- `options` - Formatting options
  - `seconds` - `boolean` - Include seconds (default: `false`)

**Example:**
```javascript
formatTimeSomali(new Date());                    // "18:30"
formatTimeSomali(new Date(), { seconds: true }); // "18:30:45"
```

### `formatDateTimeSomali(date, options?)`
Format date and time together.

**Example:**
```javascript
formatDateTimeSomali(new Date(), { weekday: 'long', month: 'long' });
// "Sabti, 9 Agoosto 2025 18:30"
```

### `formatRelativeSomali(from, to?)`
Format relative dates in Somali.

**Example:**
```javascript
formatRelativeSomali(new Date());      // "maanta" (today)
formatRelativeSomali(yesterday);       // "shalay" (yesterday)
formatRelativeSomali(tomorrow);        // "berri" (tomorrow)
```

## Hijri Calendar Functions

### `formatHijriSomali(date, options?)`
Format dates in Hijri calendar with Somali names.

**Example:**
```javascript
formatHijriSomali(new Date(), { weekday: 'long', month: 'long' });
// "Sabti, 14 Safar 1447"
```

### `formatDateSomaliWithHijri(date, options?)`
Display both Gregorian and Hijri dates.

**Example:**
```javascript
formatDateSomaliWithHijri(new Date(), { weekday: 'long', month: 'long' });
// "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"
```

## Easy Functions (Recommended)

### `formatDate(date, calendar?, options?)`
Smart date formatting with calendar selection.

**Calendar Types:**
- `"gregorian"` or `"western"` - Standard Gregorian calendar (default)
- `"hijri"` or `"islamic"` - Islamic Hijri calendar
- `"both"` or `"dual"` - Display both calendars together

**Example:**
```javascript
formatDate(new Date(), 'gregorian');     // "Sabti, 9 Agoosto 2025"
formatDate(new Date(), 'hijri');         // "Sabti, 14 Safar 1447"
formatDate(new Date(), 'both');          // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"
```

### `formatDateTime(date, calendar?, options?)`
Date and time formatting with calendar selection.

### `today(calendar?)`
Get today's date in the specified calendar.

### `now(calendar?)`
Get current date and time in the specified calendar.

## Advanced Features

### `numberToSomali(num)`
Convert numbers to Somali words.

**Example:**
```javascript
numberToSomali(25);    // "shan iyo labaatan"
numberToSomali(100);   // "boqol"
numberToSomali(1000);  // "kun"
```

### `formatSomaliTraditional(date, options?)`
Format dates using traditional Somali seasons.

**Options:**
- `includeGregorian` - `boolean` - Include Gregorian date (default: `false`)

**Example:**
```javascript
formatSomaliTraditional(new Date());
// "Xagaa (Hot dry season)"

formatSomaliTraditional(new Date(), { includeGregorian: true });
// "9 Agoosto 2025 - Xagaa (Hot dry season)"
```

### `getSomaliSeason(date)`
Get the traditional Somali season for a date.

**Returns:**
```javascript
{
  season: string,      // "Jilaal" | "Gu" | "Xagaa" | "Dayr"
  description: string  // English description
}
```

### `formatRelativeSomaliDetailed(from, to?, options?)`
Enhanced relative date formatting.

**Options:**
- `includeTime` - `boolean` - Include time information (default: `false`)

**Example:**
```javascript
formatRelativeSomaliDetailed(new Date(), new Date(), { includeTime: true });
// "hadda" (now) or "2 saacadood ka hor" (2 hours ago)
```

### `formatDurationSomali(milliseconds)`
Format time durations in Somali.

**Example:**
```javascript
formatDurationSomali(3600000);           // "saacad" (1 hour)
formatDurationSomali(86400000 * 30);     // "30 maalmood" (30 days)
```

### `formatAgeSomali(birthDate, referenceDate?)`
Calculate and format age in Somali.

**Example:**
```javascript
formatAgeSomali('1990-01-01');  // "35 sannadood iyo 7 bilood"
```

### `formatDateRange(startDate, endDate, calendar?, options?)`
Format date ranges.

**Example:**
```javascript
formatDateRange('2025-08-14', '2025-08-20');
// "14 Agoosto 2025 - 20 Agoosto 2025"
```

### `formatDateSomaliWithNumbers(date, options?)`
Format dates with Somali number words.

**Options:**
- `numerals` - `"arabic"` | `"somali"` (default: `"arabic"`)

**Example:**
```javascript
formatDateSomaliWithNumbers(new Date(), { numerals: 'somali' });
// "Sabti, sagaal Agoosto laba kun iyo shan iyo labaatan"
```

## Holiday Functions

### `isHoliday(date)`
Check if a date is a Somali or Islamic holiday.

### `getHolidayName(date)`
Get the name of a holiday for a specific date.

### `getUpcomingHolidays(days?)`
Get upcoming holidays within the specified number of days.

**Returns:**
```javascript
[{
  date: Date,
  name: string,
  daysFromNow: number,
  formatted: string
}]
```

## Business Day Functions

### `isBusinessDay(date)`
Check if a date is a business day (excludes Fridays in Somalia).

### `addBusinessDays(date, days)`
Add business days to a date, skipping Fridays.

## Calendar Conversion

### `gregorianToHijri(date)`
Convert Gregorian date to Hijri.

**Returns:**
```javascript
{
  hYear: number,
  hMonth: number,
  hDay: number
}
```

### `hijriToGregorian(hYear, hMonth, hDay)`
Convert Hijri date to Gregorian (approximate).

## Prayer Times

### `getPrayerTimesSomali(date, latitude?, longitude?)`
Get Islamic prayer times for a date and location.

**Parameters:**
- `date` - Date object, string, or number
- `latitude` - Latitude (default: 2.0469 - Mogadishu)
- `longitude` - Longitude (default: 45.3182 - Mogadishu)

**Returns:**
```javascript
{
  Subax: string,    // Fajr
  Duhur: string,    // Dhuhr
  Casar: string,    // Asr
  Maghrib: string,  // Maghrib
  Cisha: string     // Isha
}
```

## Constants

### Calendar Names
- `MONTHS_LONG` - Gregorian months in Somali (long form)
- `MONTHS_SHORT` - Gregorian months in Somali (short form)
- `WEEKDAYS_LONG` - Weekdays in Somali (long form)
- `WEEKDAYS_SHORT` - Weekdays in Somali (short form)
- `HIJRI_MONTHS_LONG` - Hijri months in Somali (long form)
- `HIJRI_MONTHS_SHORT` - Hijri months in Somali (short form)

### Other Constants
- `NUMBERS_SOMALI` - Number-to-word mappings
- `SOMALI_SEASONS` - Traditional season definitions
- `SOMALI_HOLIDAYS` - Holiday definitions