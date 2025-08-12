import { 
  Bell, MessageSquare, Users, Calendar, Star, Award, Settings, UserPlus 
} from 'lucide-react';
import { Notification } from '../types/notification-types';

export const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'connection_request':
    case 'connection_accepted':
      return UserPlus;
    case 'message':
      return MessageSquare;
    case 'event_invitation':
    case 'event_reminder':
      return Calendar;
    case 'achievement':
      return Award;
    case 'mention':
      return Star;
    case 'system':
      return Settings;
    default:
      return Bell;
  }
};

export const getNotificationColor = (type: string, priority: string) => {
  if (priority === 'high') return 'text-red-600';
  if (priority === 'medium') return 'text-orange-600';
  
  switch (type) {
    case 'connection_request':
    case 'connection_accepted':
      return 'text-blue-600';
    case 'message':
      return 'text-green-600';
    case 'event_invitation':
    case 'event_reminder':
      return 'text-purple-600';
    case 'achievement':
      return 'text-yellow-600';
    case 'system':
      return 'text-gray-600';
    default:
      return 'text-[#000033]';
  }
};

export const formatNotificationTime = (timestamp: string) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'À l\'instant';
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Il y a ${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Il y a ${diffInDays}j`;
  
  return notificationTime.toLocaleDateString('fr-CA', {
    month: 'short',
    day: 'numeric'
  });
};

export const filterNotifications = (
  notifications: Notification[], 
  filter: string
): Notification[] => {
  switch (filter) {
    case 'unread':
      return notifications.filter(n => !n.read);
    case 'actionable':
      return notifications.filter(n => n.actionable);
    case 'social':
      return notifications.filter(n => n.category === 'social');
    case 'events':
      return notifications.filter(n => n.category === 'events');
    case 'system':
      return notifications.filter(n => n.category === 'system');
    case 'achievements':
      return notifications.filter(n => n.category === 'achievements');
    default:
      return notifications;
  }
};

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.read).length;
};

export const getPriorityNotifications = (notifications: Notification[]): Notification[] => {
  return notifications.filter(n => n.priority === 'high' && !n.read);
};

export const sortNotificationsByTimestamp = (notifications: Notification[]): Notification[] => {
  return [...notifications].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};