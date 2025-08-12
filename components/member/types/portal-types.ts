export type PortalPage = 'dashboard' | 'profile' | 'events' | 'event-detail' | 'resources' | 'directory' | 'member-profile' | 'messaging' | 'network' | 'notifications';

export interface MembershipInfo {
  type: string;
  status: 'active' | 'pending' | 'expired';
  renewalDate: string;
  memberNumber: string;
  joinDate: string;
}

export interface RecentActivity {
  id: string;
  type: 'payment' | 'event' | 'document' | 'profile' | 'connection' | 'message';
  description: string;
  date: string;
  status?: 'completed' | 'pending' | 'failed';
}

export interface QuickStats {
  newMessages: number;
  pendingConnections: number;
  upcomingEvents: number;
  unreadNotifications: number;
}

export interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  status: string;
}

export interface MemberHighlight {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'stats';
  date: string;
}