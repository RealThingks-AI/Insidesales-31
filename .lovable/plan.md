

## Fix: Duplicate "Action Items" Filter in Audit Logs

### Root Cause

The `security_audit_log` table contains three different `resource_type` values for the same module:
- `"Action items"` (43 records)
- `"Action Items"` (4 records)  
- `"action_items"` (possible additional records)

The `getModuleName()` utility and `getStatsFromLogs()` treat these as separate modules because they do case-sensitive grouping, resulting in duplicate badge filters.

Additionally, since the app migrated from "Action Items" to "Tasks", these should all display as "Tasks".

---

### Changes

#### 1. Database migration — Normalize resource_type values
Create a SQL migration to update all legacy action items entries:
```sql
UPDATE security_audit_log 
SET resource_type = 'tasks' 
WHERE resource_type IN ('Action items', 'Action Items', 'action_items');

UPDATE security_audit_log
SET details = jsonb_set(details, '{module}', '"Tasks"')
WHERE resource_type = 'tasks' AND details->>'module' IS NOT NULL;
```

#### 2. Update `auditLogUtils.ts` — Normalize module names
- In `getModuleName()`: Add a normalization step that maps all variants of "action items" (case-insensitive) to "Tasks"
- In `getReadableResourceType()`: Add mapping entries for `action_items` → `Tasks` and normalize casing

#### 3. Update `AuditLogsSettings.tsx` — Update filter mappings
- Line 22: Change `ValidTableName` to include `'tasks'` instead of `'action_items'`
- Line 162: Change `'Action Items': 'action_items'` to `'Tasks': 'tasks'`  
- Line 219: Update revert check to use `'tasks'` instead of `'action_items'`
- Line 222: Update `isValidTableName` to use `'tasks'`

#### 4. Update `AuditLogFilters.tsx` — Rename filter option
- Change the "Action Items" dropdown option label to "Tasks" and value to `'tasks'`
- Update the `ModuleFilter` type to include `'tasks'` instead of `'action_items'`

#### 5. Update `getStatsFromLogs` — Case-insensitive grouping
- Normalize module keys to prevent future duplicates from casing inconsistencies

---

### Technical Details

| File | Change |
|------|--------|
| SQL migration | Normalize `resource_type` from action items variants → `tasks` |
| `src/components/settings/audit/auditLogUtils.ts` | Normalize module name output, update mappings |
| `src/components/settings/AuditLogsSettings.tsx` | Update type, filter map, revert logic |
| `src/components/settings/audit/AuditLogFilters.tsx` | Update ModuleFilter type and dropdown |

