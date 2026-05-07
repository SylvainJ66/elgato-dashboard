# A running Claude Code agent should be displayed as a button with its name and a running status

## Specification
When a Claude Code agent is running in a terminal, the Stream Deck should display a button with its name and a green "running" icon (Must have)

## Test
- File: `tests/domain/query-handlers/get-dashboard-layout-handler.test.ts`
- Describe: `GetDashboardLayoutHandler`

## Implementation
- TPP step: constant (empty array) → variable (query result passed through)
- Refactoring: None
- Files touched:
  - `src/domain/read-models/agent-button-read-model.ts` (created)
  - `src/domain/ports/get-running-agents-query.ts` (created)
  - `src/domain/query-handlers/get-dashboard-layout-handler.ts` (created)
  - `tests/domain/stubs/in-memory-get-running-agents-query.ts` (created)

## Architectural Decisions
None — minimal pass-through implementation.
