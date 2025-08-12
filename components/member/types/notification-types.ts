export interface Notification {
  id: string;
  type: 'connection_request' | 'connection_accepted' | 'message' | 'event_invitation' | 'event_reminder' | 'achievement' | 'mention' | 'system';
  title: string;
  message: string;
  senderId?: string;
  relatedId?: string; // ID de l'événement, conversation, etc.
  timestamp: string;
  read: boolean;
  actionable: boolean;
  actions?: {
    primary?: { label: string; action: string; };
    secondary?: { label: string; action: string; };
  };
  priority: 'low' | 'medium' | 'high';
  category: 'social' | 'events' | 'system' | 'achievements';
}

export interface NotificationSettings {
  email: {
    connections: boolean;
    messages: boolean;
    events: boolean;
    achievements: boolean;
    system: boolean;
  };
  push: {
    connections: boolean;
    messages: boolean;
    events: boolean;
    achievements: boolean;
    system: boolean;
  };
  inApp: {
    connections: boolean;
    messages: boolean;
    events: boolean;
    achievements: boolean;
    system: boolean;
  };
  preferences: {
    soundEnabled: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
    digestFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  };
}

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  connectedSince: string;
  strength: 'weak' | 'medium' | 'strong';
  mutualConnections: number;
  lastInteraction?: string;
}

export interface NetworkStats {
  totalConnections: number;
  pendingRequests: number;
  sentRequests: number;
  newConnectionsThisMonth: number;
  mutualConnections: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'event' | 'available' | 'busy' | 'personal';
  location?: string;
  isVirtual?: boolean;
  participants?: string[];
  organizerId: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  isRecurring?: boolean;
  recurrenceRule?: string;
  reminderMinutes?: number;
  visibility: 'public' | 'private' | 'connections';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
  replyTo?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  muted: boolean;
}

export interface ContactInfo {
  id: string;
  name: string;
  organization: string;
  title: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}