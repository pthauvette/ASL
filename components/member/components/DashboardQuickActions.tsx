import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Target, MessageSquare, Network, Calendar, BookOpen } from 'lucide-react';
import { QuickStats } from '../types/portal-types';

interface DashboardQuickActionsProps {
  quickStats: QuickStats;
  onNavigate: (page: string) => void;
}

export function DashboardQuickActions({ quickStats, onNavigate }: DashboardQuickActionsProps) {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Actions rapides
        </CardTitle>
        <CardDescription>
          Accédez rapidement aux fonctionnalités principales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            className="h-auto p-4 justify-start bg-[#000033] hover:bg-[#000033]/90 text-white transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onNavigate('messaging')}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Messagerie</div>
              <div className="text-xs opacity-80">{quickStats.newMessages} nouveaux messages</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 justify-start border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onNavigate('directory')}
          >
            <Network className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Explorer le répertoire</div>
              <div className="text-xs opacity-60">Nouveaux membres ajoutés</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 justify-start border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onNavigate('events')}
          >
            <Calendar className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Événements</div>
              <div className="text-xs opacity-60">Prochaine formation bientôt</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 justify-start border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onNavigate('resources')}
          >
            <BookOpen className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Ressources</div>
              <div className="text-xs opacity-60">Nouveaux documents disponibles</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}