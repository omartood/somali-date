# Examples

This document provides practical examples of using somali-date in various scenarios.

## Basic Usage

### Simple Date Formatting

```javascript
const { today, now, formatDate } = require('somali-date');

// Quick date checks
console.log(today());                    // "Sabti, 9 Agoosto 2025"
console.log(today('hijri'));            // "Sabti, 14 Safar 1447"
console.log(now('both'));               // "Sabti, 9 Agoosto 2025 — (14 Safar 1447 Hijri) 18:30"

// Format specific dates
const christmas = new Date('2025-12-25');
console.log(formatDate(christmas, 'gregorian')); // "Khamiis, 25 Diseembar 2025"
console.log(formatDate(christmas, 'hijri'));     // "Khamiis, 5 Rajab 1447"
console.log(formatDate(christmas, 'both'));      // "Khamiis, 25 Diseembar 2025 — (5 Rajab 1447 Hijri)"
```

### Working with Different Calendar Systems

```javascript
const { formatDate, formatDateTime, formatHijriSomali } = require('somali-date');

const date = new Date('2025-08-14T15:30:00Z');

// Gregorian calendar
console.log(formatDate(date, 'gregorian'));
// "Khamiis, 14 Agoosto 2025"

// Islamic calendar
console.log(formatDate(date, 'hijri'));
// "Khamiis, 19 Safar 1447"

// Both calendars
console.log(formatDate(date, 'both'));
// "Khamiis, 14 Agoosto 2025 — (19 Safar 1447 Hijri)"

// With time
console.log(formatDateTime(date, 'both'));
// "Khamiis, 14 Agoosto 2025 — (19 Safar 1447 Hijri) 18:30"
```

## Traditional Somali Features

### Seasonal Calendar

```javascript
const { formatSomaliTraditional, getSomaliSeason } = require('somali-date');

// Get current season
const season = getSomaliSeason(new Date());
console.log(`Current season: ${season.season} - ${season.description}`);
// "Current season: Xagaa - Hot dry season"

// Format with traditional calendar
console.log(formatSomaliTraditional(new Date()));
// "Xagaa (Hot dry season)"

console.log(formatSomaliTraditional(new Date(), { includeGregorian: true }));
// "9 Agoosto 2025 - Xagaa (Hot dry season)"

// Check different seasons
const seasons = [
  new Date('2025-01-15'), // Jilaal
  new Date('2025-05-15'), // Gu
  new Date('2025-08-15'), // Xagaa
  new Date('2025-10-15')  // Dayr
];

seasons.forEach(date => {
  const season = getSomaliSeason(date);
  console.log(`${formatDate(date)} - ${season.season}`);
});
```

### Somali Number System

```javascript
const { numberToSomali, formatDateSomaliWithNumbers } = require('somali-date');

// Convert numbers to Somali
const numbers = [1, 5, 10, 25, 100, 1000, 2025];
numbers.forEach(num => {
  console.log(`${num} = ${numberToSomali(num)}`);
});
// 1 = kow
// 5 = shan
// 10 = toban
// 25 = shan iyo labaatan
// 100 = boqol
// 1000 = kun
// 2025 = laba kun iyo shan iyo labaatan

// Dates with Somali numerals
const date = new Date('2025-08-14');
console.log(formatDateSomaliWithNumbers(date, { numerals: 'somali' }));
// "Khamiis, afar iyo toban Agoosto laba kun iyo shan iyo labaatan"
```

## Time and Duration

### Age Calculations

```javascript
const { formatAgeSomali } = require('somali-date');

// Calculate ages
const birthDates = [
  '1990-01-01',
  '2000-06-15',
  '2020-12-25'
];

birthDates.forEach(birthDate => {
  const age = formatAgeSomali(birthDate);
  console.log(`Born ${birthDate}: ${age}`);
});
// Born 1990-01-01: 35 sannadood iyo 7 bilood
// Born 2000-06-15: 25 sannadood iyo bil
// Born 2020-12-25: 4 sannadood iyo 7 bilood
```

### Duration Formatting

