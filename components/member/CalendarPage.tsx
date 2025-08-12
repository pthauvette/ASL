import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar as CalendarUI } from '../ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Video,
  Phone,
  Coffee,
  Briefcase,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Share2,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'event' | 'available' | 'busy' | 'personal';
  location?: string;
  isVirtual?: boolean;
  participants?: string[];
  organizerId: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  isRecurring?: boolean;
  recurrenceRule?: string;
  reminderMinutes?: number;
  visibility: 'public' | 'private' | 'connections';
}

interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  note?: string;
}

interface CalendarPageProps {
  currentUser: any;
  onViewProfile?: (userId: string) => void;
  onStartConversation?: (userId: string) => void;
}

export function CalendarPage({ currentUser, onViewProfile, onStartConversation }: CalendarPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Données démo pour les événements du calendrier
  const demoEvents: CalendarEvent[] = [
    {
      id: 'event-1',
      title: 'Conférence Maritime Annuelle 2024',
      description: 'Grande conférence annuelle des professionnels maritimes',
      startDate: '2024-08-15',
      endDate: '2024-08-15',
      startTime: '09:00',
      endTime: '17:00',
      type: 'event',
      location: 'Centre des congrès de Montréal',
      participants: ['2', '3', '4', '5'],
      organizerId: 'asl-admin',
      status: 'confirmed',
      visibility: 'public'
    },
    {
      id: 'event-2',
      title: 'Réunion projet sécurité maritime',
      description: 'Discussion sur les nouvelles mesures de sécurité',
      startDate: '2024-08-08',
      endDate: '2024-08-08',
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      isVirtual: true,
      participants: ['2', '4'],
      organizerId: currentUser.id,
      status: 'confirmed',
      visibility: 'connections',
      reminderMinutes: 15
    },
    {
      id: 'event-3',
      title: 'Formation STCW',
      description: 'Formation sur les standards internationaux de formation maritime',
      startDate: '2024-08-22',
      endDate: '2024-08-22',
      startTime: '09:00',
      endTime: '17:00',
      type: 'event',
      location: 'École maritime de Rimouski',
      participants: ['3', '6'],
      organizerId: 'formation-asl',
      status: 'confirmed',
      visibility: 'public'
    },
    {
      id: 'avail-1',
      title: 'Disponible pour consultations',
      startDate: '2024-08-12',
      endDate: '2024-08-12',
      startTime: '10:00',
      endTime: '12:00',
      type: 'available',
      organizerId: currentUser.id,
      status: 'confirmed',
      visibility: 'connections'
    },
    {
      id: 'busy-1',
      title: 'Occupé - Voyage d\'affaires',
      startDate: '2024-08-20',
      endDate: '2024-08-21',
      startTime: '00:00',
      endTime: '23:59',
      type: 'busy',
      organizerId: currentUser.id,
      status: 'confirmed',
      visibility: 'connections'
    }
  ];

  // Informations des utilisateurs
  const usersInfo = {
    '2': { name: 'Jean Leblanc', organization: 'Armateurs Associés', title: 'Capitaine' },
    '3': { name: 'Sophie Martin', organization: 'Transport Maritime QC', title: 'Officière de pont' },
    '4': { name: 'Pierre Dubois', organization: 'ASL Sécurité', title: 'Inspecteur maritime' },
    '5': { name: 'Isabelle Roy', organization: 'Innovations Maritimes Inc.', title: 'Directrice R&D' },
    '6': { name: 'Michel Gagnon', organization: 'Chantier Naval Gagnon', title: 'Propriétaire' }
  };

  useEffect(() => {
    // Simulation de chargement des événements
    setEvents(demoEvents);
    console.log('📅 Événements du calendrier chargés');
  }, []);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'event':
        return <CalendarIcon className="h-4 w-4" />;
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'busy':
        return <AlertCircle className="h-4 w-4" />;
      case 'personal':
        return <Coffee className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    const styles = {
      meeting: 'bg-blue-100 text-blue-800',
      event: 'bg-purple-100 text-purple-800',
      available: 'bg-green-100 text-green-800',
      busy: 'bg-red-100 text-red-800',
      personal: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      meeting: 'Réunion',
      event: 'Événement',
      available: 'Disponible',
      busy: 'Occupé',
      personal: 'Personnel'
    };
    
    return (
      <Badge className={`${styles[type as keyof typeof styles]} hover:bg-opacity-80`}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => 
      event.startDate <= dateString && event.endDate >= dateString
    );
  };

  const getFilteredEvents = () => {
    if (filterType === 'all') return events;
    return events.filter(event => event.type === filterType);
  };

  const handleCreateEvent = () => {
    setShowCreateDialog(true);
  };

  const handleSetAvailability = () => {
    setShowAvailabilityDialog(true);
  };

  const formatEventTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const renderDayEvents = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    
    return (
      <div className="space-y-2">
        {dayEvents.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${
              event.type === 'available' ? 'bg-green-100 text-green-800' :
              event.type === 'busy' ? 'bg-red-100 text-red-800' :
              event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
              event.type === 'event' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setSelectedEventId(event.id)}
          >
            <div className="font-medium truncate">{event.title}</div>
            <div className="opacity-75">{formatEventTime(event.startTime, event.endTime)}</div>
          </div>
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-[#43464b] text-center">
            +{dayEvents.length - 3} autres
          </div>
        )}
      </div>
    );
  };

  const renderEventDetails = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return null;

    return (
      <Dialog open={!!selectedEventId} onOpenChange={() => setSelectedEventId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getEventTypeIcon(event.type)}
              {event.title}
            </DialogTitle>
            <DialogDescription>
              Détails de l'événement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getEventTypeBadge(event.type)}
              {event.status === 'confirmed' && (
                <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
              )}
              {event.isVirtual && (
                <Badge className="bg-blue-100 text-blue-800">
                  <Video className="h-3 w-3 mr-1" />
                  Virtuel
                </Badge>
              )}
            </div>

            {event.description && (
              <div>
                <h4 className="font-medium text-[#000033] mb-2">Description</h4>
                <p className="text-[#43464b]">{event.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-[#000033] mb-2">Date et heure</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-[#43464b]" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('fr-CA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#43464b]" />
                    <span>{formatEventTime(event.startTime, event.endTime)}</span>
                  </div>
                </div>
              </div>

              {event.location && (
                <div>
                  <h4 className="font-medium text-[#000033] mb-2">Lieu</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#43464b]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              )}
            </div>

            {event.participants && event.participants.length > 0 && (
              <div>
                <h4 className="font-medium text-[#000033] mb-2">Participants</h4>
                <div className="space-y-2">
                  {event.participants.map((participantId) => {
                    const userInfo = usersInfo[participantId as keyof typeof usersInfo];
                    if (!userInfo) return null;

                    return (
                      <div key={participantId} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#000033]/10 text-[#000033] text-xs">
                            {userInfo.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-[#000033]">{userInfo.name}</p>
                          <p className="text-xs text-[#43464b]">{userInfo.title} • {userInfo.organization}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              {event.organizerId === currentUser.id && (
                <>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              {event.isVirtual && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Rejoindre
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000033]">Mon calendrier</h2>
          <p className="text-[#43464b] mt-1">Gérez vos événements et disponibilités</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSetAvailability} variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Définir disponibilités
          </Button>
          <Button onClick={handleCreateEvent} className="bg-[#000033] hover:bg-[#000033]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>

      {/* Filtres et options d'affichage */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {['month', 'week', 'day'].map((mode) => (
              <Button
                key={mode}
                size="sm"
                variant={viewMode === mode ? 'default' : 'ghost'}
                onClick={() => setViewMode(mode as any)}
                className={viewMode === mode ? 'bg-white shadow-sm' : ''}
              >
                {mode === 'month' ? 'Mois' : mode === 'week' ? 'Semaine' : 'Jour'}
              </Button>
            ))}
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les événements</SelectItem>
              <SelectItem value="meeting">Réunions</SelectItem>
              <SelectItem value="event">Événements</SelectItem>
              <SelectItem value="available">Disponibilités</SelectItem>
              <SelectItem value="busy">Occupé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Rappels
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendrier principal */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {currentMonth.toLocaleDateString('fr-CA', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMonth(new Date())}
                  >
                    Aujourd'hui
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarUI
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="w-full"
                components={{
                  DayContent: ({ date }) => (
                    <div className="w-full h-24 p-1">
                      <div className="font-medium text-sm mb-1">
                        {date.getDate()}
                      </div>
                      {renderDayEvents(date)}
                    </div>
                  )
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec événements du jour */}
        <div className="space-y-6">
          {/* Événements du jour sélectionné */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate.toLocaleDateString('fr-CA', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const dayEvents = getEventsForDate(selectedDate);
                
                if (dayEvents.length === 0) {
                  return (
                    <div className="text-center py-6">
                      <CalendarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-[#43464b]">Aucun événement</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedEventId(event.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-[#000033] text-sm">{event.title}</h4>
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#43464b] mb-2">
                          <Clock className="h-3 w-3" />
                          <span>{formatEventTime(event.startTime, event.endTime)}</span>
                        </div>
                        {getEventTypeBadge(event.type)}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Prochains événements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochains événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.startDate) > new Date())
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <h4 className="font-medium text-[#000033] text-sm mb-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#43464b]">
                        <CalendarIcon className="h-3 w-3" />
                        <span>
                          {new Date(event.startDate).toLocaleDateString('fr-CA', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleCreateEvent}
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer un événement
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSetAvailability}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marquer comme disponible
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Marquer comme occupé
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog pour les détails de l'événement */}
      {selectedEventId && renderEventDetails(selectedEventId)}

      {/* Dialog pour créer un événement */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un nouvel événement</DialogTitle>
            <DialogDescription>
              Planifiez une réunion, un événement ou marquez votre disponibilité
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#43464b] mb-2 block">
                Titre de l'événement
              </label>
              <Input placeholder="Ex: Réunion équipe projet..." />
            </div>

            <div>
              <label className="text-sm font-medium text-[#43464b] mb-2 block">
                Type d'événement
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Réunion</SelectItem>
                  <SelectItem value="event">Événement</SelectItem>
                  <SelectItem value="available">Disponibilité</SelectItem>
                  <SelectItem value="busy">Occupé</SelectItem>
                  <SelectItem value="personal">Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Date de début
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Heure de début
                </label>
                <Input type="time" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Date de fin
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Heure de fin
                </label>
                <Input type="time" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#43464b] mb-2 block">
                Description (optionnel)
              </label>
              <Textarea placeholder="Détails de l'événement..." />
            </div>

            <div>
              <label className="text-sm font-medium text-[#43464b] mb-2 block">
                Lieu (optionnel)
              </label>
              <Input placeholder="Adresse ou lien de visioconférence" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1 bg-[#000033] hover:bg-[#000033]/90 text-white">
                Créer l'événement
              </Button>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}