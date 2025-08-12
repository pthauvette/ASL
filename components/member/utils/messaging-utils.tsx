import { Check, CheckCheck } from 'lucide-react';
import { Message, ContactInfo } from '../types/messaging-types';

export const formatMessageTime = (timestamp: string) => {
  const now = new Date();
  const msgTime = new Date(timestamp);
  const diffInHours = (now.getTime() - msgTime.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return msgTime.toLocaleTimeString('fr-CA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } else if (diffInHours < 168) { // 7 days
    return msgTime.toLocaleDateString('fr-CA', { 
      weekday: 'short',
      hour: '2-digit', 
      minute: '2-digit'
    });
  } else {
    return msgTime.toLocaleDateString('fr-CA', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  }
};

export const renderMessageStatus = (message: Message, currentUserId: string) => {
  if (message.senderId !== currentUserId) return null;
  
  return message.read ? (
    <CheckCheck className="h-3 w-3 text-blue-500" />
  ) : (
    <Check className="h-3 w-3 text-gray-400" />
  );
};

export const getContactInfo = (userId: string, contacts: ContactInfo[]): ContactInfo | null => {
  return contacts.find(contact => contact.id === userId) || null;
};

export const getConversationTitle = (conversation: any, contacts: ContactInfo[], currentUserId: string): string => {
  if (conversation.isGroup) {
    return conversation.groupInfo?.name || conversation.title || 'Groupe';
  }
  
  const otherParticipantId = conversation.participantIds.find((id: string) => id !== currentUserId);
  if (otherParticipantId) {
    const contact = getContactInfo(otherParticipantId, contacts);
    return contact ? contact.name : 'Utilisateur inconnu';
  }
  return 'Conversation';
};

export const getConversationAvatar = (conversation: any, contacts: ContactInfo[], currentUserId: string) => {
  if (conversation.isGroup) {
    return conversation.groupInfo?.avatar;
  }
  
  const otherParticipantId = conversation.participantIds.find((id: string) => id !== currentUserId);
  if (otherParticipantId) {
    const contact = getContactInfo(otherParticipantId, contacts);
    return contact?.avatar;
  }
  return null;
};