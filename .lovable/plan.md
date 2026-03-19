

## Merge Date Filter Presets into AuditLogStats Bar

### What changes

The date preset buttons ("Today", "Last 7 days", "Last 30 days", "This month") currently live in `AuditLogFilters`. They will be moved into the `AuditLogStats` bar so all quick-filter badges and date presets are in one row. The "Today" and "This Week" badges already exist in Stats — the presets will be added after the module badges, replacing the duplicated functionality.

### Changes

#### 1. `AuditLogStats.tsx` — Add date preset buttons
- Add new props: `onDatePreset: (from: Date, to: Date) => void` and `activeDatePreset?: string`
- Import `getDatePresets` from `auditLogUtils`
- After the module badges, render "Last 7 days", "Last 30 days", "This month" as additional clickable badges (Today/This Week already exist as stat badges)
- Highlight the active preset with the ring style

#### 2. `AuditLogFilters.tsx` — Remove date preset buttons
- Remove the preset buttons section (lines 110-121: the separator and preset map)
- Keep the calendar date pickers and clear button (custom date range selection)

#### 3. `AuditLogsSettings.tsx` — Wire up new props
- Pass `onDatePreset` and `activeDatePreset` to `AuditLogStats`
- Add handler that sets dateFrom/dateTo and clears moduleFilter
- Extend `activeStatsFilter` logic to detect active date presets

### Technical Details

| File | Change |
|------|--------|
| `AuditLogStats.tsx` | Add date preset badges after module badges, new props for preset callback |
| `AuditLogFilters.tsx` | Remove lines 110-121 (preset buttons and separator) |
| `AuditLogsSettings.tsx` | Add `handleDatePreset` callback, pass to Stats, update `activeStatsFilter` |

