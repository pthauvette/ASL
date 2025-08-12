export const DEMO_CONTACTS = [
  {
    id: '2',
    name: 'Jean Leblanc',
    organization: 'Armateurs Associés',
    title: 'Capitaine',
    online: true,
    avatar: null
  },
  {
    id: '3',
    name: 'Sophie Martin',
    organization: 'Transport Maritime QC',
    title: 'Officière de pont',
    online: false,
    lastSeen: '2024-08-07T10:30:00Z',
    avatar: null
  },
  {
    id: '4',
    name: 'Pierre Dubois',
    organization: 'ASL Sécurité',
    title: 'Inspecteur maritime',
    online: true,
    avatar: null
  },
  {
    id: '5',
    name: 'Isabelle Roy',
    organization: 'Innovations Maritimes Inc.',
    title: 'Directrice R&D',
    online: false,
    lastSeen: '2024-08-07T09:15:00Z',
    avatar: null
  },
  {
    id: '6',
    name: 'Michel Gagnon',
    organization: 'Chantier Naval Gagnon',
    title: 'Propriétaire',
    online: true,
    avatar: null
  }
];

export const DEMO_CONVERSATIONS = (currentUserId: string) => [
  {
    id: 'conv-1',
    participantIds: [currentUserId, '2'],
    unreadCount: 2,
    createdAt: '2024-08-05T14:30:00Z',
    updatedAt: '2024-08-07T11:45:00Z',
    archived: false,
    muted: false,
    pinned: true,
    isGroup: false
  },
  {
    id: 'conv-2',
    participantIds: [currentUserId, '4'],
    unreadCount: 0,
    createdAt: '2024-08-03T09:20:00Z',
    updatedAt: '2024-08-06T16:20:00Z',
    archived: false,
    muted: false,
    pinned: false,
    isGroup: false
  },
  {
    id: 'conv-3',
    participantIds: [currentUserId, '5'],
    unreadCount: 1,
    createdAt: '2024-08-01T11:10:00Z',
    updatedAt: '2024-08-05T14:30:00Z',
    archived: false,
    muted: true,
    pinned: false,
    isGroup: false
  },
  {
    id: 'conv-group-1',
    participantIds: [currentUserId, '2', '4', '5'],
    unreadCount: 3,
    createdAt: '2024-08-04T09:00:00Z',
    updatedAt: '2024-08-07T14:15:00Z',
    archived: false,
    muted: false,
    pinned: false,
    isGroup: true,
    title: 'Projet Sécurité Maritime',
    groupInfo: {
      name: 'Projet Sécurité Maritime',
      description: 'Discussion sur les nouvelles normes de sécurité',
      adminIds: [currentUserId, '4']
    }
  }
];

export const DEMO_MESSAGES = (currentUserId: string) => [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: '2',
    recipientId: currentUserId,
    content: 'Bonjour ! J\'espère que vous allez bien. Je voulais discuter du projet de sécurité maritime que nous avions évoqué lors de la dernière conférence.',
    timestamp: '2024-08-07T10:30:00Z',
    read: false,
    type: 'text' as const
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: currentUserId,
    recipientId: '2',
    content: 'Bonjour Jean ! Oui, je me souviens parfaitement. C\'est un projet très intéressant et je pense qu\'il y a beaucoup de potentiel. Quand pourriez-vous organiser une réunion pour en discuter plus en détail ?',
    timestamp: '2024-08-07T10:45:00Z',
    read: true,
    type: 'text' as const
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: '2',
    recipientId: currentUserId,
    content: 'Parfait ! Je serais disponible demain après-midi ou vendredi matin. Que préférez-vous ? Nous pourrions nous rencontrer au port ou organiser une visioconférence.',
    timestamp: '2024-08-07T11:45:00Z',
    read: false,
    type: 'text' as const
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: '4',
    recipientId: currentUserId,
    content: 'Merci pour le partage du document sur les nouvelles réglementations. Très informatif ! J\'ai quelques questions à vous poser.',
    timestamp: '2024-08-06T16:20:00Z',
    read: true,
    type: 'text' as const
  },
  {
    id: 'msg-5',
    conversationId: 'conv-3',
    senderId: '5',
    recipientId: currentUserId,
    content: 'Avez-vous eu l\'occasion de regarder le prototype que nous avons présenté lors de la dernière conférence ? J\'aimerais avoir votre avis d\'expert.',
    timestamp: '2024-08-05T14:30:00Z',
    read: false,
    type: 'text' as const
  },
  {
    id: 'msg-6',
    conversationId: 'conv-group-1',
    senderId: '4',
    recipientId: '',
    content: 'Salut tout le monde ! J\'ai préparé un document de synthèse sur les nouvelles normes. Je le partage avec vous.',
    timestamp: '2024-08-07T13:15:00Z',
    read: false,
    type: 'text' as const,
    attachments: [{
      id: 'file-1',
      name: 'Normes_Securite_Maritime_2024.pdf',
      type: 'application/pdf',
      size: 2500000,
      url: '#'
    }]
  },
  {
    id: 'msg-7',
    conversationId: 'conv-group-1',
    senderId: '2',
    recipientId: '',
    content: 'Excellent travail Pierre ! Je vais examiner ça ce soir. Est-ce que nous pouvons planifier une réunion pour la semaine prochaine ?',
    timestamp: '2024-08-07T13:45:00Z',
    read: false,
    type: 'text' as const
  },
  {
    id: 'msg-8',
    conversationId: 'conv-group-1',
    senderId: '5',
    recipientId: '',
    content: 'Je suis d\'accord avec Jean. Une réunion serait très utile pour aligner nos stratégies.',
    timestamp: '2024-08-07T14:15:00Z',
    read: false,
    type: 'text' as const
  }
];