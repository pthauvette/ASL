import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Activity, CheckCircle } from 'lucide-react';
import { RecentActivity } from '../types/portal-types';
import { getActivityIcon } from '../utils/portal-utils';

interface DashboardRecentActivitiesProps {
  activities: RecentActivity[];
}

export function DashboardRecentActivities({ activities }: DashboardRecentActivitiesProps) {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activités récentes
        </CardTitle>
        <CardDescription>
          Vos dernières interactions sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#f8f9fa] border hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#000033] mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-[#43464b]">
                    {new Date(activity.date).toLocaleDateString('fr-CA', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {activity.status && (
                    <Badge variant="outline" className="text-xs">
                      {activity.status === 'completed' ? 'Terminé' : 
                       activity.status === 'pending' ? 'En attente' : 'Échoué'}
                    </Badge>
                  )}
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-4 text-[#000033] hover:bg-[#000033]/5">
          Voir toutes les activités
        </Button>
      </CardContent>
    </Card>
  );
}