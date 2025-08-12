import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Star,
  Bookmark,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface EventsPageProps {
  upcomingEvents: any[];
  onEventClick?: (eventId: string) => void;
}

export function EventsPage({ upcomingEvents, onEventClick }: EventsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allEvents = [
    {
      id: '1',
      title: 'Formation Sécurité Maritime',
      description: 'Formation complète sur les protocoles de sécurité en milieu maritime selon les dernières normes internationales.',
      date: '2024-08-22',
      time: '09:00',
      endTime: '17:00',
      location: 'Port de Montréal',
      address: '2100 Avenue Pierre-Dupuy, Montréal, QC',
      category: 'formation',
      capacity: 50,
      registered: 32,
      price: 0,
      status: 'registered',
      featured: true,
      organizer: 'ASL Formation',
      tags: ['sécurité', 'maritime', 'certification']
    },
    {
      id: '2',
      title: 'Networking Maritime - Cocktail d\'automne',
      description: 'Événement de réseautage pour les professionnels du secteur maritime. Cocktail et présentations d\'entreprises.',
      date: '2024-10-10',
      time: '18:00',
      endTime: '21:00',
      location: 'Yacht Club de Québec',
      address: '1450 Rue Sous-le-Fort, Québec, QC',
      category: 'networking',
      capacity: 120,
      registered: 87,
      price: 0,
      status: 'available',
      featured: false,
      organizer: 'Comité Networking ASL',
      tags: ['réseautage', 'cocktail', 'automne']
    },
    {
      id: '3',
      title: 'Conférence Maritime Annuelle 2024',
      description: 'Grande conférence annuelle réunissant les leaders de l\'industrie maritime pour discuter des enjeux et innovations.',
      date: '2024-11-15',
      time: '08:30',
      endTime: '16:30',
      location: 'Centre des congrès de Montréal',
      address: '1001 Pl. Jean-Paul-Riopelle, Montréal, QC',
      category: 'conference',
      capacity: 300,
      registered: 156,
      price: 0,
      status: 'available',
      featured: true,
      organizer: 'ASL',
      tags: ['conférence', 'leadership', 'innovation']
    },
    {
      id: '4',
      title: 'Atelier Réglementation Maritime',
      description: 'Atelier pratique sur les nouvelles réglementations maritimes et leur impact sur les opérations.',
      date: '2024-09-05',
      time: '13:00',
      endTime: '17:00',
      location: 'Hôtel Château Frontenac',
      address: '1 Rue des Carrières, Québec, QC',
      category: 'atelier',
      capacity: 40,
      registered: 15,
      price: 0,
      status: 'available',
      featured: false,
      organizer: 'Département Juridique ASL',
      tags: ['réglementation', 'atelier', 'juridique']
    },
    {
      id: '5',
      title: 'Forum Innovation Maritime',
      description: 'Découvrez les dernières innovations technologiques dans le secteur maritime avec des démonstrations live.',
      date: '2024-12-03',
      time: '10:00',
      endTime: '15:00',
      location: 'Technopole maritime du Québec',
      address: '1000 Rue de l\'Innovation, Rimouski, QC',
      category: 'forum',
      capacity: 80,
      registered: 23,
      price: 0,
      status: 'available',
      featured: true,
      organizer: 'Comité Innovation ASL',
      tags: ['innovation', 'technologie', 'démonstration']
    }
  ];

  const pastEvents = [
    {
      id: 'p1',
      title: 'Séminaire Développement Durable',
      description: 'Séminaire sur les pratiques durables dans l\'industrie maritime.',
      date: '2024-06-20',
      location: 'Université Laval',
      status: 'completed',
      attended: true,
      rating: 4
    },
    {
      id: 'p2',
      title: 'Workshop Leadership Maritime',
      description: 'Atelier de développement des compétences en leadership.',
      date: '2024-05-15',
      location: 'Centre-ville de Montréal',
      status: 'completed',
      attended: true,
      rating: 5
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les événements', count: allEvents.length },
    { id: 'formation', name: 'Formations', count: allEvents.filter(e => e.category === 'formation').length },
    { id: 'networking', name: 'Réseautage', count: allEvents.filter(e => e.category === 'networking').length },
    { id: 'conference', name: 'Conférences', count: allEvents.filter(e => e.category === 'conference').length },
    { id: 'atelier', name: 'Ateliers', count: allEvents.filter(e => e.category === 'atelier').length },
    { id: 'forum', name: 'Forums', count: allEvents.filter(e => e.category === 'forum').length }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, featured?: boolean) => {
    switch (status) {
      case 'registered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Inscrit</Badge>;
      case 'available':
        return <Badge variant="outline" className="border-blue-300 text-blue-800">Disponible</Badge>;
      case 'full':
        return <Badge variant="destructive">Complet</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Terminé</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    const styles = {
      formation: 'bg-blue-100 text-blue-800',
      networking: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      atelier: 'bg-orange-100 text-orange-800',
      forum: 'bg-cyan-100 text-cyan-800'
    };
    
    return (
      <Badge className={`${styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-800'} hover:bg-opacity-80`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  const handleRegister = (eventId: string) => {
    // Simulation d'inscription
    toast.success('Inscription confirmée', {
      description: 'Vous avez été inscrit à cet événement. Un courriel de confirmation vous a été envoyé.'
    });
  };

  const handleUnregister = (eventId: string) => {
    toast.success('Désinscription confirmée', {
      description: 'Vous avez été retiré de la liste des participants.'
    });
  };

  const handleEventClick = (eventId: string) => {
    if (onEventClick) {
      onEventClick(eventId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header avec recherche et filtres */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des événements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <Button variant="outline" className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-[#000033] text-white'
                  : 'bg-white border border-gray-300 text-[#43464b] hover:bg-gray-50'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Événements à venir</TabsTrigger>
          <TabsTrigger value="registered">Mes inscriptions</TabsTrigger>
          <TabsTrigger value="past">Événements passés</TabsTrigger>
        </TabsList>

        {/* Événements à venir */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer ${event.featured ? 'ring-2 ring-[#000033]/10' : ''}`}>
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#000033] text-white hover:bg-[#000033]/90">
                      <Star className="h-3 w-3 mr-1" />
                      À la une
                    </Badge>
                  </div>
                )}
                
                <div onClick={() => handleEventClick(event.id)}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryBadge(event.category)}
                          {getStatusBadge(event.status, event.featured)}
                        </div>
                        <CardTitle className="text-lg text-[#000033] mb-2 leading-tight hover:text-[#000033]/80 transition-colors">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-[#43464b] line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#000033]">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#43464b]">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString('fr-CA', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#43464b]">
                        <Clock className="h-4 w-4" />
                        <span>{event.time} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#43464b]">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#43464b]">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.registered}/{event.capacity} participants
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#000033] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    {event.status === 'registered' ? (
                      <>
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          disabled
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Inscrit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnregister(event.id);
                          }}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Se désinscrire
                        </Button>
                      </>
                    ) : event.registered >= event.capacity ? (
                      <Button 
                        className="flex-1"
                        disabled
                        variant="outline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Complet
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1 bg-[#000033] hover:bg-[#000033]/90 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event.id);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        S'inscrire
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {event.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#000033] mb-2">Aucun événement trouvé</h3>
              <p className="text-[#43464b]">
                {searchQuery ? 
                  'Essayez de modifier votre recherche ou vos filtres.' : 
                  'Il n\'y a actuellement aucun événement dans cette catégorie.'
                }
              </p>
            </div>
          )}
        </TabsContent>

        {/* Mes inscriptions */}
        <TabsContent value="registered" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {allEvents
              .filter(event => event.status === 'registered')
              .map((event) => (
                <Card key={event.id} className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleEventClick(event.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-[#000033] mb-2 hover:text-[#000033]/80 transition-colors">
                          {event.title}
                        </CardTitle>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-[#43464b]">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString('fr-CA', { 
                                weekday: 'long',
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#43464b]">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Inscrit</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger le billet
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnregister(event.id);
                        }}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Se désinscrire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </TabsContent>

        {/* Événements passés */}
        <TabsContent value="past" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-[#000033] mb-2">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#43464b]">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString('fr-CA')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#43464b]">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gray-100 text-gray-800 mb-2">Terminé</Badge>
                      {event.attended && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-3 w-3 ${
                                i < event.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.attended ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Certificat
                      </Button>
                      <Button size="sm" variant="outline">
                        Évaluer
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-[#43464b]">Non participé</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}