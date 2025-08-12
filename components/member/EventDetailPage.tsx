import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Share2,
  Download,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  Mail,
  Phone,
  ExternalLink,
  Plus,
  Minus,
  Heart,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(1);

  // Simulation de données d'événement détaillées
  const event = {
    id: eventId,
    title: 'Formation Sécurité Maritime',
    subtitle: 'Certification avancée selon les normes internationales',
    description: 'Cette formation complète sur les protocoles de sécurité en milieu maritime vous permettra d\'acquérir toutes les compétences nécessaires pour assurer la sécurité des opérations maritimes selon les dernières normes internationales. La formation couvre les aspects théoriques et pratiques avec des exercices simulés.',
    longDescription: `
Cette formation intensive de sécurité maritime est conçue pour les professionnels souhaitant maîtriser les protocoles de sécurité les plus récents. Le programme couvre :

• Réglementations internationales SOLAS, MARPOL et STCW
• Procédures d'urgence et plans d'évacuation
• Gestion des risques en environnement maritime
• Utilisation des équipements de sécurité modernes
• Communication de crise et coordination des secours
• Études de cas réels et exercices pratiques

La formation alterne entre sessions théoriques en salle et exercices pratiques sur simulateur. Les participants recevront une certification reconnue internationalement.
    `,
    date: '2024-08-22',
    time: '09:00',
    endTime: '17:00',
    location: 'Port de Montréal',
    address: '2100 Avenue Pierre-Dupuy, Montréal, QC H3C 4J9',
    category: 'formation',
    capacity: 50,
    registered: 32,
    price: 0,
    status: 'available',
    featured: true,
    organizer: {
      name: 'ASL Formation',
      contact: 'formation@asl.quebec',
      phone: '(514) 555-0123'
    },
    instructor: {
      name: 'Capitaine Jacques Dubois',
      title: 'Expert en sécurité maritime',
      bio: 'Plus de 20 ans d\'expérience dans la marine marchande et la formation en sécurité maritime.',
      image: null
    },
    tags: ['sécurité', 'maritime', 'certification'],
    requirements: [
      'Expérience minimale de 2 ans en milieu maritime',
      'Certification de base en premiers secours',
      'Maîtrise du français ou de l\'anglais'
    ],
    agenda: [
      { time: '09:00-09:30', title: 'Accueil et présentation' },
      { time: '09:30-10:30', title: 'Réglementations internationales' },
      { time: '10:45-12:00', title: 'Procédures d\'urgence' },
      { time: '13:00-14:30', title: 'Gestion des risques' },
      { time: '14:45-16:00', title: 'Exercices pratiques' },
      { time: '16:00-17:00', title: 'Évaluation et certification' }
    ],
    materials: [
      { type: 'document', name: 'Manuel de sécurité maritime 2024', size: '2.4 MB' },
      { type: 'video', name: 'Vidéo de préparation', duration: '15 min' },
      { type: 'document', name: 'Checklist de sécurité', size: '450 KB' }
    ],
    participants: [
      { name: 'Marie Tremblay', organization: 'Port de Québec', role: 'Superviseure' },
      { name: 'Jean Leblanc', organization: 'Armateurs Associés', role: 'Capitaine' },
      { name: 'Sophie Martin', organization: 'Transport Maritime QC', role: 'Officière' },
      { name: 'Pierre Dubois', organization: 'ASL Sécurité', role: 'Inspecteur' }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Inscrit</Badge>;
      case 'available':
        return <Badge variant="outline" className="border-blue-300 text-blue-800">Places disponibles</Badge>;
      case 'full':
        return <Badge variant="destructive">Complet</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
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

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleRegister = () => {
    setIsRegistered(true);
    toast.success('Inscription confirmée', {
      description: `Vous êtes maintenant inscrit à ${event.title}. Un courriel de confirmation vous a été envoyé.`
    });
  };

  const handleUnregister = () => {
    setIsRegistered(false);
    toast.success('Désinscription confirmée', {
      description: 'Vous avez été retiré de la liste des participants.'
    });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(
      isFavorited ? 'Retiré des favoris' : 'Ajouté aux favoris',
      {
        description: isFavorited 
          ? 'L\'événement a été retiré de vos favoris.'
          : 'L\'événement a été ajouté à vos favoris.'
      }
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Lien copié', {
      description: 'Le lien de l\'événement a été copié dans le presse-papiers.'
    });
  };

  const handleDownloadMaterial = (material: any) => {
    toast.success('Téléchargement démarré', {
      description: `${material.name} est en cours de téléchargement.`
    });
  };

  const progressPercentage = (event.registered / event.capacity) * 100;
  const availableSpots = event.capacity - event.registered;

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
          Retour aux événements
        </Button>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleFavorite}
            className={`border-[#000033]/20 transition-all duration-200 ${
              isFavorited 
                ? 'bg-red-50 text-red-600 border-red-300' 
                : 'text-[#000033] hover:bg-[#000033]/5'
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? 'Favoris' : 'Ajouter aux favoris'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      {/* Header de l'événement */}
      <div className="bg-gradient-to-r from-[#000033] to-[#000033]/90 text-white rounded-lg p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {getCategoryBadge(event.category)}
              {getStatusBadge(event.status)}
              {event.featured && (
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-500/90">
                  <Star className="h-3 w-3 mr-1" />
                  À la une
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-white/80 text-lg mb-4">{event.subtitle}</p>
            <p className="text-white/70 leading-relaxed">{event.description}</p>
            
            {/* Informations clés */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/60" />
                <div>
                  <div className="font-medium">
                    {new Date(event.date).toLocaleDateString('fr-CA', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-white/70 text-sm">{event.time} - {event.endTime}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/60" />
                <div>
                  <div className="font-medium">{event.location}</div>
                  <div className="text-white/70 text-sm">{event.address}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-white/60" />
                <div>
                  <div className="font-medium">{event.registered}/{event.capacity} participants</div>
                  <div className="text-white/70 text-sm">{availableSpots} places restantes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description détaillée */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Description détaillée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {event.longDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0 text-[#43464b] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programme de la journée */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Programme de la journée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg border bg-[#f8f9fa]">
                    <div className="text-sm font-medium text-[#000033] min-w-[100px]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000033]">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formateur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Formateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={event.instructor.image} />
                  <AvatarFallback className="bg-[#000033] text-white text-lg">
                    {event.instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-[#000033] text-lg">{event.instructor.name}</h4>
                  <p className="text-[#43464b] mb-2">{event.instructor.title}</p>
                  <p className="text-sm text-[#43464b] leading-relaxed">{event.instructor.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matériel fourni */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Matériel de formation
              </CardTitle>
              <CardDescription>
                Documents et ressources fournis avec la formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-[#f8f9fa]">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-[#000033]/10 flex items-center justify-center">
                        {getMaterialIcon(material.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#000033]">{material.name}</h4>
                        <p className="text-xs text-[#43464b]">
                          {material.size || material.duration}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadMaterial(material)}
                      className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Inscription */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Inscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Jauge d'inscription */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#43464b]">Participants inscrits</span>
                  <span className="font-medium text-[#000033]">{event.registered}/{event.capacity}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-[#43464b] mt-1">
                  {availableSpots} places restantes
                </p>
              </div>

              {/* Sélection du nombre de participants */}
              {!isRegistered && (
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Nombre de participants
                  </label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                      disabled={attendeeCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 bg-[#f3f3f5] rounded text-center min-w-[60px]">
                      {attendeeCount}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAttendeeCount(Math.min(availableSpots, attendeeCount + 1))}
                      disabled={attendeeCount >= availableSpots}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Prix */}
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-800">Prix total</span>
                  <span className="text-lg font-bold text-green-800">
                    {event.price === 0 ? 'Gratuit' : `${event.price * attendeeCount}$`}
                  </span>
                </div>
                {event.price === 0 && (
                  <p className="text-xs text-green-700 mt-1">
                    Formation offerte aux membres ASL
                  </p>
                )}
              </div>

              {/* Boutons d'action */}
              {isRegistered ? (
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Inscrit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    onClick={handleUnregister}
                  >
                    Se désinscrire
                  </Button>
                </div>
              ) : event.registered >= event.capacity ? (
                <Button 
                  className="w-full"
                  disabled
                  variant="outline"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Complet
                </Button>
              ) : (
                <Button 
                  className="w-full bg-[#000033] hover:bg-[#000033]/90 text-white"
                  onClick={handleRegister}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  S'inscrire maintenant
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Prérequis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prérequis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-[#43464b]">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Organisateur */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Organisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <h4 className="font-medium text-[#000033]">{event.organizer.name}</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#43464b]" />
                  <a 
                    href={`mailto:${event.organizer.contact}`}
                    className="text-[#000033] hover:underline"
                  >
                    {event.organizer.contact}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#43464b]" />
                  <span className="text-[#43464b]">{event.organizer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants récents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.participants.slice(0, 4).map((participant, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#000033]/10 text-[#000033] text-xs">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#000033] truncate">
                        {participant.name}
                      </p>
                      <p className="text-xs text-[#43464b] truncate">
                        {participant.role} • {participant.organization}
                      </p>
                    </div>
                  </div>
                ))}
                
                {event.participants.length > 4 && (
                  <p className="text-xs text-[#43464b] text-center pt-2">
                    +{event.participants.length - 4} autres participants
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}