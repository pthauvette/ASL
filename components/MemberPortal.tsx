import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  User, Mail, Phone, LogOut, Bell, Shield, Download, Settings, 
  CheckCircle, Clock, Calendar, MapPin, Award, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

// Components
import { ProfilePage } from './member/ProfilePage';
import { EventsPage } from './member/EventsPage';
import { EventDetailPage } from './member/EventDetailPage';
import { ResourcesPage } from './member/ResourcesPage';
import { MemberDirectoryPage } from './member/MemberDirectoryPage';
import { MemberProfileDetailPage } from './member/MemberProfileDetailPage';
import { MessagingSystem } from './member/MessagingSystem';
import { NetworkConnectionsPage } from './member/NetworkConnectionsPage';
import { NotificationSystem } from './member/NotificationSystem';
import { DashboardMetrics } from './member/components/DashboardMetrics';
import { DashboardHighlights } from './member/components/DashboardHighlights';
import { DashboardQuickActions } from './member/components/DashboardQuickActions';
import { DashboardRecentActivities } from './member/components/DashboardRecentActivities';

// Types and Constants
import { PortalPage, MembershipInfo, QuickStats } from './member/types/portal-types';
import { 
  QUICK_STATS_DEFAULT, 
  DEMO_RECENT_ACTIVITIES, 
  DEMO_UPCOMING_EVENTS, 
  DEMO_MEMBER_HIGHLIGHTS,
  DEFAULT_MEMBERSHIP_INFO 
} from './member/constants/portal-constants';
import { getStatusBadge, getPageTitle, getPageDescription } from './member/utils/portal-utils';

interface MemberPortalProps {
  user: any;
  onLogout?: () => void;
}

