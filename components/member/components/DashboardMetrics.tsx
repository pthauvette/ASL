import { Card, CardContent } from '../../ui/card';
import { Shield, MessageSquare, Network, Calendar } from 'lucide-react';
import { QuickStats, MembershipInfo } from '../types/portal-types';

interface DashboardMetricsProps {
  membershipInfo: MembershipInfo;
  quickStats: QuickStats;
  onNavigate: (page: string) => void;
}

export function DashboardMetrics({ membershipInfo, quickStats, onNavigate }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="animate-fade-in-up border-l-4 border-l-green-500" style={{ animationDelay: '0.1s' }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#43464b]">Statut d'adhésion</p>
              <p className="text-2xl font-bold text-[#000033] mt-1">Actif</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-[#43464b] mt-2">
            Expire le {new Date(membershipInfo.renewalDate).toLocaleDateString('fr-CA')}
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up cursor-pointer hover:shadow-md transition-shadow" style={{ animationDelay: '0.2s' }} onClick={() => onNavigate('messaging')}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#43464b]">Messages</p>
              <p className="text-2xl font-bold text-[#000033] mt-1">{quickStats.newMessages}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center relative">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              {quickStats.newMessages > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{quickStats.newMessages}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-[#43464b] mt-2">
            Nouvelles conversations actives
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up cursor-pointer hover:shadow-md transition-shadow" style={{ animationDelay: '0.3s' }} onClick={() => onNavigate('network')}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#43464b]">Réseau</p>
              <p className="text-2xl font-bold text-[#000033] mt-1">24</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center relative">
              <Network className="h-6 w-6 text-purple-600" />
              {quickStats.pendingConnections > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{quickStats.pendingConnections}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-[#43464b] mt-2">
            +{quickStats.pendingConnections} demandes en attente
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up cursor-pointer hover:shadow-md transition-shadow" style={{ animationDelay: '0.4s' }} onClick={() => onNavigate('events')}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#43464b]">Événements</p>
              <p className="text-2xl font-bold text-[#000033] mt-1">{quickStats.upcomingEvents}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-[#43464b] mt-2">
            Prochaine formation le 22 août
          </p>
        </CardContent>
      </Card>
    </div>
  );
}