```javascript
const { formatDurationSomali } = require('somali-date');

// Various durations
const durations = [
  1000,           // 1 second
  60000,          // 1 minute
  3600000,        // 1 hour
  86400000,       // 1 day
  604800000,      // 1 week
  2592000000,     // 1 month (30 days)
  31536000000     // 1 year (365 days)
];

durations.forEach(ms => {
  console.log(`${ms}ms = ${formatDurationSomali(ms)}`);
});
// 1000ms = ilbiriqsi
// 60000ms = daqiiqo
// 3600000ms = saacad
// 86400000ms = maalin
// 604800000ms = 7 maalmood
// 2592000000ms = 30 maalmood
// 31536000000ms = sannad
```

### Relative Time

```javascript
const { formatRelativeSomali, formatRelativeSomaliDetailed } = require('somali-date');

const now = new Date();
const dates = [
  new Date(now.getTime() - 86400000),     // Yesterday
  new Date(now.getTime()),                // Today
  new Date(now.getTime() + 86400000),     // Tomorrow
  new Date(now.getTime() - 172800000),    // 2 days ago
  new Date(now.getTime() + 172800000)     // 2 days from now
];

dates.forEach(date => {
  console.log(`${date.toDateString()}: ${formatRelativeSomali(date)}`);
});

// Detailed relative formatting
console.log(formatRelativeSomaliDetailed(dates[0], now, { includeTime: true }));
// "shalay 18:30" or similar
```

## Business Applications

### Holiday Management

```javascript
const { isHoliday, getHolidayName, getUpcomingHolidays } = require('somali-date');

// Check specific dates
const importantDates = [
  '2025-01-01',  // New Year
  '2025-06-26',  // Independence Day
  '2025-07-01',  // Unity Day
  '2025-08-15'   // Regular day
];

importantDates.forEach(dateStr => {
  const date = new Date(dateStr);
  const holiday = getHolidayName(date);
  console.log(`${dateStr}: ${holiday || 'Regular day'}`);
});

// Get upcoming holidays
const upcoming = getUpcomingHolidays(90); // Next 3 months
console.log('Upcoming holidays:');
upcoming.forEach(holiday => {
  console.log(`${holiday.formatted} (${holiday.daysFromNow} days): ${holiday.name}`);
});
```

### Business Day Calculations

```javascript
const { isBusinessDay, addBusinessDays } = require('somali-date');

// Check business days
const dates = [
  '2025-08-14', // Thursday
  '2025-08-15', // Friday
  '2025-08-16'  // Saturday
];

dates.forEach(dateStr => {
  const date = new Date(dateStr);
  const dayName = date.toLocaleDateString('en', { weekday: 'long' });
  const isBusiness = isBusinessDay(date);
  console.log(`${dayName} (${dateStr}): ${isBusiness ? 'Business day' : 'Not a business day'}`);
});

// Add business days
const startDate = new Date('2025-08-14');
const businessDaysToAdd = [1, 3, 5, 10];

businessDaysToAdd.forEach(days => {
  const result = addBusinessDays(startDate, days);
  console.log(`${days} business days from ${startDate.toDateString()}: ${result.toDateString()}`);
});
```

## Religious Applications

### Prayer Times

```javascript
const { getPrayerTimesSomali } = require('somali-date');

// Get prayer times for different locations
const locations = [
  { name: 'Mogadishu', lat: 2.0469, lng: 45.3182 },
  { name: 'Hargeisa', lat: 9.5600, lng: 44.0650 },
  { name: 'Kismayo', lat: -0.3582, lng: 42.5454 }
];

locations.forEach(location => {
  const prayers = getPrayerTimesSomali(new Date(), location.lat, location.lng);
  console.log(`Prayer times for ${location.name}:`);
  Object.entries(prayers).forEach(([name, time]) => {
    console.log(`  ${name}: ${time}`);
  });
  console.log();
});
```

### Islamic Calendar Integration

```javascript
const { formatHijriSomali, gregorianToHijri, formatDate } = require('somali-date');

// Important Islamic dates
const islamicEvents = [
  { name: 'Ramadan Start (approx)', date: '2025-02-28' },
  { name: 'Eid al-Fitr (approx)', date: '2025-03-30' },
  { name: 'Hajj Season (approx)', date: '2025-06-06' },
  { name: 'Eid al-Adha (approx)', date: '2025-06-16' }
];

islamicEvents.forEach(event => {
  const date = new Date(event.date);
  const hijri = gregorianToHijri(date);
  console.log(`${event.name}:`);
  console.log(`  Gregorian: ${formatDate(date, 'gregorian')}`);
  console.log(`  Hijri: ${formatHijriSomali(date)}`);
  console.log(`  Both: ${formatDate(date, 'both')}`);
  console.log();
});
```

