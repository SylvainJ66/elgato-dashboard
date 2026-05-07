import { AgentButtonReadModel } from "../read-models/agent-button-read-model";

export interface GetRunningAgentsQuery {
  execute(): Promise<AgentButtonReadModel[]>;
}
