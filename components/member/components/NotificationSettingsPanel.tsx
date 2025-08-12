import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Volume2, VolumeX, Smartphone, Mail, Clock, Save } from 'lucide-react';
import { NotificationSettings } from '../types/notification-types';
import { toast } from 'sonner';

interface NotificationSettingsPanelProps {
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}

export function NotificationSettingsPanel({
  settings,
  onSettingsChange
}: NotificationSettingsPanelProps) {
  const updateSettings = (path: string[], value: any) => {
    const newSettings = { ...settings };
    let current: any = newSettings;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    
    onSettingsChange(newSettings);
  };

  const handleSaveSettings = () => {
    toast.success('Paramètres sauvegardés', {
      description: 'Vos préférences de notification ont été mises à jour.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Préférences générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Préférences générales
          </CardTitle>
          <CardDescription>
            Configurez vos préférences globales de notification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-[#000033]">Sons de notification</h4>
              <p className="text-sm text-[#43464b] mt-1">
                Activer les sons pour les nouvelles notifications
              </p>
            </div>
            <Switch
              checked={settings.preferences.soundEnabled}
              onCheckedChange={(checked) => updateSettings(['preferences', 'soundEnabled'], checked)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-[#000033]">Heures de silence</h4>
                <p className="text-sm text-[#43464b] mt-1">
                  Désactiver les notifications pendant certaines heures
                </p>
              </div>
              <Switch
                checked={settings.preferences.quietHours.enabled}
                onCheckedChange={(checked) => updateSettings(['preferences', 'quietHours', 'enabled'], checked)}
              />
            </div>
            
            {settings.preferences.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-1 block">
                    Début
                  </label>
                  <Input
                    type="time"
                    value={settings.preferences.quietHours.start}
                    onChange={(e) => updateSettings(['preferences', 'quietHours', 'start'], e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-1 block">
                    Fin
                  </label>
                  <Input
                    type="time"
                    value={settings.preferences.quietHours.end}
                    onChange={(e) => updateSettings(['preferences', 'quietHours', 'end'], e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-[#43464b] mb-2 block">
              Fréquence des résumés
            </label>
            <Select
              value={settings.preferences.digestFrequency}
              onValueChange={(value) => updateSettings(['preferences', 'digestFrequency'], value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Temps réel</SelectItem>
                <SelectItem value="hourly">Toutes les heures</SelectItem>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications par email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notifications par email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#000033] capitalize">
                  {key === 'connections' ? 'Connexions' :
                   key === 'messages' ? 'Messages' :
                   key === 'events' ? 'Événements' :
                   key === 'achievements' ? 'Réalisations' :
                   key === 'system' ? 'Système' : key}
                </h4>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => updateSettings(['email', key], checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications push */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Notifications push
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#000033] capitalize">
                  {key === 'connections' ? 'Connexions' :
                   key === 'messages' ? 'Messages' :
                   key === 'events' ? 'Événements' :
                   key === 'achievements' ? 'Réalisations' :
                   key === 'system' ? 'Système' : key}
                </h4>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => updateSettings(['push', key], checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-[#000033] hover:bg-[#000033]/90 text-white">
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );
}