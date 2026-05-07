import { AgentButtonReadModel } from "@domain/read-models/agent-button-read-model";
import { GetRunningAgentsQuery } from "@domain/ports/get-running-agents-query";

export class InMemoryGetRunningAgentsQuery implements GetRunningAgentsQuery {
  agents: AgentButtonReadModel[] = [];

  async execute(): Promise<AgentButtonReadModel[]> {
    return this.agents;
  }
}
