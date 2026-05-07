export enum AgentStatus {
  Running = "Running",
  Completed = "Completed",
  Errored = "Errored",
}

export interface AgentButtonReadModel {
  name: string;
  status: AgentStatus;
}

export interface DashboardLayoutReadModel {
  buttons: AgentButtonReadModel[];
}
