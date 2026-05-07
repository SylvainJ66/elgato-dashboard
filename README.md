# Stream Deck Agent Dashboard

> Create a dashboard in the Elgato Stream Deck via a plugin. This should make the buttons of the Stream Deck show the agents Claude Code. 1 button = 1 agent. Click on it show on the screen the agent.

## Scenarios

### Happy Path
- [x] 1. When a Claude Code agent is running in a terminal, the Stream Deck should display a button with its name and a green "running" icon *(Must have)*
- [ ] 2. When the user presses an agent's button, the terminal window running that agent should come to the foreground *(Must have)*
- [ ] 3. When a new agent starts in a terminal, a new button should appear on the Stream Deck within a few seconds *(Must have)*
- [ ] 4. When multiple agents are running, each agent should have its own dedicated button *(Must have)*

### Business Rules
- [ ] 5. An agent's button should show a green icon when running, a blue icon when completed, and a red icon when errored *(Must have)*
- [ ] 6. When there are more agents than available buttons (15 minus navigation buttons), the plugin should show pagination buttons (next/prev) *(Should have)*
- [ ] 7. A completed agent's button should remain visible with a "done" indicator until replaced by pagination or manually dismissed *(Should have)*
- [ ] 8. When the user presses a completed agent's button, the terminal window with the agent's final output should come to the foreground *(Should have)*

### Edge Cases
- [ ] 9. When no Claude Code agents are running and none have completed, the Stream Deck should show an empty/idle state *(Should have)*
- [ ] 10. When exactly 13 agents exist (15 keys minus 2 for navigation), all agents should fit on one page without pagination buttons *(Nice to have)*
- [ ] 11. When the user navigates to page 2 and agents on page 1 finish, the page layout should update without losing the user's current view *(Nice to have)*
- [ ] 12. When an agent's name is too long for the button display, it should be truncated with a readable abbreviation *(Should have)*
- [ ] 13. When the terminal window for an agent has been closed but the agent data is still known, pressing the button should handle the missing window gracefully *(Should have)*

### Error Cases
- [ ] 14. When the plugin cannot connect to or discover Claude Code processes, it should display an error state on the Stream Deck *(Must have)*
- [ ] 15. When the plugin loses connection to Claude Code mid-session, agent buttons should show a "disconnected" indicator *(Should have)*
- [ ] 16. When the user presses a button for an agent whose terminal window no longer exists, the plugin should show a notification rather than fail silently *(Should have)*