export function MemberPortal({ user, onLogout }: MemberPortalProps) {
  const [currentPage, setCurrentPage] = useState<PortalPage>('dashboard');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [initialConversationId, setInitialConversationId] = useState<string | null>(null);
  const [initialContactId, setInitialContactId] = useState<string | null>(null);
  
  const [membershipInfo] = useState<MembershipInfo>(DEFAULT_MEMBERSHIP_INFO);
  const [quickStats] = useState<QuickStats>(QUICK_STATS_DEFAULT);
  const [recentActivities] = useState(DEMO_RECENT_ACTIVITIES);
  const [upcomingEvents] = useState(DEMO_UPCOMING_EVENTS);
  const [memberHighlights] = useState(DEMO_MEMBER_HIGHLIGHTS);

  const handleLogout = () => {
    sessionStorage.removeItem('asl_user_session');
    localStorage.removeItem('asl_remember_user');
    
    toast.success('Déconnexion réussie', {
      description: 'Vous avez été déconnecté de votre portail membre.'
    });
    
    onLogout?.();
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-detail');
  };

  const handleBackFromEventDetail = () => {
    setCurrentPage('events');
    setSelectedEventId(null);
  };

  const handleViewMemberProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
    setCurrentPage('member-profile');
  };

  const handleBackFromMemberProfile = () => {
    setCurrentPage('directory');
    setSelectedMemberId(null);
  };

  const handleStartConversation = (memberId: string) => {
    setInitialContactId(memberId);
    setInitialConversationId(null);
    setCurrentPage('messaging');
  };

  const handleBackFromMessaging = () => {
    setCurrentPage('dashboard');
    setInitialContactId(null);
    setInitialConversationId(null);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage user={user} membershipInfo={membershipInfo} />;
      case 'events':
        return <EventsPage upcomingEvents={upcomingEvents} onEventClick={handleEventClick} />;
      case 'event-detail':
        return selectedEventId ? (
          <EventDetailPage 
            eventId={selectedEventId} 
            onBack={handleBackFromEventDetail}
          />
        ) : null;
      case 'resources':
        return <ResourcesPage />;
      case 'directory':
        return <MemberDirectoryPage onViewProfile={handleViewMemberProfile} onStartConversation={handleStartConversation} />;
      case 'member-profile':
        return selectedMemberId ? (
          <MemberProfileDetailPage 
            memberId={selectedMemberId}
            currentUser={user}
            onBack={handleBackFromMemberProfile}
            onStartConversation={handleStartConversation}
          />
        ) : null;
      case 'messaging':
        return (
          <MessagingSystem 
            currentUser={user}
            onBack={handleBackFromMessaging}
            initialConversationId={initialConversationId}
            initialContactId={initialContactId}
          />
        );
      case 'network':
        return (
          <NetworkConnectionsPage 
            currentUser={user}
            onViewProfile={handleViewMemberProfile}
            onStartConversation={handleStartConversation}
          />
        );
      case 'notifications':
        return (
          <NotificationSystem 
            currentUser={user}
            onViewProfile={handleViewMemberProfile}
            onStartConversation={handleStartConversation}
            onViewEvent={handleEventClick}
          />
        );
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <DashboardMetrics 
        membershipInfo={membershipInfo}
        quickStats={quickStats}
        onNavigate={setCurrentPage}
      />

      <DashboardHighlights highlights={memberHighlights} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardQuickActions 
            quickStats={quickStats}
            onNavigate={setCurrentPage}
          />

          <DashboardRecentActivities activities={recentActivities} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Membership Summary */}
          <Card className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Mon adhésion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Adhésion active</span>
                </div>
                <p className="text-sm text-green-700">
                  Votre adhésion est valide jusqu'au{' '}
                  <strong>{new Date(membershipInfo.renewalDate).toLocaleDateString('fr-CA')}</strong>
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#43464b]">Type d'adhésion</span>
                  <span className="font-medium text-[#000033]">{membershipInfo.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#43464b]">Numéro de membre</span>
                  <span className="font-medium text-[#000033]">{membershipInfo.memberNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#43464b]">Membre depuis</span>
                  <span className="font-medium text-[#000033]">
                    {new Date(membershipInfo.joinDate).toLocaleDateString('fr-CA', { 
                      year: 'numeric', 
                      month: 'long'
                    })}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le certificat
                </Button>
                <Button variant="outline" className="w-full border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5" onClick={() => setCurrentPage('profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Gérer mon profil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Événements à venir
                </div>
                <Badge variant="outline" className="text-xs">
                  {upcomingEvents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="border border-[#e9ebef] rounded-lg p-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors"
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#000033] text-sm hover:text-[#000033]/80 transition-colors">
                          {event.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#43464b]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString('fr-CA', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                    
                    {event.status === 'registered' && (
                      <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        ✓ Vous êtes inscrit à cet événement
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 text-[#000033] hover:bg-[#000033]/5"
                onClick={() => setCurrentPage('events')}
              >
                Voir tous les événements
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Support & Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-[#43464b]">
                Notre équipe est à votre disposition pour vous accompagner.
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 text-[#43464b]" />
                  <a href="mailto:support@armateurs.quebec" className="text-[#000033] hover:underline">
                    support@armateurs.quebec
                  </a>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4 text-[#43464b]" />
                  <span className="text-[#43464b]">1-800-ASL-AIDE</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded">
                  <Clock className="h-4 w-4 text-[#43464b]" />
                  <span className="text-[#43464b]">Lun-Ven, 9h00-17h00</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Guide d'utilisation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#fafaf0]">
      {/* Header */}
      <header className="bg-white border-b shadow-sm animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#000033] mr-16">ASL</div>
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'dashboard' 
                    ? 'text-[#000033]' 
                    : 'text-[#43464b] hover:text-[#000033]'
                }`}
              >
                Tableau de bord
              </button>
              <button 
                onClick={() => setCurrentPage('directory')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'directory' || currentPage === 'member-profile'
                    ? 'text-[#000033]' 
                    : 'text-[#43464b] hover:text-[#000033]'
                }`}
              >
                Répertoire
              </button>
              <button 
                onClick={() => setCurrentPage('messaging')}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  currentPage === 'messaging'
                    ? 'text-[#000033]' 
                    : 'text-[#43464b] hover:text-[#000033]'
                }`}
              >
                Messages
                {quickStats.newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => setCurrentPage('events')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'events' || currentPage === 'event-detail'
                    ? 'text-[#000033]' 
                    : 'text-[#43464b] hover:text-[#000033]'
                }`}
              >
                Événements
              </button>
              <button 
                onClick={() => setCurrentPage('resources')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'resources'
                    ? 'text-[#000033]' 
                    : 'text-[#43464b] hover:text-[#000033]'
                }`}
              >
                Ressources
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setCurrentPage('notifications')}
            >
              <Bell className="h-4 w-4" />
              {quickStats.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {quickStats.unreadNotifications}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#000033] to-[#000033]/90 text-white animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {getPageTitle(currentPage)}
                </h1>
                <p className="text-white/80 text-lg">
                  {getPageDescription(currentPage, user.name)}
                </p>
                {currentPage === 'dashboard' && (
                  <div className="flex items-center gap-4 mt-2">
                    {getStatusBadge(membershipInfo.status)}
                    <span className="text-white/60 text-sm">
                      {membershipInfo.type} • {membershipInfo.memberNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {renderPageContent()}
      </main>

      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }

        .animate-slide-in-down {
          animation: slide-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}