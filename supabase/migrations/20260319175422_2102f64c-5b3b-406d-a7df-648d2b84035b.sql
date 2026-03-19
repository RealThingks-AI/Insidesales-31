UPDATE security_audit_log SET resource_type = 'tasks' WHERE resource_type IN ('Action items', 'Action Items', 'action_items');

UPDATE security_audit_log SET details = jsonb_set(details, '{module}', '"tasks"') WHERE resource_type = 'tasks' AND details->>'module' IS NOT NULL;