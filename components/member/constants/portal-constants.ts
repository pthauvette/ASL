export const QUICK_STATS_DEFAULT = {
  newMessages: 3,
  pendingConnections: 2,
  upcomingEvents: 2,
  unreadNotifications: 5
};

export const DEMO_RECENT_ACTIVITIES = [
  {
    id: '1',
    type: 'connection' as const,
    description: 'Sophie Martin a accepté votre demande de connexion',
    date: '2024-08-07T10:30:00Z',
    status: 'completed' as const
  },
  {
    id: '2',
    type: 'message' as const,
    description: 'Nouveau message de Jean Leblanc concernant le projet sécurité',
    date: '2024-08-07T09:45:00Z',
    status: 'completed' as const
  },
  {
    id: '3',
    type: 'event' as const,
    description: 'Inscription confirmée à la Formation Sécurité Maritime',
    date: '2024-08-06T16:20:00Z',
    status: 'completed' as const
  },
  {
    id: '4',
    type: 'document' as const,
    description: 'Nouveau document disponible : Guide des bonnes pratiques 2024',
    date: '2024-08-06T14:30:00Z',
    status: 'completed' as const
  },
  {
    id: '5',
    type: 'profile' as const,
    description: 'Profil mis à jour avec succès',
    date: '2024-08-05T11:15:00Z',
    status: 'completed' as const
  }
];

export const DEMO_UPCOMING_EVENTS = [
  {
    id: '1',
    name: 'Formation Sécurité Maritime',
    date: '2024-08-22',
    location: 'Port de Montréal',
    status: 'registered'
  },
  {
    id: '2',
    name: 'Networking Maritime - Cocktail d\'automne',
    date: '2024-10-10',
    location: 'Yacht Club de Québec',
    status: 'available'
  }
];

export const DEMO_MEMBER_HIGHLIGHTS = [
  {
    id: '1',
    title: 'Nouvelle certification obtenue',
    description: 'Félicitations ! Vous avez obtenu la certification ISO 14001.',
    type: 'achievement' as const,
    date: '2024-08-05'
  },
  {
    id: '2',
    title: 'Profil populaire',
    description: 'Votre profil a été consulté 15 fois cette semaine.',
    type: 'stats' as const,
    date: '2024-08-04'
  }
];

export const DEFAULT_MEMBERSHIP_INFO = {
  type: 'Membre Associé',
  status: 'active' as const,
  renewalDate: '2025-03-15',
  memberNumber: 'ASL-2024-0142',
  joinDate: '2023-03-15'
};