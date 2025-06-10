import { User } from "./User";
import { Workspace } from "./Workspace";

export interface Invite {
	id: string;
	sender: User;
	recipient: User;
	workspace: Workspace,
	status: InviteStatus
}

type InviteStatus = "PENDING" | "ACCEPTED" | "DECLINED"