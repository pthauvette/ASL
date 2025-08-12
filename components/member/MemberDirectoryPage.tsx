import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search,
  Filter,
  MapPin,
  Globe,
  Mail,
  Phone,
  Building,
  Users,
  Star,
  ExternalLink,
  Grid3X3,
  List,
  Download,
  Share2,
  Eye,
  MessageSquare,
  UserPlus,
  Briefcase,
  Calendar,
  Award,
  SortAsc,
  SortDesc,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import { membriApi } from '../../utils/membriApi';

interface Member {
  id: string;
  name: string;
  organization: string;
  title: string;
  department?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  description?: string;
  membershipType: string;
  memberSince: string;
  avatar?: string;
  verified: boolean;
  featured: boolean;
  sectors: string[];
  services: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  stats?: {
    connections: number;
    events: number;
    publications: number;
  };
  lastActivity?: string;
  isOnline?: boolean;
}

interface MemberDirectoryPageProps {
  onViewProfile?: (memberId: string) => void;
  onStartConversation?: (memberId: string) => void;
}

export function MemberDirectoryPage({ onViewProfile, onStartConversation }: MemberDirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedMembershipType, setSelectedMembershipType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'popular'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [favoriteMembers, setFavoriteMembers] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('all');

  // Données démo enrichies pour le répertoire
  const demoMembers: Member[] = [
    {
      id: '1',
      name: 'Marie Tremblay',
      organization: 'Port de Québec',
      title: 'Directrice des opérations',
      department: 'Opérations portuaires',
      email: 'marie.tremblay@portquebec.ca',
      phone: '(418) 555-0123',
      website: 'https://portquebec.ca',
      address: '150 Rue Dalhousie',
      city: 'Québec',
      province: 'Québec',
      description: 'Spécialisée en gestion portuaire et logistique maritime avec plus de 15 ans d\'expérience dans l\'optimisation des flux portuaires.',
      membershipType: 'Actif',
      memberSince: '2019-03-15',
      verified: true,
      featured: true,
      sectors: ['Transport maritime', 'Logistique portuaire'],
      services: ['Gestion portuaire', 'Consultation logistique', 'Optimisation des flux'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/marie-tremblay',
        twitter: 'https://twitter.com/mtremblay'
      },
      stats: {
        connections: 45,
        events: 12,
        publications: 3
      },
      lastActivity: '2024-08-07T10:30:00Z',
      isOnline: true
    },
    {
      id: '2',
      name: 'Jean Leblanc',
      organization: 'Armateurs Associés',
      title: 'Capitaine',
      department: 'Navigation',
      email: 'j.leblanc@armateurs.ca',
      phone: '(514) 555-0156',
      website: 'https://armateurs-associes.ca',
      address: '2100 Avenue Pierre-Dupuy',
      city: 'Montréal',
      province: 'Québec',
      description: 'Capitaine certifié avec expertise en navigation hauturière et sécurité maritime, plus de 20 ans d\'expérience en mer.',
      membershipType: 'Actif',
      memberSince: '2020-07-22',
      verified: true,
      featured: false,
      sectors: ['Navigation', 'Sécurité maritime'],
      services: ['Navigation commerciale', 'Formation maritime', 'Consultation sécurité'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/jean-leblanc'
      },
      stats: {
        connections: 32,
        events: 8,
        publications: 1
      },
      lastActivity: '2024-08-07T09:15:00Z',
      isOnline: false
    },
    {
      id: '3',
      name: 'Sophie Martin',
      organization: 'Transport Maritime QC',
      title: 'Officière de pont',
      department: 'Opérations',
      email: 'sophie.martin@tmqc.ca',
      phone: '(418) 555-0189',
      address: '1000 Rue des Navigateurs',
      city: 'Rimouski',
      province: 'Québec',
      description: 'Officière certifiée spécialisée en transport de marchandises et cabotage côtier. Expert en réglementations maritimes.',
      membershipType: 'Associé',
      memberSince: '2021-11-10',
      verified: true,
      featured: false,
      sectors: ['Transport maritime', 'Cabotage'],
      services: ['Transport de marchandises', 'Inspection navire', 'Gestion équipage'],
      stats: {
        connections: 28,
        events: 15,
        publications: 0
      },
      lastActivity: '2024-08-06T14:20:00Z',
      isOnline: true
    },
    {
      id: '4',
      name: 'Pierre Dubois',
      organization: 'ASL Sécurité',
      title: 'Inspecteur maritime',
      department: 'Sécurité et conformité',
      email: 'p.dubois@aslsecurity.ca',
      phone: '(514) 555-0167',
      website: 'https://aslsecurity.ca',
      address: '500 Rue Saint-Paul',
      city: 'Montréal',
      province: 'Québec',
      description: 'Expert en sécurité maritime et conformité réglementaire internationale. Inspecteur certifié ISO et formateur agréé.',
      membershipType: 'Grand partenaire',
      memberSince: '2018-05-03',
      verified: true,
      featured: true,
      sectors: ['Sécurité maritime', 'Réglementation'],
      services: ['Inspection sécurité', 'Audit conformité', 'Formation sécurité', 'Consultation réglementaire'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/pierre-dubois',
        twitter: 'https://twitter.com/pdubois_maritime'
      },
      stats: {
        connections: 67,
        events: 20,
        publications: 8
      },
      lastActivity: '2024-08-07T08:45:00Z',
      isOnline: false
    },
    {
      id: '5',
      name: 'Isabelle Roy',
      organization: 'Innovations Maritimes Inc.',
      title: 'Directrice R&D',
      department: 'Recherche et développement',
      email: 'i.roy@innovations-maritimes.ca',
      phone: '(450) 555-0198',
      website: 'https://innovations-maritimes.ca',
      address: '75 Boulevard Technologique',
      city: 'Longueuil',
      province: 'Québec',
      description: 'Pionnière en technologies maritimes vertes et solutions d\'automatisation portuaire. Docteure en ingénierie maritime.',
      membershipType: 'Associé',
      memberSince: '2022-01-18',
      verified: true,
      featured: true,
      sectors: ['Innovation', 'Technologies vertes', 'Automatisation'],
      services: ['R&D maritime', 'Consultation technologique', 'Prototypage', 'Solutions IoT'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/isabelle-roy-maritime'
      },
      stats: {
        connections: 41,
        events: 6,
        publications: 12
      },
      lastActivity: '2024-08-05T16:30:00Z',
      isOnline: true
    },
    {
      id: '6',
      name: 'Michel Gagnon',
      organization: 'Chantier Naval Gagnon',
      title: 'Propriétaire',
      department: 'Direction générale',
      email: 'm.gagnon@chantier-gagnon.ca',
      phone: '(418) 555-0145',
      website: 'https://chantier-gagnon.ca',
      address: '200 Rue du Chantier',
      city: 'Lévis',
      province: 'Québec',
      description: 'Constructeur naval traditionnel spécialisé en réparation et maintenance de navires commerciaux. Entreprise familiale depuis 3 générations.',
      membershipType: 'Actif',
      memberSince: '2017-09-12',
      verified: true,
      featured: false,
      sectors: ['Construction navale', 'Réparation navale'],
      services: ['Construction navire', 'Réparation', 'Maintenance', 'Modernisation'],
      stats: {
        connections: 38,
        events: 9,
        publications: 2
      },
      lastActivity: '2024-08-04T11:20:00Z',
      isOnline: false
    },
    {
      id: '7',
      name: 'Caroline Boucher',
      organization: 'Services Logistiques Maritimes',
      title: 'Gestionnaire logistique',
      department: 'Logistique',
      email: 'c.boucher@slm.ca',
      phone: '(514) 555-0134',
      address: '345 Rue des Docks',
      city: 'Montréal',
      province: 'Québec',
      description: 'Spécialiste en optimisation des chaînes d\'approvisionnement maritime et gestion des flux portuaires. Expert en digitalisation logistique.',
      membershipType: 'Associé',
      memberSince: '2020-04-08',
      verified: true,
      featured: false,
      sectors: ['Logistique portuaire', 'Supply Chain'],
      services: ['Gestion logistique', 'Optimisation flux', 'Planification transport'],
      stats: {
        connections: 33,
        events: 11,
        publications: 4
      },
      lastActivity: '2024-08-06T09:45:00Z',
      isOnline: true
    },
    {
      id: '8',
      name: 'Robert Lavoie',
      organization: 'Formation Maritime Québec',
      title: 'Directeur de formation',
      department: 'Formation et certification',
      email: 'r.lavoie@fmq.ca',
      phone: '(418) 555-0176',
      website: 'https://formation-maritime.qc.ca',
      address: '88 Rue des Marins',
      city: 'Québec',
      province: 'Québec',
      description: 'Expert en formation maritime et certification professionnelle. Formateur agréé STCW avec 25 ans d\'expérience pédagogique.',
      membershipType: 'Associé',
      memberSince: '2019-09-15',
      verified: true,
      featured: false,
      sectors: ['Formation maritime', 'Certification'],
      services: ['Formation STCW', 'Certification', 'Simulation maritime', 'Cours en ligne'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/robert-lavoie-maritime'
      },
      stats: {
        connections: 52,
        events: 18,
        publications: 6
      },
      lastActivity: '2024-08-05T13:10:00Z',
      isOnline: false
    }
  ];

  // Listes pour les filtres
  const sectors = [
    'Transport maritime',
    'Navigation',
    'Sécurité maritime',
    'Logistique portuaire',
    'Construction navale',
    'Innovation',
    'Technologies vertes',
    'Réglementation',
    'Cabotage',
    'Réparation navale',
    'Formation maritime',
    'Certification',
    'Supply Chain',
    'Automatisation'
  ];

  const membershipTypes = ['Actif', 'Associé', 'Grand partenaire'];
  const cities = ['Montréal', 'Québec', 'Rimouski', 'Longueuil', 'Lévis'];

  // Chargement initial des données
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      try {
        // Test de connexion pour s'assurer que l'API est prête
        await membriApi.testConnection();
        
        // Tentative de récupération depuis l'API Membri 365
        const apiMembers = await membriApi.fetchMembers();
        
        if (apiMembers && Array.isArray(apiMembers) && apiMembers.length > 0) {
          // Normaliser les données de l'API pour correspondre à notre interface
          const normalizedMembers = apiMembers.map(member => ({
            id: member.id || member.ID || '',
            name: member.name || member.Name || `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Nom non disponible',
            organization: member.organization || member.Organization || member.accountName || member.AccountName || 'Organisation non spécifiée',
            title: member.title || member.Title || 'Titre non spécifié',
            department: member.department || member.Department || '',
            email: member.email || member.Email || '',
            phone: member.phone || member.Phone || '',
            website: member.website || member.Website || '',
            address: member.address || member.Address || '',
            city: member.city || member.City?.Name || member.City || '',
            province: member.province || member.Province || 'Québec',
            description: member.description || member.Description || '',
            membershipType: member.membershipType || member.MembershipType || 'Associé',
            memberSince: member.memberSince || member.MemberSince || new Date().toISOString(),
            avatar: member.avatar || member.Avatar || '',
            verified: member.verified !== undefined ? member.verified : true,
            featured: member.featured !== undefined ? member.featured : false,
            sectors: Array.isArray(member.sectors) ? member.sectors : Array.isArray(member.Sectors) ? member.Sectors : [],
            services: Array.isArray(member.services) ? member.services : Array.isArray(member.Services) ? member.Services : [],
            socialMedia: member.socialMedia || member.SocialMedia || {},
            stats: member.stats || {
              connections: Math.floor(Math.random() * 50) + 10,
              events: Math.floor(Math.random() * 20) + 1,
              publications: Math.floor(Math.random() * 10)
            },
            lastActivity: member.lastActivity || new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            isOnline: member.isOnline !== undefined ? member.isOnline : Math.random() > 0.7
          }));
          
          setMembers(normalizedMembers);
          console.log('✅ Membres chargés depuis Membri 365:', normalizedMembers.length);
        } else {
          // Utiliser les données démo
          setMembers(demoMembers);
          console.log('📋 Utilisation des données démo membres:', demoMembers.length);
        }
      } catch (error) {
        console.warn('⚠️ Erreur chargement membres API, utilisation données démo:', error);
        // Assurer que demoMembers est toujours un tableau
        setMembers(Array.isArray(demoMembers) ? demoMembers : []);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Filtrage et tri des membres
  useEffect(() => {
    // Assurer que members est un tableau
    const membersList = Array.isArray(members) ? members : [];
    
    let filtered = membersList.filter(member => {
      // Sécuriser toutes les propriétés
      if (!member || typeof member !== 'object') return false;
      
      const searchLower = searchQuery.toLowerCase();
      const memberName = member.name || '';
      const memberOrg = member.organization || '';
      const memberTitle = member.title || '';
      const memberSectors = Array.isArray(member.sectors) ? member.sectors : [];
      const memberServices = Array.isArray(member.services) ? member.services : [];
      
      const matchesSearch = !searchQuery || (
        memberName.toLowerCase().includes(searchLower) ||
        memberOrg.toLowerCase().includes(searchLower) ||
        memberTitle.toLowerCase().includes(searchLower) ||
        memberSectors.some(sector => (sector || '').toLowerCase().includes(searchLower)) ||
        memberServices.some(service => (service || '').toLowerCase().includes(searchLower))
      );

      const matchesSector = selectedSector === 'all' || 
        memberSectors.some(sector => sector === selectedSector);

      const matchesMembershipType = selectedMembershipType === 'all' || 
        member.membershipType === selectedMembershipType;

      const matchesCity = selectedCity === 'all' || member.city === selectedCity;

      const matchesTab = activeTab === 'all' || 
        (activeTab === 'featured' && member.featured) ||
        (activeTab === 'online' && member.isOnline) ||
        (activeTab === 'favorites' && favoriteMembers.has(member.id || ''));

      return matchesSearch && matchesSector && matchesMembershipType && matchesCity && matchesTab;
    });

    // Tri des résultats
    filtered.sort((a, b) => {
      // Sécuriser les accès aux propriétés
      if (!a || !b) return 0;
      
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = (a.name || '').localeCompare(b.name || '');
          break;
        case 'recent':
          const aDate = new Date(a.lastActivity || a.memberSince || '').getTime();
          const bDate = new Date(b.lastActivity || b.memberSince || '').getTime();
          comparison = bDate - aDate;
          break;
        case 'popular':
          comparison = ((b.stats?.connections) || 0) - ((a.stats?.connections) || 0);
          break;
      }

      // Appliquer l'ordre de tri
      if (sortOrder === 'desc') {
        comparison = -comparison;
      }

      // Toujours mettre les membres featured en premier si pas de tri spécifique
      if (sortBy === 'name') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }

      return comparison;
    });

    setFilteredMembers(filtered);
  }, [members, searchQuery, selectedSector, selectedMembershipType, selectedCity, sortBy, sortOrder, activeTab, favoriteMembers]);

  const toggleFavorite = (memberId: string) => {
    setFavoriteMembers(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(memberId)) {
        newFavorites.delete(memberId);
        toast.success('Membre retiré des favoris');
      } else {
        newFavorites.add(memberId);
        toast.success('Membre ajouté aux favoris');
      }
      return newFavorites;
    });
  };

  const getMembershipBadge = (type: string) => {
    const styles = {
      'Actif': 'bg-blue-100 text-blue-800 border-blue-200',
      'Associé': 'bg-green-100 text-green-800 border-green-200',
      'Grand partenaire': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    return (
      <Badge className={`${styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800'} hover:bg-opacity-80 border`}>
        {type}
      </Badge>
    );
  };

  const handleConnect = (member: Member) => {
    toast.success('Demande de connexion envoyée', {
      description: `Une demande de connexion a été envoyée à ${member.name}.`
    });
  };

  const handleMessage = (member: Member) => {
    if (onStartConversation) {
      onStartConversation(member.id);
    } else {
      toast.info('Messagerie en développement', {
        description: 'La fonctionnalité de messagerie sera bientôt disponible.'
      });
    }
  };

  const handleExportDirectory = () => {
    toast.success('Export en cours', {
      description: 'Le répertoire des membres est en cours d\'export au format CSV.'
    });
  };

  const formatLastActivity = (lastActivity?: string) => {
    if (!lastActivity) return 'Inconnue';
    
    const now = new Date();
    const activityDate = new Date(lastActivity);
    const diffInHours = (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${Math.floor(diffInHours)}h`;
    if (diffInHours < 168) return `Il y a ${Math.floor(diffInHours / 24)}j`;
    
    return activityDate.toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' });
  };

  const renderMemberCard = (member: Member) => {
    // Sécuriser l'accès aux propriétés du membre
    if (!member || typeof member !== 'object') return null;
    
    return (
    <Card key={member.id || 'unknown'} className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg group ${member.featured ? 'ring-2 ring-[#000033]/10' : ''}`}>
      {member.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#000033] text-white hover:bg-[#000033]/90">
            <Star className="h-3 w-3 mr-1" />
            Vedette
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-[#000033] text-white text-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {member.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg text-[#000033] leading-tight truncate">
                {member.name}
              </CardTitle>
              {member.verified && (
                <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-3 w-3 text-white" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(member.id)}
                className="h-8 w-8 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {favoriteMembers.has(member.id) ? (
                  <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <p className="text-[#43464b] font-medium mb-1 truncate">{member.title}</p>
            <p className="text-[#43464b] text-sm mb-2 truncate">{member.organization}</p>
            
            <div className="flex items-center gap-2 mb-3">
              {getMembershipBadge(member.membershipType)}
              {member.city && (
                <div className="flex items-center gap-1 text-xs text-[#43464b]">
                  <MapPin className="h-3 w-3" />
                  <span>{member.city}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {member.description && (
          <CardDescription className="text-sm text-[#43464b] line-clamp-2 mt-2">
            {member.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Secteurs et services */}
        <div className="space-y-3 mb-4">
          {Array.isArray(member.sectors) && member.sectors.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-[#43464b] mb-1">Secteurs</h4>
              <div className="flex flex-wrap gap-1">
                {member.sectors.slice(0, 2).map((sector, index) => (
                  <span 
                    key={`sector-${index}-${sector}`}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200"
                  >
                    {sector || 'Secteur non spécifié'}
                  </span>
                ))}
                {member.sectors.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{member.sectors.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {Array.isArray(member.services) && member.services.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-[#43464b] mb-1">Services</h4>
              <div className="flex flex-wrap gap-1">
                {member.services.slice(0, 2).map((service, index) => (
                  <span 
                    key={`service-${index}-${service}`}
                    className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200"
                  >
                    {service || 'Service non spécifié'}
                  </span>
                ))}
                {member.services.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{member.services.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Statistiques */}
        {member.stats && (
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-[#f8f9fa] rounded-lg">
            <div className="text-center">
              <div className="font-medium text-[#000033]">{member.stats.connections}</div>
              <div className="text-xs text-[#43464b]">Connexions</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-[#000033]">{member.stats.events}</div>
              <div className="text-xs text-[#43464b]">Événements</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-[#000033]">{member.stats.publications}</div>
              <div className="text-xs text-[#43464b]">Publications</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mb-4">
          <Button 
            size="sm" 
            className="flex-1 bg-[#000033] hover:bg-[#000033]/90 text-white"
            onClick={() => handleConnect(member)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Connecter
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleMessage(member)}
            className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewProfile?.(member.id)}
            className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact info et activité */}
        <div className="space-y-2 text-sm">
          {member.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-[#43464b]" />
              <a 
                href={`mailto:${member.email}`}
                className="text-[#000033] hover:underline truncate flex-1"
              >
                {member.email}
              </a>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-[#43464b] pt-2 border-t">
            <span>Dernière activité: {formatLastActivity(member.lastActivity)}</span>
            {member.isOnline && <span className="text-green-600 font-medium">En ligne</span>}
          </div>
        </div>
      </CardContent>
    </Card>
    );
  };

  const renderMemberList = (member: Member) => (
    <Card key={member.id} className="mb-4 hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-[#000033] text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {member.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-[#000033] truncate">{member.name}</h3>
              {member.verified && (
                <Award className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
              {member.featured && (
                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(member.id)}
                className="h-6 w-6 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {favoriteMembers.has(member.id) ? (
                  <BookmarkCheck className="h-3 w-3 text-yellow-500" />
                ) : (
                  <Bookmark className="h-3 w-3" />
                )}
              </Button>
            </div>
            <p className="text-sm text-[#43464b] mb-1 truncate">
              {member.title} • {member.organization}
            </p>
            <div className="flex items-center gap-4 text-sm text-[#43464b]">
              {getMembershipBadge(member.membershipType)}
              {member.city && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{member.city}</span>
                </div>
              )}
              {member.stats && (
                <span className="text-xs">{member.stats.connections} connexions</span>
              )}
              <span className="text-xs">Actif {formatLastActivity(member.lastActivity)}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleConnect(member)}
              className="bg-[#000033] hover:bg-[#000033]/90 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Connecter
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleMessage(member)}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewProfile?.(member.id)}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000033] mx-auto mb-4"></div>
          <p className="text-[#43464b]">Chargement du répertoire des membres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('all')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{members.length}</p>
                <p className="text-sm text-[#43464b]">Membres total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('online')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{members.filter(m => m.isOnline).length}</p>
                <p className="text-sm text-[#43464b]">En ligne</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('featured')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{members.filter(m => m.featured).length}</p>
                <p className="text-sm text-[#43464b]">Vedettes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('favorites')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#000033]">{favoriteMembers.size}</p>
                <p className="text-sm text-[#43464b]">Favoris</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche et filtres */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des membres par nom, organisation, secteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="recent">Récent</SelectItem>
                <SelectItem value="popular">Populaire</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportDirectory}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Onglets de filtrage */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="featured">Vedettes</TabsTrigger>
            <TabsTrigger value="online">En ligne</TabsTrigger>
            <TabsTrigger value="favorites">Favoris ({favoriteMembers.size})</TabsTrigger>
            <TabsTrigger value="recent">Récents</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filtres étendus */}
        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-1 block">Secteur</label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les secteurs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#43464b] mb-1 block">Type d'adhésion</label>
                <Select value={selectedMembershipType} onValueChange={setSelectedMembershipType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {membershipTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#43464b] mb-1 block">Ville</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Résultats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[#43464b]">
            {filteredMembers.length} membre{filteredMembers.length !== 1 ? 's' : ''} trouvé{filteredMembers.length !== 1 ? 's' : ''}
            {searchQuery && ` pour "${searchQuery}"`}
          </p>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#000033] mb-2">Aucun membre trouvé</h3>
            <p className="text-[#43464b]">
              {searchQuery ? 
                'Essayez de modifier votre recherche ou vos filtres.' : 
                'Aucun membre ne correspond aux critères sélectionnés.'
              }
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredMembers.map((member) => 
              viewMode === 'grid' ? renderMemberCard(member) : renderMemberList(member)
            )}
          </div>
        )}
      </div>
    </div>
  );
}