## Web Application Integration

### React Component Example

```javascript
// SomaliDateDisplay.jsx
import React from 'react';
import { today, now, formatDate } from 'somali-date';

function SomaliDateDisplay({ calendar = 'gregorian', showTime = false }) {
  const displayDate = showTime ? now(calendar) : today(calendar);
  
  return (
    <div className="somali-date-display">
      <h2>Today's Date</h2>
      <p>{displayDate}</p>
    </div>
  );
}

// Usage
<SomaliDateDisplay calendar="both" showTime={true} />
```

### Express.js API Example

```javascript
// server.js
const express = require('express');
const { 
  today, 
  getPrayerTimesSomali, 
  getUpcomingHolidays,
  formatAgeSomali 
} = require('somali-date');

const app = express();

// Today's date endpoint
app.get('/api/today/:calendar?', (req, res) => {
  const calendar = req.params.calendar || 'gregorian';
  res.json({ date: today(calendar) });
});

// Prayer times endpoint
app.get('/api/prayer-times', (req, res) => {
  const { lat, lng } = req.query;
  const prayers = getPrayerTimesSomali(
    new Date(), 
    parseFloat(lat) || 2.0469, 
    parseFloat(lng) || 45.3182
  );
  res.json(prayers);
});

// Upcoming holidays endpoint
app.get('/api/holidays/:days?', (req, res) => {
  const days = parseInt(req.params.days) || 30;
  const holidays = getUpcomingHolidays(days);
  res.json(holidays);
});

// Age calculation endpoint
app.get('/api/age/:birthDate', (req, res) => {
  const age = formatAgeSomali(req.params.birthDate);
  res.json({ age });
});

app.listen(3000, () => {
  console.log('Somali date API running on port 3000');
});
```

## CLI Integration Examples

### Shell Scripts

```bash
#!/bin/bash
# daily-info.sh - Daily information script

echo "=== Daily Information ==="
echo "Today: $(somodate today both)"
echo "Season: $(somodate season)"
echo ""

echo "=== Prayer Times ==="
somodate prayer
echo ""

echo "=== Upcoming Holidays (Next 7 days) ==="
somodate holidays 7
echo ""

echo "=== Business Day Check ==="
if somodate business-day > /dev/null 2>&1; then
    echo "Today is a business day"
else
    echo "Today is not a business day"
fi
```

### Cron Job Examples

```bash
# Add to crontab for daily notifications
# 0 6 * * * /usr/local/bin/somodate today both | mail -s "Today's Date" user@example.com
# 0 5 * * * /usr/local/bin/somodate prayer | mail -s "Prayer Times" user@example.com
```

## Error Handling

```javascript
const { formatDate, numberToSomali } = require('somali-date');

// Handle invalid dates
try {
  const result = formatDate('invalid-date');
  console.log(result);
} catch (error) {
  console.error('Invalid date:', error.message);
}

// Handle edge cases
const edgeCases = [
  null,
  undefined,
  '',
  'not-a-date',
  new Date('invalid')
];

edgeCases.forEach(testCase => {
  try {
    const result = formatDate(testCase);
    console.log(`${testCase}: ${result}`);
  } catch (error) {
    console.log(`${testCase}: Error - ${error.message}`);
  }
});
```

## Performance Considerations

```javascript
const { formatDate, today } = require('somali-date');

// Cache frequently used values
const todayGregorian = today('gregorian');
const todayHijri = today('hijri');
const todayBoth = today('both');

// Reuse for multiple operations
console.log('Gregorian:', todayGregorian);
console.log('Hijri:', todayHijri);
console.log('Both:', todayBoth);

// Batch operations for better performance
const dates = [
  new Date('2025-01-01'),
  new Date('2025-06-26'),
  new Date('2025-12-25')
];

const formattedDates = dates.map(date => ({
  original: date,
  gregorian: formatDate(date, 'gregorian'),
  hijri: formatDate(date, 'hijri'),
  both: formatDate(date, 'both')
}));

console.table(formattedDates);
```