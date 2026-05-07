import streamDeck from "@elgato/streamdeck";
import { AgentButtonAction } from "./agent-button-action";
import { ClaudeSessionFileAgentDiscovery } from "../agent-discovery/claude-session-file-agent-discovery";
import { GetDashboardLayoutHandler } from "../../domain/query-handlers/get-dashboard-layout-handler";

const agentButtonAction = new AgentButtonAction();
streamDeck.actions.registerAction(agentButtonAction);

streamDeck.connect().then(() => {
  streamDeck.logger.info("Claude Code Dashboard plugin connected");

  setInterval(async () => {
    try {
      const discovery = new ClaudeSessionFileAgentDiscovery();
      const layout = await GetDashboardLayoutHandler.handle(discovery);

      let index = 0;
      for (const action of agentButtonAction.actions) {
        if (!action.isKey()) continue;

        if (index < layout.buttons.length) {
          const agent = layout.buttons[index];
          await action.setTitle(agent.name);
          await action.setImage(buildGreenKeyImage(agent.name));
        } else {
          await action.setTitle("Idle");
          await action.setImage(undefined);
        }
        index++;
      }
    } catch (err) {
      streamDeck.logger.error("Poll error: " + String(err));
    }
  }, 3000);
});

function buildGreenKeyImage(name: string): string {
  const displayName = name.length > 10 ? name.substring(0, 9) + "…" : name;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144">
      <rect width="144" height="144" rx="16" fill="#1a1a2e"/>
      <circle cx="72" cy="55" r="28" fill="#00c853"/>
      <text x="72" y="63" text-anchor="middle" fill="white" font-family="Arial" font-size="20" font-weight="bold">CC</text>
      <text x="72" y="115" text-anchor="middle" fill="#ccc" font-family="Arial" font-size="14">${displayName}</text>
    </svg>`
  )}`;
}
