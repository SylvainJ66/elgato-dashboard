import { describe, it, expect } from "vitest";
import { GetDashboardLayoutHandler } from "@domain/query-handlers/get-dashboard-layout-handler";
import { InMemoryGetRunningAgentsQuery } from "../stubs/in-memory-get-running-agents-query";
import { AgentStatus } from "@domain/read-models/agent-button-read-model";

describe("GetDashboardLayoutHandler", () => {
  it("A running Claude Code agent should be displayed as a button with its name and a running status", async () => {
    const agentsQuery = new InMemoryGetRunningAgentsQuery();
    agentsQuery.agents.push({ name: "my-project-agent", status: AgentStatus.Running });

    const result = await GetDashboardLayoutHandler.handle(agentsQuery);

    expect(result.buttons).toHaveLength(1);
    expect(result.buttons[0].name).toBe("my-project-agent");
    expect(result.buttons[0].status).toBe(AgentStatus.Running);
  });
});
