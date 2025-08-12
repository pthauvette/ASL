import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  MapPin,
  Globe,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Users,
  Star,
  MessageSquare,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  Award,
  ExternalLink,
  Share2,
  Flag,
  MoreHorizontal,
  CheckCircle,
  Heart,
  Eye,
  Download,
  Send,
  UserMinus
} from 'lucide-react';
import { toast } from 'sonner';
import { membriApi } from '../../utils/membriApi';

interface MemberProfileDetailPageProps {
  memberId: string;
  onBack: () => void;
  currentUser?: any;
  onStartConversation?: (memberId: string) => void;
}

interface ConnectionStatus {
  status: 'none' | 'pending_sent' | 'pending_received' | 'connected';
  connectedSince?: string;
}

interface ProfileActivity {
  id: string;
  type: 'event' | 'publication' | 'connection' | 'achievement';
  title: string;
  description: string;
  date: string;
  metadata?: any;
}

export function MemberProfileDetailPage({ 
  memberId, 
  onBack, 
  currentUser,
  onStartConversation 
}: MemberProfileDetailPageProps) {
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ status: 'none' });
  const [isProcessingConnection, setIsProcessingConnection] = useState(false);
  const [recentActivity, setRecentActivity] = useState<ProfileActivity[]>([]);
  const [mutualConnections, setMutualConnections] = useState<any[]>([]);
  const [sharedEvents, setSharedEvents] = useState<any[]>([]);

  // Données démo enrichies pour l'activité du profil
  const demoActivity: ProfileActivity[] = [
    {
      id: '1',
      type: 'event',
      title: 'Participation à la Conférence Maritime 2024',
      description: 'A participé et présenté sur les innovations en logistique portuaire',
      date: '2024-07-15',
      metadata: { eventId: '1', role: 'speaker' }
    },
    {
      id: '2',
      type: 'publication',
      title: 'Article publié: "L\'avenir du transport maritime vert"',
      description: 'Publication dans la revue Maritime Innovation Quarterly',
      date: '2024-06-20',
      metadata: { type: 'article', journal: 'Maritime Innovation Quarterly' }
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Certification ISO 14001',
      description: 'Obtention de la certification environnementale pour son organisation',
      date: '2024-05-10',
      metadata: { certification: 'ISO 14001', authority: 'Bureau Veritas' }
    },
    {
      id: '4',
      type: 'connection',
      title: 'Nouvelles connexions réseau',
      description: 'S\'est connecté avec 5 nouveaux professionnels ce mois',
      date: '2024-07-01',
      metadata: { count: 5, period: 'month' }
    }
  ];

  const demoMutualConnections = [
    {
      id: '2',
      name: 'Jean Leblanc',
      organization: 'Armateurs Associés',
      title: 'Capitaine',
      avatar: null
    },
    {
      id: '4',
      name: 'Pierre Dubois',
      organization: 'ASL Sécurité',
      title: 'Inspecteur maritime',
      avatar: null
    }
  ];

  const demoSharedEvents = [
    {
      id: '1',
      name: 'Conférence Maritime Annuelle 2024',
      date: '2024-09-15',
      both_registered: true
    },
    {
      id: '2',
      name: 'Formation Sécurité Maritime',
      date: '2024-08-22',
      both_registered: false
    }
  ];

  useEffect(() => {
    const loadMemberProfile = async () => {
      setIsLoading(true);
      try {
        // Charger le profil du membre
        const memberData = await membriApi.fetchMemberById(memberId);
        
        if (memberData) {
          setMember(memberData);
          
          // Simuler le statut de connexion (en réalité, viendrait de l'API)
          const simulatedConnectionStatus = getSimulatedConnectionStatus(memberId);
          setConnectionStatus(simulatedConnectionStatus);
          
          // Charger l'activité récente
          setRecentActivity(demoActivity);
          setMutualConnections(demoMutualConnections);
          setSharedEvents(demoSharedEvents);
          
          console.log('✅ Profil membre chargé:', memberData);
        } else {
          toast.error('Membre introuvable', {
            description: 'Ce profil n\'existe pas ou n\'est plus disponible.'
          });
          onBack();
        }
      } catch (error) {
        console.error('Erreur chargement profil:', error);
        toast.error('Erreur de chargement', {
          description: 'Impossible de charger ce profil membre.'
        });
        onBack();
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberProfile();
  }, [memberId, onBack]);

  const getSimulatedConnectionStatus = (memberId: string): ConnectionStatus => {
    // Simulation basée sur l'ID
    const statusOptions: ConnectionStatus[] = [
      { status: 'none' },
      { status: 'connected', connectedSince: '2024-03-15' },
      { status: 'pending_sent' },
      { status: 'pending_received' }
    ];
    
    const index = parseInt(memberId) % statusOptions.length;
    return statusOptions[index];
  };

  const handleSendConnectionRequest = async () => {
    setIsProcessingConnection(true);
    try {
      // Simulation de l'envoi de demande de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus({ status: 'pending_sent' });
      toast.success('Demande de connexion envoyée', {
        description: `Une demande de connexion a été envoyée à ${member.name}.`
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible d\'envoyer la demande de connexion.'
      });
    } finally {
      setIsProcessingConnection(false);
    }
  };

  const handleAcceptConnection = async () => {
    setIsProcessingConnection(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus({ 
        status: 'connected', 
        connectedSince: new Date().toISOString().split('T')[0] 
      });
      toast.success('Connexion acceptée', {
        description: `Vous êtes maintenant connecté avec ${member.name}.`
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible d\'accepter la demande de connexion.'
      });
    } finally {
      setIsProcessingConnection(false);
    }
  };

  const handleDeclineConnection = async () => {
    setIsProcessingConnection(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus({ status: 'none' });
      toast.success('Demande déclinée', {
        description: 'La demande de connexion a été déclinée.'
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de décliner la demande.'
      });
    } finally {
      setIsProcessingConnection(false);
    }
  };

  const handleRemoveConnection = async () => {
    setIsProcessingConnection(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus({ status: 'none' });
      toast.success('Connexion supprimée', {
        description: `Vous n'êtes plus connecté avec ${member.name}.`
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de supprimer la connexion.'
      });
    } finally {
      setIsProcessingConnection(false);
    }
  };

  const handleStartConversation = () => {
    if (onStartConversation) {
      onStartConversation(memberId);
    } else {
      toast.info('Messagerie en développement', {
        description: 'La fonctionnalité de messagerie sera bientôt disponible.'
      });
    }
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/membres/${memberId}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Lien copié', {
      description: 'Le lien du profil a été copié dans le presse-papiers.'
    });
  };

  const getMembershipBadge = (type: string) => {
    const styles = {
      'Actif': 'bg-blue-100 text-blue-800',
      'Associé': 'bg-green-100 text-green-800',
      'Grand partenaire': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge className={`${styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800'} hover:bg-opacity-80`}>
        {type}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'publication':
        return <Award className="h-4 w-4" />;
      case 'connection':
        return <Users className="h-4 w-4" />;
      case 'achievement':
        return <Star className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const renderConnectionButton = () => {
    if (!currentUser || currentUser.id === memberId) {
      return null;
    }

    switch (connectionStatus.status) {
      case 'none':
        return (
          <Button
            onClick={handleSendConnectionRequest}
            disabled={isProcessingConnection}
            className="bg-[#000033] hover:bg-[#000033]/90 text-white"
          >
            {isProcessingConnection ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            Se connecter
          </Button>
        );
      
      case 'pending_sent':
        return (
          <Button
            variant="outline"
            disabled
            className="border-yellow-300 text-yellow-700"
          >
            <Clock className="h-4 w-4 mr-2" />
            Demande envoyée
          </Button>
        );
      
      case 'pending_received':
        return (
          <div className="flex gap-2">
            <Button
              onClick={handleAcceptConnection}
              disabled={isProcessingConnection}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Accepter
            </Button>
            <Button
              onClick={handleDeclineConnection}
              disabled={isProcessingConnection}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <UserX className="h-4 w-4" />
            </Button>
          </div>
        );
      
      case 'connected':
        return (
          <div className="flex gap-2">
            <Button
              onClick={handleStartConversation}
              className="bg-[#000033] hover:bg-[#000033]/90 text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button
              onClick={handleRemoveConnection}
              disabled={isProcessingConnection}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <UserMinus className="h-4 w-4" />
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000033] mx-auto mb-4"></div>
          <p className="text-[#43464b]">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-[#000033] mb-2">Profil introuvable</h3>
        <p className="text-[#43464b] mb-4">Ce membre n'existe pas ou n'est plus disponible.</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au répertoire
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec navigation */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au répertoire
        </Button>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShareProfile}
            className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        {member.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-[#000033] text-white hover:bg-[#000033]/90">
              <Star className="h-3 w-3 mr-1" />
              Membre vedette
            </Badge>
          </div>
        )}
        
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-[#000033] text-white text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center gap-2 mb-2">
                {getMembershipBadge(member.membershipType)}
                {member.verified && (
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              {connectionStatus.status === 'connected' && connectionStatus.connectedSince && (
                <p className="text-xs text-[#43464b] text-center md:text-left">
                  Connecté depuis {new Date(connectionStatus.connectedSince).toLocaleDateString('fr-CA', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              )}
            </div>
            
            <div className="flex-1">
              <div className="text-center md:text-left mb-6">
                <h1 className="text-3xl font-bold text-[#000033] mb-2">{member.name}</h1>
                <p className="text-xl text-[#43464b] mb-1">{member.title}</p>
                <p className="text-lg text-[#43464b] mb-4">{member.organization}</p>
                
                {member.description && (
                  <p className="text-[#43464b] leading-relaxed mb-4">
                    {member.description}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#43464b]" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-[#000033] hover:underline text-sm"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#43464b]" />
                    <span className="text-[#43464b] text-sm">{member.phone}</span>
                  </div>
                )}
                
                {member.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#43464b]" />
                    <span className="text-[#43464b] text-sm">{member.city}, {member.province}</span>
                  </div>
                )}
                
                {member.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#43464b]" />
                    <a 
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#000033] hover:underline text-sm"
                    >
                      Site web
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {renderConnectionButton()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="connections">Connexions</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
        </TabsList>

        {/* Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    À propos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#000033] mb-2">Organisation</h4>
                    <p className="text-[#43464b]">{member.organization}</p>
                  </div>
                  
                  {member.department && (
                    <div>
                      <h4 className="font-medium text-[#000033] mb-2">Département</h4>
                      <p className="text-[#43464b]">{member.department}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium text-[#000033] mb-2">Membre depuis</h4>
                    <p className="text-[#43464b]">
                      {new Date(member.memberSince).toLocaleDateString('fr-CA', { 
                        year: 'numeric', 
                        month: 'long'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Expertise */}
              {member.sectors && member.sectors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Secteurs d'expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.sectors.map((sector, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="border-blue-300 text-blue-800"
                        >
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Services */}
              {member.services && member.services.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Services offerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.services.map((service, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="border-green-300 text-green-800"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#43464b]">Connexions</span>
                      <span className="font-medium text-[#000033]">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#43464b]">Événements</span>
                      <span className="font-medium text-[#000033]">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#43464b]">Publications</span>
                      <span className="font-medium text-[#000033]">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mutual Connections */}
              {mutualConnections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Connexions communes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mutualConnections.map((connection) => (
                        <div key={connection.id} className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={connection.avatar} />
                            <AvatarFallback className="bg-[#000033]/10 text-[#000033] text-xs">
                              {connection.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#000033] truncate">
                              {connection.name}
                            </p>
                            <p className="text-xs text-[#43464b] truncate">
                              {connection.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Activité */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 p-4 rounded-lg bg-[#f8f9fa] border">
                    <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000033] mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-[#43464b] mb-2">
                        {activity.description}
                      </p>
                      <p className="text-xs text-[#43464b]">
                        {new Date(activity.date).toLocaleDateString('fr-CA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connexions */}
        <TabsContent value="connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Réseau professionnel
              </CardTitle>
              <CardDescription>
                Les connexions professionnelles de {member.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#000033] mb-2">Connexions privées</h3>
                <p className="text-[#43464b]">
                  Les connexions de ce membre sont privées.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Événements */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Événements partagés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium text-[#000033]">{event.name}</h4>
                      <p className="text-sm text-[#43464b]">
                        {new Date(event.date).toLocaleDateString('fr-CA')}
                      </p>
                    </div>
                    {event.both_registered && (
                      <Badge className="bg-green-100 text-green-800">
                        Tous les deux inscrits
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}