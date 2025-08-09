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

## Documentation

- **[📚 Complete API Reference](docs/API.md)** - Detailed documentation of all functions
- **[💻 CLI Reference](docs/CLI.md)** - Command-line interface guide
- **[📖 Examples](docs/EXAMPLES.md)** - Practical usage examples and integrations

## Easy Functions (Recommended)

### `formatDate(date, calendar?, options?)`
Smart date formatting with calendar selection.

```javascript
formatDate(new Date(), 'gregorian');     // "Sabti, 9 Agoosto 2025"
formatDate(new Date(), 'hijri');         // "Sabti, 14 Safar 1447"
formatDate(new Date(), 'both');          // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri)"
```

### `today(calendar?)` & `now(calendar?)`
Quick access to current date and time.

```javascript
today();           // "Sabti, 9 Agoosto 2025"
today('hijri');    // "Sabti, 14 Safar 1447"
now('both');       // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30"
```

### Calendar Types
- `"gregorian"` or `"western"` - Standard Gregorian calendar (default)
- `"hijri"` or `"islamic"` - Islamic Hijri calendar
- `"both"` or `"dual"` - Display both calendars together

## Advanced Features

### Traditional Somali Calendar
```javascript
const { formatSomaliTraditional, getSomaliSeason } = require('somali-date');

getSomaliSeason(new Date());                    // { season: "Xagaa", description: "Hot dry season" }
formatSomaliTraditional(new Date());           // "Xagaa (Hot dry season)"
```

### Somali Number System
```javascript
const { numberToSomali } = require('somali-date');

numberToSomali(25);                            // "shan iyo labaatan"
numberToSomali(100);                           // "boqol"
```

### Duration & Age
```javascript
const { formatDurationSomali, formatAgeSomali } = require('somali-date');

formatDurationSomali(3600000);                 // "saacad" (1 hour)
formatAgeSomali('1990-01-01');                // "35 sannadood iyo 7 bilood"
```

### Holiday Detection
```javascript
const { isHoliday, getHolidayName } = require('somali-date');

isHoliday('2025-06-26');                      // true (Independence Day)
getHolidayName('2025-06-26');                 // "Maalinta Madaxbannida"
```

### Prayer Times
```javascript
const { getPrayerTimesSomali } = require('somali-date');

getPrayerTimesSomali(new Date());
// { Subax: "05:30", Duhur: "12:15", Casar: "15:45", Maghrib: "18:30", Cisha: "19:45" }
```

## CLI Usage

Install globally for command-line access:

```bash
npm install -g somali-date
```

### Quick CLI Examples

```bash
# Basic usage
somodate today                   # "Sabti, 9 Agoosto 2025"
somodate today hijri            # "Sabti, 14 Safar 1447"
somodate now both               # "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30"

# Advanced features
somodate traditional            # "9 Agoosto 2025 - Xagaa (Hot dry season)"
somodate numbers 25             # "shan iyo labaatan"
somodate age 1990-01-01         # "35 sannadood iyo 7 bilood"
somodate prayer                 # Prayer times for today
somodate holiday 2025-06-26     # "26 Juun 2025 - Maalinta Madaxbannida"
```

See **[CLI Reference](docs/CLI.md)** for complete command documentation.

## Somali Calendar Names

### Gregorian Months
**Long**: Janaayo, Febraayo, Maarso, Abriil, Maajo, Juun, Luuliyo, Agoosto, Sebteembar, Oktoobar, Nofeembar, Diseembar

### Hijri Months
**Long**: Muxarram, Safar, Rabiicul Awwal, Rabiicul Thaani, Jumaadal Uula, Jumaadal Aakhir, Rajab, Shacbaan, Ramadaan, Shawwaal, Dhul-Qacda, Dhul-Xijja

### Weekdays
**Long**: Axad, Isniin, Talaado, Arbaco, Khamiis, Jimco, Sabti

### Traditional Seasons
- **Jilaal** (Dec-Mar) - Dry season
- **Gu** (Apr-Jun) - Main rainy season  
- **Xagaa** (Jul-Sep) - Hot dry season
- **Dayr** (Oct-Nov) - Short rainy season

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Links

- **[GitHub Repository](https://github.com/omartood/somali-date)**
- **[npm Package](https://www.npmjs.com/package/somali-date)**
- **[Issues & Bug Reports](https://github.com/omartood/somali-date/issues)**

## Changelog

### v0.2.1 - Documentation & Metadata Update
- 📚 **Separated Documentation**: Created dedicated API, CLI, and Examples documentation
- 🔗 **GitHub Integration**: Added repository links and issue tracking
- 📝 **Enhanced npm Page**: Better package discoverability and metadata

### v0.2.0 - Comprehensive Feature Release
- 🎭 **Traditional Somali Calendar**: Seasonal calendar with Jilaal, Gu, Xagaa, Dayr
- 🔢 **Somali Number System**: Convert numbers to Somali words
- 🎉 **Holiday Detection**: Somali national holidays and Islamic holidays
- 💼 **Business Day Calculations**: Respect Somali work week (Friday off)
- ⏳ **Duration & Age Formatting**: Format time periods and ages in Somali
- 🕐 **Prayer Times**: Islamic prayer times with Somali names
- 📅 **Date Range Formatting**: Format date ranges in multiple calendars
- 🔄 **Calendar Conversion**: Convert between Gregorian and Hijri
- 📝 **Enhanced Relative Dates**: Detailed relative time formatting
- 🔢 **Somali Numerals in Dates**: Display dates with Somali number words
- 📱 **Expanded CLI**: 15+ new commands for all features
- ✅ **Comprehensive Tests**: 23 test cases covering all functionality

### v0.1.0 - Initial Release
- Basic Gregorian calendar support with Somali localization
- Hijri calendar support
- CLI tool
- Easy-to-use API functions
- TypeScript support