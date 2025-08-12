import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileText,
  Video,
  Image,
  Download,
  Search,
  Filter,
  Eye,
  Star,
  BookOpen,
  Users,
  Calendar,
  ExternalLink,
  PlayCircle,
  FileImage,
  File,
  Link as LinkIcon,
  Bookmark,
  Share2,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: '1',
      title: 'Guide de Sécurité Maritime 2024',
      description: 'Guide complet des protocoles et procédures de sécurité maritime selon les dernières normes internationales.',
      type: 'document',
      category: 'securite',
      format: 'PDF',
      size: '2.4 MB',
      pages: 45,
      downloads: 234,
      rating: 4.8,
      featured: true,
      date: '2024-07-15',
      author: 'Comité Sécurité ASL',
      tags: ['sécurité', 'protocoles', 'normes'],
      url: '#'
    },
    {
      id: '2',
      title: 'Réglementation Maritime du Saint-Laurent',
      description: 'Documentation officielle sur les réglementations spécifiques au transport maritime sur le Saint-Laurent.',
      type: 'document',
      category: 'reglementation',
      format: 'PDF',
      size: '1.8 MB',
      pages: 32,
      downloads: 156,
      rating: 4.6,
      featured: false,
      date: '2024-06-20',
      author: 'Département Juridique',
      tags: ['réglementation', 'saint-laurent', 'transport'],
      url: '#'
    },
    {
      id: '3',
      title: 'Webinaire: Innovations Technologiques',
      description: 'Enregistrement du webinaire sur les dernières innovations technologiques dans le secteur maritime.',
      type: 'video',
      category: 'innovation',
      format: 'MP4',
      duration: '1h 23min',
      views: 456,
      rating: 4.9,
      featured: true,
      date: '2024-07-10',
      author: 'Dr. Marie Dubois',
      tags: ['innovation', 'technologie', 'webinaire'],
      url: '#'
    },
    {
      id: '4',
      title: 'Statistiques Portuaires Q2 2024',
      description: 'Rapport trimestriel sur les statistiques d\'activité des principaux ports du Saint-Laurent.',
      type: 'document',
      category: 'statistiques',
      format: 'Excel',
      size: '850 KB',
      downloads: 89,
      rating: 4.3,
      featured: false,
      date: '2024-07-01',
      author: 'Service Statistiques',
      tags: ['statistiques', 'ports', 'trimestriel'],
      url: '#'
    },
    {
      id: '5',
      title: 'Formation Gestion Environnementale',
      description: 'Module de formation en ligne sur la gestion environnementale dans les opérations maritimes.',
      type: 'link',
      category: 'formation',
      external: true,
      duration: '2h 30min',
      completions: 78,
      rating: 4.7,
      featured: false,
      date: '2024-06-15',
      author: 'Centre de Formation ASL',
      tags: ['formation', 'environnement', 'gestion'],
      url: 'https://formation.asl.quebec'
    },
    {
      id: '6',
      title: 'Cartographie des Voies Navigables',
      description: 'Collection de cartes détaillées des principales voies navigables du Saint-Laurent.',
      type: 'image',
      category: 'navigation',
      format: 'PDF/Images',
      size: '15.2 MB',
      downloads: 312,
      rating: 4.5,
      featured: true,
      date: '2024-05-30',
      author: 'Service Cartographie',
      tags: ['cartes', 'navigation', 'saint-laurent'],
      url: '#'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les ressources', count: resources.length },
    { id: 'securite', name: 'Sécurité', count: resources.filter(r => r.category === 'securite').length },
    { id: 'reglementation', name: 'Réglementation', count: resources.filter(r => r.category === 'reglementation').length },
    { id: 'innovation', name: 'Innovation', count: resources.filter(r => r.category === 'innovation').length },
    { id: 'formation', name: 'Formation', count: resources.filter(r => r.category === 'formation').length },
    { id: 'statistiques', name: 'Statistiques', count: resources.filter(r => r.category === 'statistiques').length },
    { id: 'navigation', name: 'Navigation', count: resources.filter(r => r.category === 'navigation').length }
  ];

  const recentlyViewed = [
    {
      id: '1',
      title: 'Guide de Sécurité Maritime 2024',
      viewedAt: '2024-07-20',
      type: 'document'
    },
    {
      id: '3',
      title: 'Webinaire: Innovations Technologiques',
      viewedAt: '2024-07-19',
      type: 'video'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'image':
        return <FileImage className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      document: 'bg-blue-100 text-blue-800',
      video: 'bg-red-100 text-red-800',
      image: 'bg-green-100 text-green-800',
      link: 'bg-purple-100 text-purple-800'
    };
    
    const names = {
      document: 'Document',
      video: 'Vidéo',
      image: 'Images',
      link: 'Lien'
    };
    
    return (
      <Badge className={`${styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800'} hover:bg-opacity-80`}>
        {names[type as keyof typeof names] || type}
      </Badge>
    );
  };

  const handleDownload = (resource: any) => {
    toast.success('Téléchargement démarré', {
      description: `${resource.title} est en cours de téléchargement.`
    });
  };

  const handleView = (resource: any) => {
    if (resource.external) {
      window.open(resource.url, '_blank');
    } else {
      toast.info('Ouverture de la ressource', {
        description: `${resource.title} s'ouvre dans une nouvelle fenêtre.`
      });
    }
  };

  const handleBookmark = (resource: any) => {
    toast.success('Ajouté aux favoris', {
      description: `${resource.title} a été ajouté à vos favoris.`
    });
  };

  const handleShare = (resource: any) => {
    navigator.clipboard.writeText(window.location.origin + '/resources/' + resource.id);
    toast.success('Lien copié', {
      description: 'Le lien de la ressource a été copié dans le presse-papiers.'
    });
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
                placeholder="Rechercher des ressources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <Button variant="outline" className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5">
            <Filter className="h-4 w-4 mr-2" />
            Filtres avancés
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

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Toutes les ressources</TabsTrigger>
          <TabsTrigger value="recent">Récemment consultées</TabsTrigger>
          <TabsTrigger value="favorites">Mes favoris</TabsTrigger>
          <TabsTrigger value="popular">Les plus populaires</TabsTrigger>
        </TabsList>

        {/* Toutes les ressources */}
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${resource.featured ? 'ring-2 ring-[#000033]/10' : ''}`}>
                {resource.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-[#000033] text-white hover:bg-[#000033]/90">
                      <Star className="h-3 w-3 mr-1" />
                      À la une
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2 text-[#000033]">
                          {getTypeIcon(resource.type)}
                        </div>
                        {getTypeBadge(resource.type)}
                      </div>
                      <CardTitle className="text-lg text-[#000033] mb-2 leading-tight">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-[#43464b] line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-[#000033]"
                      onClick={() => handleBookmark(resource)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm text-[#43464b]">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(resource.date).toLocaleDateString('fr-CA')}
                        </span>
                      </div>
                      {resource.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{resource.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-[#43464b]">
                      Par {resource.author}
                    </div>
                    
                    {resource.type === 'document' && resource.format && (
                      <div className="flex items-center gap-4 text-sm text-[#43464b]">
                        <span>{resource.format}</span>
                        {resource.size && <span>{resource.size}</span>}
                        {resource.pages && <span>{resource.pages} pages</span>}
                      </div>
                    )}
                    
                    {resource.type === 'video' && resource.duration && (
                      <div className="flex items-center gap-2 text-sm text-[#43464b]">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-[#43464b]">
                      {resource.downloads && (
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{resource.downloads} téléchargements</span>
                        </div>
                      )}
                      {resource.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{resource.views} vues</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Button 
                      className="flex-1 bg-[#000033] hover:bg-[#000033]/90 text-white"
                      onClick={() => resource.type === 'video' || resource.external ? handleView(resource) : handleDownload(resource)}
                    >
                      {resource.type === 'video' ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Regarder
                        </>
                      ) : resource.external ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Accéder
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleView(resource)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare(resource)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
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

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#000033] mb-2">Aucune ressource trouvée</h3>
              <p className="text-[#43464b]">
                {searchQuery ? 
                  'Essayez de modifier votre recherche ou vos filtres.' : 
                  'Il n\'y a actuellement aucune ressource dans cette catégorie.'
                }
              </p>
            </div>
          )}
        </TabsContent>

        {/* Récemment consultées */}
        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#000033]">Récemment consultées</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentlyViewed.map((item) => {
                const resource = resources.find(r => r.id === item.id);
                if (!resource) return null;
                
                return (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-[#000033]">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#000033] mb-1">{resource.title}</h4>
                          <p className="text-sm text-[#43464b]">
                            Consulté le {new Date(item.viewedAt).toLocaleDateString('fr-CA')}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Mes favoris */}
        <TabsContent value="favorites" className="space-y-6">
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#000033] mb-2">Aucun favori pour le moment</h3>
            <p className="text-[#43464b]">
              Ajoutez des ressources à vos favoris pour les retrouver facilement ici.
            </p>
          </div>
        </TabsContent>

        {/* Les plus populaires */}
        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {resources
              .sort((a, b) => (b.downloads || b.views || 0) - (a.downloads || a.views || 0))
              .slice(0, 6)
              .map((resource, index) => (
                <Card key={resource.id} className="relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      #{index + 1}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-2 text-[#000033]">
                        {getTypeIcon(resource.type)}
                      </div>
                      {getTypeBadge(resource.type)}
                    </div>
                    <CardTitle className="text-lg text-[#000033] mb-2 leading-tight">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-[#43464b] mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{resource.downloads || resource.views} {resource.downloads ? 'téléchargements' : 'vues'}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#000033] hover:bg-[#000033]/90 text-white"
                      onClick={() => resource.type === 'video' || resource.external ? handleView(resource) : handleDownload(resource)}
                    >
                      {resource.type === 'video' ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Regarder
                        </>
                      ) : resource.external ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Accéder
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}