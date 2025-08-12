import { 
  CreditCard, Calendar, FileText, User, Users, MessageSquare, Activity,
  Award, TrendingUp
} from 'lucide-react';
import { Badge } from '../../ui/badge';

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>;
    case 'pending':
      return <Badge variant="outline" className="border-yellow-300 text-yellow-800">En attente</Badge>;
    case 'expired':
      return <Badge variant="destructive">Expiré</Badge>;
    case 'registered':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Inscrit</Badge>;
    case 'available':
      return <Badge variant="outline">Disponible</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const getActivityIcon = (type: string) => {
  switch (type) {
    case 'payment':
      return <CreditCard className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'profile':
      return <User className="h-4 w-4" />;
    case 'connection':
      return <Users className="h-4 w-4" />;
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

export const getHighlightIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return Award;
    case 'stats':
      return TrendingUp;
    default:
      return Award;
  }
};

export const getPageTitle = (currentPage: string) => {
  switch (currentPage) {
    case 'dashboard':
      return 'Tableau de bord';
    case 'profile':
      return 'Mon profil';
    case 'events':
      return 'Événements';
    case 'event-detail':
      return 'Détail de l\'événement';
    case 'resources':
      return 'Ressources';
    case 'directory':
      return 'Répertoire des membres';
    case 'member-profile':
      return 'Profil membre';
    case 'messaging':
      return 'Messagerie';
    case 'network':
      return 'Mon réseau';
    case 'notifications':
      return 'Notifications';
    default:
      return 'Tableau de bord';
  }
};

export const getPageDescription = (currentPage: string, userName?: string) => {
  const safeName = userName || 'Membre';
  
  switch (currentPage) {
    case 'dashboard':
      return `Bienvenue, ${safeName}`;
    case 'profile':
      return 'Gérez vos informations personnelles et professionnelles';
    case 'events':
      return 'Découvrez et participez à nos événements';
    case 'event-detail':
      return 'Informations détaillées de l\'événement';
    case 'resources':
      return 'Accédez à nos ressources exclusives';
    case 'directory':
      return 'Connectez-vous avec des professionnels maritimes';
    case 'member-profile':
      return 'Profil détaillé du membre';
    case 'messaging':
      return 'Échangez avec votre réseau professionnel';
    case 'network':
      return 'Gérez vos connexions et développez votre réseau';
    case 'notifications':
      return 'Restez informé de toutes les activités';
    default:
      return `Bienvenue, ${safeName}`;
  }
};