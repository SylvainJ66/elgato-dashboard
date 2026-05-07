import {
  action,
  SingletonAction,
  type WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "com.sylvain.claudecode.agent-button" })
export class AgentButtonAction extends SingletonAction {
  override async onWillAppear(ev: WillAppearEvent): Promise<void> {
    await ev.action.setTitle("Idle");
  }
}
