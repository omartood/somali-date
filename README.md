# somali-date

A comprehensive JavaScript library for formatting dates and times in Somali language, supporting multiple calendar systems and cultural features.

## Features

- 📅 **Multi-Calendar Support**: Gregorian, Hijri (Islamic), and traditional Somali calendars
- 🌍 **Pure Somali Localization**: Authentic Somali month, weekday, and number names
- ⏰ **24-hour Time Format**: Standard time formatting with prayer times
- 🎭 **Traditional Seasons**: Somali seasonal calendar (Jilaal, Gu, Xagaa, Dayr)
- 🔢 **Somali Numerals**: Convert numbers to Somali words
- 🎉 **Holiday Detection**: Somali national and Islamic holidays
- 💼 **Business Days**: Business day calculations respecting Somali work week
- ⏳ **Duration & Age**: Format time periods and ages in Somali
- 📱 **Comprehensive CLI**: Feature-rich command-line interface
- 🔧 **Easy API**: Simple functions for common use cases
- 📝 **TypeScript Support**: Full type definitions included
- 🎯 **Flexible Options**: Customizable formatting options

## Installation

```bash
npm install somali-date
```

## Quick Start

```javascript
const { today, now, formatDate } = require('somali-date');

// Get today's date
console.log(today());                    // "Sabti, 9 Agoosto 2025"
console.log(today('hijri'));            // "Sabti, 14 Safar 1447"
console.log(today('both'));             // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"

// Get current date and time
console.log(now());                      // "Sabti, 9 Agoosto 2025 18:30"
console.log(now('islamic'));            // "Sabti, 14 Safar 1447 18:30"

// Format specific dates
console.log(formatDate('2025-12-25', 'both'));
// "Khamiis, 25 Diseembar 2025 — (5 Rajab 1447 Hijri)"
```

## API Reference

### Easy Functions (Recommended)

#### `formatDate(date, calendar?, options?)`
Smart date formatting with calendar selection.

```javascript
const { formatDate } = require('somali-date');

formatDate(new Date(), 'gregorian');     // "Sabti, 9 Agoosto 2025"
formatDate(new Date(), 'hijri');         // "Sabti, 14 Safar 1447"
formatDate(new Date(), 'both');          // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"
```

#### `formatDateTime(date, calendar?, options?)`
Date and time formatting with calendar selection.

```javascript
const { formatDateTime } = require('somali-date');

formatDateTime(new Date(), 'gregorian');  // "Sabti, 9 Agoosto 2025 18:30"
formatDateTime(new Date(), 'hijri');      // "Sabti, 14 Safar 1447 18:30"
formatDateTime(new Date(), 'both');       // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30"
```

#### `today(calendar?)`
Get today's date in the specified calendar.

```javascript
const { today } = require('somali-date');

today();           // "Sabti, 9 Agoosto 2025"
today('hijri');    // "Sabti, 14 Safar 1447"
today('both');     // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"
```

#### `now(calendar?)`
Get current date and time in the specified calendar.

```javascript
const { now } = require('somali-date');

now();           // "Sabti, 9 Agoosto 2025 18:30"
now('islamic');  // "Sabti, 14 Safar 1447 18:30"
now('dual');     // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30"
```

### Calendar Types

- `"gregorian"` or `"western"` - Standard Gregorian calendar (default)
- `"hijri"` or `"islamic"` - Islamic Hijri calendar
- `"both"` or `"dual"` - Display both calendars together

### Advanced Functions

#### `formatDateSomali(date, options?)`
Format Gregorian dates in Somali.

```javascript
const { formatDateSomali } = require('somali-date');

formatDateSomali(new Date(), {
  weekday: 'long',    // 'none', 'short', 'long'
  month: 'long',      // 'long', 'short'
  numeric: true       // include day and year numbers
});
// "Sabti, 9 Agoosto 2025"
```

#### `formatHijriSomali(date, options?)`
Format dates in Hijri calendar with Somali names.

```javascript
const { formatHijriSomali } = require('somali-date');

formatHijriSomali(new Date(), {
  weekday: 'long',
  month: 'long'
});
// "Sabti, 14 Safar 1447"
```

#### `formatTimeSomali(date, options?)`
Format time in 24-hour format.

