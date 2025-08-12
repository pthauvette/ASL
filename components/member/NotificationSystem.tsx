import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { 
  Bell, Check, X, Filter, Settings, Volume2, VolumeX, Smartphone, Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { Notification, NotificationSettings } from './types/notification-types';
import { DEMO_NOTIFICATIONS, DEFAULT_NOTIFICATION_SETTINGS, USERS_INFO } from './constants/demo-data';
import { 
  getNotificationIcon, 
  getNotificationColor, 
  formatNotificationTime,
  filterNotifications,
  getUnreadCount,
  sortNotificationsByTimestamp
} from './utils/notification-utils';
import { NotificationList } from './components/NotificationList';
import { NotificationSettingsPanel } from './components/NotificationSettingsPanel';

interface NotificationSystemProps {
  currentUser: any;
  onConnectionAction?: (notificationId: string, action: 'accept' | 'decline') => void;
  onViewProfile?: (userId: string) => void;
  onStartConversation?: (userId: string) => void;
  onViewEvent?: (eventId: string) => void;
}

export function NotificationSystem({ 
  currentUser,
  onConnectionAction,
  onViewProfile,
  onStartConversation,
  onViewEvent
}: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotifications(sortNotificationsByTimestamp(DEMO_NOTIFICATIONS));
        console.log('🔔 Notifications chargées');
      } catch (error) {
        console.error('Erreur chargement notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast.success('Toutes les notifications ont été marquées comme lues');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast.success('Notification supprimée');
  };

  const handleNotificationAction = (notification: Notification, actionType: string) => {
    markAsRead(notification.id);

    switch (actionType) {
      case 'accept_connection':
        onConnectionAction?.(notification.id, 'accept');
        break;
      case 'decline_connection':
        onConnectionAction?.(notification.id, 'decline');
        break;
      case 'reply_message':
      case 'start_conversation':
        if (notification.senderId) {
          onStartConversation?.(notification.senderId);
        }
        break;
      case 'view_profile':
        if (notification.senderId) {
          onViewProfile?.(notification.senderId);
        }
        break;
      case 'view_event':
      case 'register_event':
        if (notification.relatedId) {
          onViewEvent?.(notification.relatedId);
        }
        break;
      default:
        console.log('Action non gérée:', actionType);
    }
  };

  const filteredNotifications = filterNotifications(notifications, filter);
  const unreadCount = getUnreadCount(notifications);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000033] mx-auto mb-4"></div>
          <p className="text-[#43464b]">Chargement des notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000033]">Notifications</h2>
          <p className="text-[#43464b] mt-1">
            {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes les notifications sont lues'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Marquer tout comme lu
            </Button>
          )}
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Toutes {notifications.length > 0 && `(${notifications.length})`}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Non lues 
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-[#000033] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <NotificationList
            notifications={filteredNotifications}
            usersInfo={USERS_INFO}
            onNotificationAction={handleNotificationAction}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          <NotificationList
            notifications={filterNotifications(notifications, 'unread')}
            usersInfo={USERS_INFO}
            onNotificationAction={handleNotificationAction}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <NotificationSettingsPanel
            settings={settings}
            onSettingsChange={setSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}