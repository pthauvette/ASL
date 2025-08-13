import { Card, CardContent } from '../../ui/card';
import { MemberHighlight } from '../types/portal-types';
import { getHighlightIcon } from '../utils/portal-utils';

interface DashboardHighlightsProps {
  highlights: MemberHighlight[];
}

export function DashboardHighlights({ highlights }: DashboardHighlightsProps) {
  if (highlights.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => {
          const IconComponent = getHighlightIcon(highlight.type);
          return (
            <Card key={highlight.id} className={`animate-fade-in-up bg-gradient-to-r ${highlight.type === 'achievement' ? 'from-yellow-50 to-orange-50 border-yellow-200' : 'from-blue-50 to-indigo-50 border-blue-200'}`} style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${highlight.type === 'achievement' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    <IconComponent className={`h-6 w-6 ${highlight.type === 'achievement' ? 'text-yellow-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#000033] mb-1">{highlight.title}</h3>
                    <p className="text-sm text-[#43464b] mb-2">{highlight.description}</p>
                    <p className="text-xs text-[#43464b]">
                      {new Date(highlight.date).toLocaleDateString('fr-CA')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}