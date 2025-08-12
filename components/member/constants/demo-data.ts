import { Notification, NotificationSettings } from '../types/notification-types';

export const USERS_INFO = {
  '2': { name: 'Jean Leblanc', organization: 'Armateurs Associés', title: 'Capitaine' },
  '3': { name: 'Sophie Martin', organization: 'Transport Maritime QC', title: 'Officière de pont' },
  '4': { name: 'Pierre Dubois', organization: 'ASL Sécurité', title: 'Inspecteur maritime' },
  '5': { name: 'Isabelle Roy', organization: 'Innovations Maritimes Inc.', title: 'Directrice R&D' },
  '6': { name: 'Michel Gagnon', organization: 'Chantier Naval Gagnon', title: 'Propriétaire' },
  '7': { name: 'Caroline Boucher', organization: 'Services Logistiques Maritimes', title: 'Gestionnaire logistique' }
};

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'connection_request',
    title: 'Nouvelle demande de connexion',
    message: 'Sophie Martin souhaite se connecter avec vous',
    senderId: '3',
    timestamp: '2024-08-07T10:30:00Z',
    read: false,
    actionable: true,
    actions: {
      primary: { label: 'Accepter', action: 'accept_connection' },
      secondary: { label: 'Décliner', action: 'decline_connection' }
    },
    priority: 'medium',
    category: 'social'
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'Nouveau message',
    message: 'Jean Leblanc: "Bonjour ! J\'espère que vous allez bien. Je voulais discuter du projet..."',
    senderId: '2',
    relatedId: 'conv-1',
    timestamp: '2024-08-07T09:45:00Z',
    read: false,
    actionable: true,
    actions: {
      primary: { label: 'Répondre', action: 'reply_message' },
      secondary: { label: 'Voir conversation', action: 'view_conversation' }
    },
    priority: 'high',
    category: 'social'
  },
  {
    id: 'notif-3',
    type: 'event_reminder',
    title: 'Rappel d\'événement',
    message: 'Formation Sécurité Maritime commence dans 1 heure',
    relatedId: 'event-2',
    timestamp: '2024-08-07T08:00:00Z',
    read: true,
    actionable: true,
    actions: {
      primary: { label: 'Voir détails', action: 'view_event' }
    },
    priority: 'high',
    category: 'events'
  },
  {
    id: 'notif-4',
    type: 'connection_accepted',
    title: 'Connexion acceptée',
    message: 'Pierre Dubois a accepté votre demande de connexion',
    senderId: '4',
    timestamp: '2024-08-06T16:20:00Z',
    read: true,
    actionable: true,
    actions: {
      primary: { label: 'Envoyer un message', action: 'start_conversation' },
      secondary: { label: 'Voir profil', action: 'view_profile' }
    },
    priority: 'medium',
    category: 'social'
  },
  {
    id: 'notif-5',
    type: 'achievement',
    title: 'Nouveau badge obtenu',
    message: 'Vous avez obtenu le badge "Connecteur" pour avoir établi 25 connexions professionnelles',
    timestamp: '2024-08-06T14:30:00Z',
    read: false,
    actionable: false,
    priority: 'low',
    category: 'achievements'
  },
  {
    id: 'notif-6',
    type: 'event_invitation',
    title: 'Invitation à un événement',
    message: 'Vous êtes invité à participer à la Conférence Maritime Annuelle 2024',
    relatedId: 'event-1',
    timestamp: '2024-08-05T11:15:00Z',
    read: true,
    actionable: true,
    actions: {
      primary: { label: 'S\'inscrire', action: 'register_event' },
      secondary: { label: 'Voir détails', action: 'view_event' }
    },
    priority: 'medium',
    category: 'events'
  },
  {
    id: 'notif-7',
    type: 'system',
    title: 'Mise à jour du système',
    message: 'De nouvelles fonctionnalités de messagerie sont maintenant disponibles',
    timestamp: '2024-08-05T09:00:00Z',
    read: true,
    actionable: false,
    priority: 'low',
    category: 'system'
  }
];

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  email: {
    connections: true,
    messages: true,
    events: true,
    achievements: true,
    system: false
  },
  push: {
    connections: true,
    messages: true,
    events: true,
    achievements: false,
    system: false
  },
  inApp: {
    connections: true,
    messages: true,
    events: true,
    achievements: true,
    system: true
  },
  preferences: {
    soundEnabled: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    digestFrequency: 'realtime'
  }
};