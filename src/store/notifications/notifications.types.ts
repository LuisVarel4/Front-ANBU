export type Notification = {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type:
    | 'mission_delayed'
    | 'mission_failed'
    | 'mission_bounty'
    | 'mission_join_request'
    | 'message';
  contextId: string | null;
  decisionStatus?: 'accepted' | 'rejected';


  // ⚠️ Solo en front
  count?: number;
};
