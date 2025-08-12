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
  attachments?: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
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
  pinned: boolean;
  title?: string;
  isGroup: boolean;
  groupInfo?: {
    name: string;
    description?: string;
    avatar?: string;
    adminIds: string[];
  };
}

export interface ContactInfo {
  id: string;
  name: string;
  organization: string;
  title: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
  typing?: boolean;
}

export interface MessagingSystemProps {
  currentUser: any;
  onBack?: () => void;
  initialConversationId?: string;
  initialContactId?: string;
}