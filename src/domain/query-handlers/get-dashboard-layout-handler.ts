import { GetRunningAgentsQuery } from "../ports/get-running-agents-query";
import { DashboardLayoutReadModel } from "../read-models/agent-button-read-model";

export class GetDashboardLayoutHandler {
  static async handle(
    agentsQuery: GetRunningAgentsQuery
  ): Promise<DashboardLayoutReadModel> {
    const agents = await agentsQuery.execute();
    return { buttons: agents };
  }
}
