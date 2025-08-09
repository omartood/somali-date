# CLI Reference

The `somodate` command-line tool provides access to all somali-date features from the terminal.

## Installation

```bash
npm install -g somali-date
```

## Basic Commands

### Date and Time

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

## Advanced Features

### Traditional Somali Calendar

```bash
# Traditional seasons
somodate traditional             # Current season with Gregorian date
somodate season                  # Season info only

# Examples
$ somodate traditional
9 Agoosto 2025 - Xagaa (Hot dry season)

$ somodate season
Xagaa - Hot dry season
```

### Somali Numbers

```bash
# Convert numbers to Somali words
somodate numbers 25              # "shan iyo labaatan"
somodate numbers 100             # "boqol"
somodate numbers 1000            # "kun"

# Dates with Somali numerals
somodate somali-numbers          # Today's date with Somali numerals
somodate somali-numbers 2025-12-25 # Specific date with Somali numerals

# Examples
$ somodate numbers 25
shan iyo labaatan

$ somodate somali-numbers
Sabti, sagaal Agoosto laba kun iyo shan iyo labaatan
```

### Duration and Age

```bash
# Calculate age
somodate age 1990-01-01          # Age from birth date to today
somodate age 1990-01-01 2025-01-01 # Age at specific reference date

# Format duration
somodate duration 3600000        # Format milliseconds as duration
somodate duration 86400000       # One day in milliseconds

# Examples
$ somodate age 1990-01-01
35 sannadood iyo 7 bilood

$ somodate duration 3600000
saacad
```

### Holidays and Business Days

```bash
# Check holidays
somodate holiday                 # Check if today is a holiday
somodate holiday 2025-06-26      # Check specific date

# Upcoming holidays
somodate holidays                # Next 30 days (default)
somodate holidays 7              # Next 7 days
somodate holidays 90             # Next 90 days

# Business days
somodate business-day            # Check if today is a business day
somodate business-day 2025-08-15 # Check specific date (Friday)

# Add business days
somodate add-business 2025-08-14 5 # Add 5 business days to date

# Examples
$ somodate holiday 2025-06-26
26 Juun 2025 - Maalinta Madaxbannida

$ somodate holidays 7
Cidaha soo socda 7 maalmood:
  26 Juun 2025 (berri) - Maalinta Madaxbannida

$ somodate business-day
Haa, maalin shaqo ah

$ somodate add-business 2025-08-14 5
Khamiis, 21 Agoosto 2025
```

### Prayer Times

```bash
# Prayer times for today
somodate prayer

# Prayer times for specific date
somodate prayer 2025-12-25

# Example
$ somodate prayer
Waqtiyada salaadda 9 Agoosto 2025:
  Subax: 05:30
  Duhur: 12:15
  Casar: 15:45
  Maghrib: 18:30
  Cisha: 19:45
```

### Calendar Conversion

```bash
# Convert to Hijri
somodate convert-hijri           # Today's date
somodate convert-hijri 2025-12-25 # Specific date

# Example
$ somodate convert-hijri 2025-12-25
25 Diseembar 2025 = 25 6 1447 Hijri
```

### Enhanced Relative Dates

```bash
# Detailed relative formatting
somodate relative-detailed       # Today with time context
somodate relative-detailed 2025-08-08 # Yesterday with details

# Examples
$ somodate relative-detailed
maanta

$ somodate relative-detailed 2025-08-08
shalay
```

## Legacy Commands

These commands are maintained for backward compatibility:

```bash
somodate hijri                   # Today in Hijri (same as: today hijri)
somodate both                    # Today in both calendars (same as: today both)
```

## Calendar Options

When using commands that support calendar selection:

- `gregorian` or `western` - Standard Gregorian calendar (default)
- `hijri` or `islamic` - Islamic Hijri calendar
- `both` or `dual` - Display both calendars together

## Date Input Formats

The CLI accepts various date input formats:

```bash
# ISO format (recommended)
somodate date 2025-12-25T15:30:00Z

# Date only
somodate date 2025-12-25

# Relative to current time
somodate relative 2025-08-08
```

## Help

```bash
# Show help
somodate help
somodate --help
somodate
```

## Examples

### Daily Usage
```bash
# Quick date check
somodate today                   # "Sabti, 9 Agoosto 2025"

# Check what season we're in
somodate season                  # "Xagaa - Hot dry season"

# Prayer times
somodate prayer                  # Full prayer schedule
```

### Planning and Scheduling
```bash
# Check upcoming holidays
somodate holidays 30             # Next month's holidays

# Plan business meetings
somodate add-business 2025-08-14 5 # 5 business days from date

# Check if a date is a work day
somodate business-day 2025-08-15  # Friday check
```

### Cultural and Educational
```bash
# Learn Somali numbers
somodate numbers 25              # "shan iyo labaatan"

# Traditional calendar
somodate traditional             # Current season

# Age calculation
somodate age 1990-01-01          # "35 sannadood iyo 7 bilood"
```

### Religious Observance
```bash
# Prayer times
somodate prayer                  # Today's prayer schedule

# Islamic calendar
somodate today hijri             # Today in Hijri

# Both calendars
somodate today both              # Gregorian and Hijri together
```