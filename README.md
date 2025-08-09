# somali-date

A comprehensive JavaScript library for formatting dates and times in Somali language, supporting both Gregorian and Hijri (Islamic) calendars.

## Features

- 📅 **Dual Calendar Support**: Gregorian and Hijri calendars
- 🌍 **Pure Somali Localization**: Authentic Somali month and weekday names
- ⏰ **24-hour Time Format**: Standard time formatting
- 📱 **CLI Tool**: Command-line interface for quick date formatting
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

## CLI Usage

Install globally for command-line access:

```bash
npm install -g somali-date
```

### Commands

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

# Legacy commands (still supported)
somodate hijri                   # Today in Hijri
somodate both                    # Today in both calendars
```

### Examples

```bash
$ somodate today
Sabti, 9 Agoosto 2025

$ somodate today hijri
Sabti, 14 Safar 1447

$ somodate now both
Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30

$ somodate date 2025-12-25 islamic
Khamiis, 5 Rajab 1447
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

### v0.1.0
- Initial release
- Gregorian calendar support with Somali localization
- Hijri calendar support
- CLI tool
- Easy-to-use API functions
- TypeScript support