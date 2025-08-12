import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Search,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Filter,
  Star,
  MapPin,
  Building,
  Calendar,
  TrendingUp,
  Network,
  CheckCircle,
  X,
  Send,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt: string;
}

interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  connectedSince: string;
  strength: 'weak' | 'medium' | 'strong';
  mutualConnections: number;
  lastInteraction?: string;
}

interface NetworkStats {
  totalConnections: number;
  pendingRequests: number;
  sentRequests: number;
  newConnectionsThisMonth: number;
  mutualConnections: number;
}

interface NetworkConnectionsPageProps {
  currentUser: any;
  onViewProfile?: (userId: string) => void;
  onStartConversation?: (userId: string) => void;
}

export function NetworkConnectionsPage({ 
  currentUser, 
  onViewProfile,
  onStartConversation 
}: NetworkConnectionsPageProps) {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalConnections: 0,
    pendingRequests: 0,
    sentRequests: 0,
    newConnectionsThisMonth: 0,
    mutualConnections: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Données démo pour les connexions
  const demoConnections: Connection[] = [
    {
      id: 'conn-1',
      userId: currentUser.id,
      connectedUserId: '2',
      connectedSince: '2024-03-15',
      strength: 'strong',
      mutualConnections: 5,
      lastInteraction: '2024-08-05T14:30:00Z'
    },
    {
      id: 'conn-2',
      userId: currentUser.id,
      connectedUserId: '4',
      connectedSince: '2024-05-20',
      strength: 'medium',
      mutualConnections: 3,
      lastInteraction: '2024-08-06T16:20:00Z'
    },
    {
      id: 'conn-3',
      userId: currentUser.id,
      connectedUserId: '6',
      connectedSince: '2024-07-10',
      strength: 'weak',
      mutualConnections: 1,
      lastInteraction: '2024-07-25T10:15:00Z'
    }
  ];

  const demoConnectionRequests: ConnectionRequest[] = [
    {
      id: 'req-1',
      fromUserId: '3',
      toUserId: currentUser.id,
      message: 'Bonjour ! J\'aimerais me connecter avec vous pour échanger sur les pratiques de transport maritime.',
      status: 'pending',
      createdAt: '2024-08-06T10:30:00Z',
      updatedAt: '2024-08-06T10:30:00Z'
    },
    {
      id: 'req-2',
      fromUserId: '7',
      toUserId: currentUser.id,
      message: 'Nous nous sommes rencontrés lors de la dernière conférence maritime. J\'espère pouvoir continuer nos discussions.',
      status: 'pending',
      createdAt: '2024-08-05T14:20:00Z',
      updatedAt: '2024-08-05T14:20:00Z'
    }
  ];

  const demoSentRequests: ConnectionRequest[] = [
    {
      id: 'sent-1',
      fromUserId: currentUser.id,
      toUserId: '5',
      message: 'Votre présentation sur les innovations maritimes était très intéressante. J\'aimerais échanger davantage.',
      status: 'pending',
      createdAt: '2024-08-04T16:45:00Z',
      updatedAt: '2024-08-04T16:45:00Z'
    }
  ];

  // Informations des utilisateurs (simulées)
  const usersInfo = {
    '2': { name: 'Jean Leblanc', organization: 'Armateurs Associés', title: 'Capitaine', city: 'Montréal' },
    '3': { name: 'Sophie Martin', organization: 'Transport Maritime QC', title: 'Officière de pont', city: 'Rimouski' },
    '4': { name: 'Pierre Dubois', organization: 'ASL Sécurité', title: 'Inspecteur maritime', city: 'Montréal' },
    '5': { name: 'Isabelle Roy', organization: 'Innovations Maritimes Inc.', title: 'Directrice R&D', city: 'Longueuil' },
    '6': { name: 'Michel Gagnon', organization: 'Chantier Naval Gagnon', title: 'Propriétaire', city: 'Lévis' },
    '7': { name: 'Caroline Boucher', organization: 'Services Logistiques Maritimes', title: 'Gestionnaire logistique', city: 'Montréal' }
  };

  useEffect(() => {
    const loadNetworkData = async () => {
      setIsLoading(true);
      try {
        // Simulation de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setConnections(demoConnections);
        setConnectionRequests(demoConnectionRequests);
        setSentRequests(demoSentRequests);
        
        // Calculer les statistiques
        setNetworkStats({
          totalConnections: demoConnections.length,
          pendingRequests: demoConnectionRequests.length,
          sentRequests: demoSentRequests.length,
          newConnectionsThisMonth: demoConnections.filter(conn => 
            new Date(conn.connectedSince).getMonth() === new Date().getMonth()
          ).length,
          mutualConnections: demoConnections.reduce((sum, conn) => sum + conn.mutualConnections, 0)
        });
        
        console.log('✅ Données réseau chargées');
      } catch (error) {
        console.error('Erreur chargement réseau:', error);
        toast.error('Erreur de chargement', {
          description: 'Impossible de charger les données du réseau.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadNetworkData();
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const request = connectionRequests.find(req => req.id === requestId);
      if (!request) return;

      // Mettre à jour le statut de la demande
      setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
      
      // Ajouter une nouvelle connexion
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        userId: currentUser.id,
        connectedUserId: request.fromUserId,
        connectedSince: new Date().toISOString().split('T')[0],
        strength: 'weak',
        mutualConnections: 0,
        lastInteraction: new Date().toISOString()
      };
      
      setConnections(prev => [newConnection, ...prev]);
      
      // Mettre à jour les stats
      setNetworkStats(prev => ({
        ...prev,
        totalConnections: prev.totalConnections + 1,
        pendingRequests: prev.pendingRequests - 1,
        newConnectionsThisMonth: prev.newConnectionsThisMonth + 1
      }));

      const userInfo = usersInfo[request.fromUserId as keyof typeof usersInfo];
      toast.success('Connexion acceptée', {
        description: `Vous êtes maintenant connecté avec ${userInfo?.name}.`
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible d\'accepter la demande de connexion.'
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      const request = connectionRequests.find(req => req.id === requestId);
      if (!request) return;

      setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
      setNetworkStats(prev => ({
        ...prev,
        pendingRequests: prev.pendingRequests - 1
      }));

      toast.success('Demande déclinée');
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de décliner la demande.'
      });
    }
  };

  const handleRemoveConnection = async (connectionId: string) => {
    try {
      const connection = connections.find(conn => conn.id === connectionId);
      if (!connection) return;

      setConnections(prev => prev.filter(conn => conn.id !== connectionId));
      setNetworkStats(prev => ({
        ...prev,
        totalConnections: prev.totalConnections - 1
      }));

      const userInfo = usersInfo[connection.connectedUserId as keyof typeof usersInfo];
      toast.success('Connexion supprimée', {
        description: `Vous n'êtes plus connecté avec ${userInfo?.name}.`
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de supprimer la connexion.'
      });
    }
  };

  const getStrengthBadge = (strength: string) => {
    const styles = {
      'weak': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'strong': 'bg-green-100 text-green-800'
    };
    
    const labels = {
      'weak': 'Faible',
      'medium': 'Moyenne',
      'strong': 'Forte'
    };
    
    return (
      <Badge className={`${styles[strength as keyof typeof styles]} hover:bg-opacity-80`}>
        {labels[strength as keyof typeof labels]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredConnections = connections.filter(connection => {
    if (!searchQuery) return true;
    
    const userInfo = usersInfo[connection.connectedUserId as keyof typeof usersInfo];
    if (!userInfo) return false;
    
    return userInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           userInfo.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
           userInfo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000033] mx-auto mb-4"></div>
          <p className="text-[#43464b]">Chargement du réseau...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistiques du réseau */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{networkStats.totalConnections}</p>
                <p className="text-sm text-[#43464b]">Connexions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{networkStats.pendingRequests}</p>
                <p className="text-sm text-[#43464b]">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{networkStats.sentRequests}</p>
                <p className="text-sm text-[#43464b]">Envoyées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{networkStats.newConnectionsThisMonth}</p>
                <p className="text-sm text-[#43464b]">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Network className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{networkStats.mutualConnections}</p>
                <p className="text-sm text-[#43464b]">Mutuelles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation par onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="connections">
              Mes connexions ({networkStats.totalConnections})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Demandes reçues 
              {networkStats.pendingRequests > 0 && (
                <Badge className="ml-2 bg-[#000033] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                  {networkStats.pendingRequests}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sent">
              Demandes envoyées ({networkStats.sentRequests})
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Mes connexions */}
        <TabsContent value="connections" className="space-y-6">
          {filteredConnections.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#000033] mb-2">
                  {searchQuery ? 'Aucune connexion trouvée' : 'Aucune connexion'}
                </h3>
                <p className="text-[#43464b]">
                  {searchQuery ? 
                    'Essayez de modifier votre recherche.' : 
                    'Commencez à vous connecter avec d\'autres professionnels maritimes.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredConnections.map((connection) => {
                const userInfo = usersInfo[connection.connectedUserId as keyof typeof usersInfo];
                if (!userInfo) return null;

                return (
                  <Card key={connection.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                              {userInfo.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium text-[#000033]">{userInfo.name}</h3>
                            <p className="text-sm text-[#43464b]">{userInfo.title}</p>
                            <p className="text-sm text-[#43464b]">{userInfo.organization}</p>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#43464b]">Force de connexion</span>
                          {getStrengthBadge(connection.strength)}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#43464b]">Connecté depuis</span>
                          <span className="text-[#000033]">{formatDate(connection.connectedSince)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#43464b]">Connexions mutuelles</span>
                          <span className="text-[#000033]">{connection.mutualConnections}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-[#43464b]" />
                          <span className="text-[#43464b]">{userInfo.city}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#000033] hover:bg-[#000033]/90 text-white"
                          onClick={() => onStartConversation?.(connection.connectedUserId)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onViewProfile?.(connection.connectedUserId)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRemoveConnection(connection.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Demandes reçues */}
        <TabsContent value="requests" className="space-y-6">
          {connectionRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#000033] mb-2">Aucune demande en attente</h3>
                <p className="text-[#43464b]">
                  Vous n'avez actuellement aucune demande de connexion en attente.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {connectionRequests.map((request) => {
                const userInfo = usersInfo[request.fromUserId as keyof typeof usersInfo];
                if (!userInfo) return null;

                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                            {userInfo.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-[#000033]">{userInfo.name}</h3>
                              <p className="text-sm text-[#43464b]">{userInfo.title} • {userInfo.organization}</p>
                            </div>
                            <span className="text-xs text-[#43464b]">
                              {formatDate(request.createdAt)}
                            </span>
                          </div>
                          
                          {request.message && (
                            <div className="bg-gray-50 p-3 rounded-lg mb-4">
                              <p className="text-sm text-[#43464b] italic">"{request.message}"</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accepter
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeclineRequest(request.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Décliner
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onViewProfile?.(request.fromUserId)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Voir profil
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Demandes envoyées */}
        <TabsContent value="sent" className="space-y-6">
          {sentRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#000033] mb-2">Aucune demande envoyée</h3>
                <p className="text-[#43464b]">
                  Vous n'avez envoyé aucune demande de connexion en attente.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((request) => {
                const userInfo = usersInfo[request.toUserId as keyof typeof usersInfo];
                if (!userInfo) return null;

                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                            {userInfo.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-[#000033]">{userInfo.name}</h3>
                              <p className="text-sm text-[#43464b]">{userInfo.title} • {userInfo.organization}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-yellow-100 text-yellow-800 mb-1">En attente</Badge>
                              <p className="text-xs text-[#43464b]">
                                {formatDate(request.createdAt)}
                              </p>
                            </div>
                          </div>
                          
                          {request.message && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-4">
                              <p className="text-sm text-[#43464b]">Votre message: "{request.message}"</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onViewProfile?.(request.toUserId)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Voir profil
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}