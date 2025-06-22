export type Notification = {
    id: string;
    message: string;
    createdAt: string;
    isRead: boolean;
    type?: "mission" | "decision" | "info";
    decisionStatus?: "accepted" | "rejected";
};