```javascript
const { formatTimeSomali } = require('somali-date');

formatTimeSomali(new Date());                    // "18:30"
formatTimeSomali(new Date(), { seconds: true }); // "18:30:45"
```

#### `formatRelativeSomali(date, referenceDate?)`
Format relative dates in Somali.

```javascript
const { formatRelativeSomali } = require('somali-date');

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

formatRelativeSomali(today);      // "maanta" (today)
formatRelativeSomali(yesterday);  // "shalay" (yesterday)
formatRelativeSomali(tomorrow);   // "berri" (tomorrow)
```

### New Advanced Features

#### Traditional Somali Calendar & Seasons
```javascript
const { formatSomaliTraditional, getSomaliSeason } = require('somali-date');

getSomaliSeason(new Date());                    // { season: "Xagaa", description: "Hot dry season" }
formatSomaliTraditional(new Date());           // "Xagaa (Hot dry season)"
formatSomaliTraditional(new Date(), { includeGregorian: true }); 
// "9 Agoosto 2025 - Xagaa (Hot dry season)"
```

#### Somali Number Conversion
```javascript
const { numberToSomali, formatDateSomaliWithNumbers } = require('somali-date');

numberToSomali(25);                            // "shan iyo labaatan"
numberToSomali(100);                           // "boqol"
formatDateSomaliWithNumbers(new Date(), { numerals: 'somali' });
// "Sabti, sagaal Agoosto laba kun iyo shan iyo labaatan"
```

#### Duration & Age Formatting
```javascript
const { formatDurationSomali, formatAgeSomali } = require('somali-date');

formatDurationSomali(3600000);                 // "saacad" (1 hour)
formatDurationSomali(86400000 * 30);          // "30 maalmood" (30 days)
formatAgeSomali('1990-01-01');                // "35 sannadood iyo 7 bilood"
```

#### Holiday Detection
```javascript
const { isHoliday, getHolidayName, getUpcomingHolidays } = require('somali-date');

isHoliday('2025-06-26');                      // true (Independence Day)
getHolidayName('2025-06-26');                 // "Maalinta Madaxbannida"
getUpcomingHolidays(30);                      // Array of upcoming holidays
```

#### Business Day Calculations
```javascript
const { isBusinessDay, addBusinessDays } = require('somali-date');

isBusinessDay(new Date());                     // true/false (Friday is not a business day)
addBusinessDays(new Date(), 5);               // Add 5 business days (skip Fridays)
```

#### Enhanced Relative Dates
```javascript
const { formatRelativeSomaliDetailed } = require('somali-date');

formatRelativeSomaliDetailed(new Date(), new Date(), { includeTime: true });
// "hadda" (now) or "2 saacadood ka hor" (2 hours ago)
```

#### Prayer Times
```javascript
const { getPrayerTimesSomali } = require('somali-date');

getPrayerTimesSomali(new Date());
// { Subax: "05:30", Duhur: "12:15", Casar: "15:45", Maghrib: "18:30", Cisha: "19:45" }
```

#### Date Range Formatting
```javascript
const { formatDateRange } = require('somali-date');

formatDateRange('2025-08-14', '2025-08-20');
// "14 Agoosto 2025 - 20 Agoosto 2025"
formatDateRange('2025-08-14', '2025-08-20', 'hijri');
// Hijri date range
```

#### Calendar Conversion
```javascript
const { gregorianToHijri, hijriToGregorian } = require('somali-date');

gregorianToHijri(new Date());                  // { hYear: 1447, hMonth: 2, hDay: 14 }
hijriToGregorian(1447, 2, 14);                // Date object
```

## CLI Usage

Install globally for command-line access:

```bash
npm install -g somali-date
```

### Basic Commands

```bash
# Today's date
somodate today                    # Gregorian calendar
somodate today hijri             # Hijri calendar
somodate today both              # Both calendars

# Current date and time
somodate now                     # Gregorian with time
somodate now islamic             # Hijri with time
somodate now dual                # Both calendars with time

# Specific dates
somodate date 2025-12-25         # Christmas in Gregorian
somodate date 2025-12-25 hijri   # Christmas in Hijri
somodate datetime 2025-12-25 both # Christmas with both calendars and time

# Time only
somodate time                    # Current time
somodate time 2025-12-25T15:30:00Z # Specific time

# Relative dates
somodate relative                # "maanta" (today)
somodate relative 2025-12-24     # Relative to today
```

