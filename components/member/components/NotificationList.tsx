import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Check, X, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { Notification } from '../types/notification-types';
import { 
  getNotificationIcon, 
  getNotificationColor, 
  formatNotificationTime 
} from '../utils/notification-utils';

interface NotificationListProps {
  notifications: Notification[];
  usersInfo: Record<string, { name: string; organization: string; title: string }>;
  onNotificationAction: (notification: Notification, action: string) => void;
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
}

export function NotificationList({
  notifications,
  usersInfo,
  onNotificationAction,
  onMarkAsRead,
  onDelete
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-[#000033] mb-2">Toutes les notifications sont lues</h3>
          <p className="text-[#43464b]">
            Vous n'avez aucune nouvelle notification pour le moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const IconComponent = getNotificationIcon(notification.type);
        const iconColor = getNotificationColor(notification.type, notification.priority);
        const userInfo = notification.senderId ? usersInfo[notification.senderId] : null;

        return (
          <Card 
            key={notification.id} 
            className={`transition-all duration-200 hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-[#000033] bg-blue-50/30' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Avatar ou icône */}
                <div className="flex-shrink-0">
                  {userInfo ? (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                        {userInfo.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className={`h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${iconColor}`} />
                    </div>
                  )}
                </div>

                {/* Contenu de la notification */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#000033]">{notification.title}</h4>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-[#000033] rounded-full flex-shrink-0"></div>
                        )}
                        {notification.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#43464b] mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#43464b]">
                        {formatNotificationTime(notification.timestamp)}
                      </p>
                    </div>

                    {/* Actions de notification */}
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(notification.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions principales */}
                  {notification.actionable && notification.actions && (
                    <div className="flex gap-2 mt-3">
                      {notification.actions.primary && (
                        <Button
                          size="sm"
                          onClick={() => onNotificationAction(notification, notification.actions!.primary!.action)}
                          className="bg-[#000033] hover:bg-[#000033]/90 text-white"
                        >
                          {notification.actions.primary.label}
                        </Button>
                      )}
                      {notification.actions.secondary && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNotificationAction(notification, notification.actions!.secondary!.action)}
                        >
                          {notification.actions.secondary.label}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}