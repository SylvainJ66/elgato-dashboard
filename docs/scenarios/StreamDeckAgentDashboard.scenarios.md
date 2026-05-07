# Stream Deck Agent Dashboard

## Specification
> Create a dashboard in the Elgato Stream Deck via a plugin. This should make the buttons of the Stream Deck show the agents Claude Code. 1 button = 1 agent. Click on it show on the screen the agent.

## Shared Understanding
A developer using Claude Code wants to monitor their running agents directly from their Elgato Stream Deck (15-key model). Each button represents one Claude Code agent, displaying its name and a color-coded status icon. Pressing a button brings the corresponding terminal window to the foreground. The plugin discovers agents running in CLI terminal sessions. When there are more agents than available buttons, pagination buttons allow navigating between pages. Completed agents remain visible with a "done" indicator and can still be clicked to review their final output.

## Context
- **Actor**: A developer running multiple Claude Code agents in terminal sessions
- **Intent**: Quickly monitor agent status and switch focus to any agent from the Stream Deck
- **Module**: Elgato Stream Deck Plugin (communicates with Claude Code CLI processes)

## Scenarios

### Happy Path
| # | Scenario | Priority |
|---|---|---|
| 1 | When a Claude Code agent is running in a terminal, the Stream Deck should display a button with its name and a green "running" icon | Must have |
| 2 | When the user presses an agent's button, the terminal window running that agent should come to the foreground | Must have |
| 3 | When a new agent starts in a terminal, a new button should appear on the Stream Deck within a few seconds | Must have |
| 4 | When multiple agents are running, each agent should have its own dedicated button | Must have |

### Business Rules
| # | Scenario | Priority |
|---|---|---|
| 5 | An agent's button should show a green icon when running, a blue icon when completed, and a red icon when errored | Must have |
| 6 | When there are more agents than available buttons (15 minus navigation buttons), the plugin should show pagination buttons (next/prev) | Should have |
| 7 | A completed agent's button should remain visible with a "done" indicator until replaced by pagination or manually dismissed | Should have |
| 8 | When the user presses a completed agent's button, the terminal window with the agent's final output should come to the foreground | Should have |

### Edge Cases
| # | Scenario | Priority |
|---|---|---|
| 9 | When no Claude Code agents are running and none have completed, the Stream Deck should show an empty/idle state | Should have |
| 10 | When exactly 13 agents exist (15 keys minus 2 for navigation), all agents should fit on one page without pagination buttons | Nice to have |
| 11 | When the user navigates to page 2 and agents on page 1 finish, the page layout should update without losing the user's current view | Nice to have |
| 12 | When an agent's name is too long for the button display, it should be truncated with a readable abbreviation | Should have |
| 13 | When the terminal window for an agent has been closed but the agent data is still known, pressing the button should handle the missing window gracefully | Should have |

### Error Cases
| # | Scenario | Priority |
|---|---|---|
| 14 | When the plugin cannot connect to or discover Claude Code processes, it should display an error state on the Stream Deck | Must have |
| 15 | When the plugin loses connection to Claude Code mid-session, agent buttons should show a "disconnected" indicator | Should have |
| 16 | When the user presses a button for an agent whose terminal window no longer exists, the plugin should show a notification rather than fail silently | Should have |

## Open Questions
- What exact mechanism does Claude Code CLI expose (if any) to enumerate running agents and their status? (needs technical investigation)
- Should the plugin support a "dismiss" gesture (e.g., long-press) to manually remove a completed agent's button?
- How frequently should the plugin poll for agent status changes? (balance between responsiveness and resource usage)
- Should the plugin reserve a dedicated button for a "refresh" or "settings" action?

## Decisions Made
- **Target hardware**: Stream Deck 15-key model (standard) — chosen for simplicity, other models deferred
- **Agent source**: CLI terminal sessions only — IDE extensions and web app are out of scope
- **Button display**: Agent name + color-coded status icon (green=running, blue=completed, red=error)
- **Press action**: Brings the agent's terminal window to the foreground (no separate UI panel)
- **Overflow strategy**: Pagination with next/prev navigation buttons when agents exceed available slots
- **Completed agents**: Remain visible with "done" state, still clickable to review output
