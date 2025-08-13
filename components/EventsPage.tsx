import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Clock, Users, Ticket, Loader2, Filter, Search, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { ContentPageLayout } from "./PageLayout";
import { membriApi } from "../utils/membriApi";
import { toast } from "sonner@2.0.3";
import type { BreadcrumbItem } from "../utils/form-types";

interface NavigationHandlers {
  onNavigateToWebsite: () => void;
  onNavigateToAssociation: () => void;
  onNavigateToSaintLaurent: () => void;
  onNavigateToMembers: () => void;
  onNavigateToEvents: () => void;
  onNavigateToContact: () => void;
  onNavigateToDossiers: () => void;
  onNavigateToPrivacyPolicy: () => void;
  onNavigateToTerms: () => void;
  onNavigateToSitemap: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

interface EventsPageProps {
  navigationHandlers: NavigationHandlers;
}

// Section Hero
const HeroSection = ({ totalEvents }: { totalEvents: number }) => {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=600&fit=crop&auto=format')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="max-w-4xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl font-serif leading-tight text-white mb-6 font-normal" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Événements
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Participez aux événements qui façonnent l'avenir du transport maritime. 
              Conférences, formations, networking et célébrations de notre industrie.
            </motion.p>

            <motion.div 
              className="flex items-center space-x-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{totalEvents}</div>
                <div className="text-white/80">événements programmés</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/80">participants annuels</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-white/80">mois d'activités</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Recherche et Filtres
const SearchFiltersSection = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedType, 
  setSelectedType 
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}) => {
  const eventTypes = [
    "Tous les types",
    "Conférence",
    "Formation",
    "Networking",
    "Salon",
    "Forum"
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row gap-4 items-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Barre de recherche */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Filtre par type */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48 bg-gray-50 border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type d'événement" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </section>
  );
};

// Carte d'événement
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('fr-FR', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const startDate = formatDate(event.StartTime || event.startTime);
  const endDate = formatDate(event.EndTime || event.endTime);

  const getEventTypeColor = (name: string) => {
    if (name.toLowerCase().includes('conférence')) return 'bg-blue-600';
    if (name.toLowerCase().includes('formation')) return 'bg-green-600';
    if (name.toLowerCase().includes('networking')) return 'bg-purple-600';
    if (name.toLowerCase().includes('salon')) return 'bg-orange-600';
    if (name.toLowerCase().includes('forum')) return 'bg-red-600';
    return 'bg-gray-600';
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="bg-white h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Header avec date */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold">{startDate.day}</div>
                <div className="text-sm opacity-90">{startDate.month} {startDate.year}</div>
              </div>
              <Badge className={`${getEventTypeColor(event.Name)} text-white text-xs`}>
                {event.Name.toLowerCase().includes('conférence') ? 'Conférence' :
                 event.Name.toLowerCase().includes('formation') ? 'Formation' :
                 event.Name.toLowerCase().includes('networking') ? 'Networking' :
                 event.Name.toLowerCase().includes('salon') ? 'Salon' :
                 event.Name.toLowerCase().includes('forum') ? 'Forum' : 'Événement'}
              </Badge>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {event.Name || event.name}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {event.Description || event.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {startDate.time} - {endDate.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {event.Venue || event.venue}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                {event.OpenToAll ? 'Ouvert à tous' : 'Membres uniquement'}
              </div>
            </div>

            {/* Prix */}
            {event.TicketTypes && event.TicketTypes.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Tarifs :</div>
                <div className="space-y-1">
                  {event.TicketTypes.slice(0, 2).map((ticket: any, ticketIndex: number) => (
                    <div key={ticketIndex} className="flex justify-between text-sm">
                      <span className="text-gray-600">{ticket.Name}</span>
                      <span className="font-semibold text-blue-600">
                        {ticket.MemberPrice}$ / {ticket.GuestPrice}$
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <Button size="sm" className="flex-1">
                <Ticket className="w-4 h-4 mr-2" />
                S'inscrire
              </Button>
              <Button variant="outline" size="sm">
                Détails
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Section Liste des Événements
const EventsListSection = ({ events, isLoading }: { events: any[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-900" />
            <p className="text-gray-600">Chargement des événements...</p>
          </div>
        </div>
      </section>
    );
  }

  const upcomingEvents = events.filter(event => 
    new Date(event.StartTime || event.startTime) > new Date()
  );
  
  const pastEvents = events.filter(event => 
    new Date(event.StartTime || event.startTime) <= new Date()
  );

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">
              Événements à venir ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Événements passés ({pastEvents.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.ID || event.id || index} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">Aucun événement à venir</p>
                <p className="text-gray-500">De nouveaux événements seront bientôt annoncés</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event, index) => (
                  <EventCard key={event.ID || event.id || index} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">Aucun événement passé</p>
                <p className="text-gray-500">L'historique des événements apparaîtra ici</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Section CTA
const CTASection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif leading-tight text-white mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Participez aux événements ASL
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Rejoignez notre communauté et accédez à tous nos événements exclusifs, 
            formations et opportunités de réseautage.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              onClick={onNavigateToSignup}
              className="bg-white text-blue-900 hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6 mr-3" />
              Devenir membre
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const EventsPage = ({ navigationHandlers }: EventsPageProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous les types');

  // Charger les événements
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const eventsData = await membriApi.getEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        toast.error('Une erreur s\'est produite lors du chargement des événements.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtrer les événements
  useEffect(() => {
    let filtered = events;

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(event => 
        (event.Name || event.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.Description || event.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par type
    if (selectedType && selectedType !== 'Tous les types') {
      filtered = filtered.filter(event => 
        (event.Name || event.name || '').toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedType]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Événements", current: true }
  ];

  return (
    <ContentPageLayout
      currentView="events"
      navigationHandlers={navigationHandlers}
      breadcrumbItems={breadcrumbItems}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection totalEvents={events.length} />
        <SearchFiltersSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <EventsListSection events={filteredEvents} isLoading={isLoading} />
        <CTASection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      </motion.div>
    </ContentPageLayout>
  );
};