### Advanced CLI Commands

```bash
# Traditional Somali calendar
somodate traditional             # Current season
somodate season                  # Season info only

# Somali numerals
somodate numbers 25              # "shan iyo labaatan"
somodate somali-numbers          # Today's date with Somali numerals

# Duration and age
somodate age 1990-01-01          # Calculate age
somodate duration 3600000        # Format milliseconds as duration

# Holidays and business days
somodate holiday 2025-06-26      # Check if date is holiday
somodate holidays 30             # Upcoming holidays in next 30 days
somodate business-day            # Check if today is business day
somodate add-business 2025-08-14 5 # Add 5 business days

# Prayer times
somodate prayer                  # Today's prayer times
somodate prayer 2025-12-25       # Prayer times for specific date

# Calendar conversion
somodate convert-hijri           # Convert today to Hijri

# Enhanced relative dates
somodate relative-detailed       # Detailed relative formatting
```

### CLI Examples

```bash
$ somodate today
Sabti, 9 Agoosto 2025

$ somodate traditional
9 Agoosto 2025 - Xagaa (Hot dry season)

$ somodate numbers 25
shan iyo labaatan

$ somodate age 1990-01-01
35 sannadood iyo 7 bilood

$ somodate prayer
Waqtiyada salaadda 9 Agoosto 2025:
  Subax: 05:30
  Duhur: 12:15
  Casar: 15:45
  Maghrib: 18:30
  Cisha: 19:45

$ somodate holiday 2025-06-26
26 Juun 2025 - Maalinta Madaxbannida

$ somodate somali-numbers
Sabti, sagaal Agoosto laba kun iyo shan iyo labaatan
```

## Somali Calendar Names

### Gregorian Months
- **Long**: Janaayo, Febraayo, Maarso, Abriil, Maajo, Juun, Luuliyo, Agoosto, Sebteembar, Oktoobar, Nofeembar, Diseembar
- **Short**: Jan, Feb, Mar, Abr, Majo, Juun, Llyo, Ago, Seb, Okt, Nof, Dis

### Hijri Months
- **Long**: Muxarram, Safar, Rabiicul Awwal, Rabiicul Thaani, Jumaadal Uula, Jumaadal Aakhir, Rajab, Shacbaan, Ramadaan, Shawwaal, Dhul-Qacda, Dhul-Xijja
- **Short**: Mux, Saf, Rab-I, Rab-II, Jum-I, Jum-II, Raj, Sha, Ram, Shw, DhQ, DhX

### Weekdays
- **Long**: Axad, Isniin, Talaado, Arbaco, Khamiis, Jimco, Sabti
- **Short**: Axd, Isn, Tal, Arb, Khm, Jmc, Sbt

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { formatDate, today, CalendarType } from 'somali-date';

const calendar: CalendarType = 'hijri';
const date: string = today(calendar);
```

## Requirements

- Node.js >= 14
- No external dependencies for core functionality

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v0.2.0 - Comprehensive Feature Release
- 🎭 **Traditional Somali Calendar**: Seasonal calendar with Jilaal, Gu, Xagaa, Dayr
- 🔢 **Somali Number System**: Convert numbers to Somali words (numberToSomali)
- 🎉 **Holiday Detection**: Somali national holidays and Islamic holidays
- 💼 **Business Day Calculations**: Respect Somali work week (Friday off)
- ⏳ **Duration & Age Formatting**: Format time periods and ages in Somali
- 🕐 **Prayer Times**: Islamic prayer times with Somali names
- 📅 **Date Range Formatting**: Format date ranges in multiple calendars
- 🔄 **Calendar Conversion**: Convert between Gregorian and Hijri
- 📝 **Enhanced Relative Dates**: Detailed relative time formatting
- 🔢 **Somali Numerals in Dates**: Display dates with Somali number words
- 📱 **Expanded CLI**: 15+ new commands for all features
- 📝 **Complete TypeScript**: Full type definitions for all new features
- ✅ **Comprehensive Tests**: 23 test cases covering all functionality

### v0.1.0
- Initial release
- Gregorian calendar support with Somali localization
- Hijri calendar support
- CLI tool
- Easy-to-use API functions
- TypeScript support