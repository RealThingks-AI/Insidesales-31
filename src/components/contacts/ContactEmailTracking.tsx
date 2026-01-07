import { Mail, MousePointer, TrendingUp } from 'lucide-react';

interface ContactEmailTrackingProps {
  emailOpens: number;
  emailClicks: number;
  engagementScore: number;
}

export const ContactEmailTracking = ({
  emailOpens,
  emailClicks,
  engagementScore,
}: ContactEmailTrackingProps) => {
  const clickRate = emailClicks > 0 && emailOpens > 0 ? (emailClicks / emailOpens) * 100 : 0;

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-blue-500" />
        <span className="text-muted-foreground">Opens:</span>
        <span className="font-semibold">{emailOpens}</span>
      </div>
      <div className="flex items-center gap-2">
        <MousePointer className="h-4 w-4 text-green-500" />
        <span className="text-muted-foreground">Clicks:</span>
        <span className="font-semibold">{emailClicks}</span>
        <span className="text-xs text-muted-foreground">({clickRate.toFixed(1)}%)</span>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-purple-500" />
        <span className="text-muted-foreground">Score:</span>
        <span className="font-semibold">{engagementScore}</span>
      </div>
    </div>
  );
};
