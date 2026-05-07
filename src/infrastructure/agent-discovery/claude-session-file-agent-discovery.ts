import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { GetRunningAgentsQuery } from "../../domain/ports/get-running-agents-query";
import {
  AgentButtonReadModel,
  AgentStatus,
} from "../../domain/read-models/agent-button-read-model";

interface ClaudeSession {
  pid: number;
  cwd: string;
  entrypoint: string;
  status: string;
  name?: string;
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export class ClaudeSessionFileAgentDiscovery implements GetRunningAgentsQuery {
  private readonly sessionsDir: string;

  constructor(sessionsDir?: string) {
    this.sessionsDir =
      sessionsDir ?? path.join(os.homedir(), ".claude", "sessions");
  }

  async execute(): Promise<AgentButtonReadModel[]> {
    if (!fs.existsSync(this.sessionsDir)) {
      return [];
    }

    const files = fs
      .readdirSync(this.sessionsDir)
      .filter((f) => f.endsWith(".json"));

    const agents: AgentButtonReadModel[] = [];

    for (const file of files) {
      try {
        const content = fs.readFileSync(
          path.join(this.sessionsDir, file),
          "utf-8"
        );
        const session: ClaudeSession = JSON.parse(content);

        if (session.entrypoint !== "cli") continue;
        if (!isProcessAlive(session.pid)) continue;

        agents.push({
          name: session.name || path.basename(session.cwd),
          status: AgentStatus.Running,
        });
      } catch {
        // Skip malformed session files
      }
    }

    return agents;
  }
}
