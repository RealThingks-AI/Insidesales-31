import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDatePresets } from "./auditLogUtils";

interface AuditLogStatsProps {
  total: number;
  todayCount: number;
  weekCount: number;
  byModule: Record<string, number>;
  byUser: Record<string, number>;
  userNames: Record<string, string>;
  activeFilter?: string;
  onFilterAll?: () => void;
  onFilterToday?: () => void;
  onFilterThisWeek?: () => void;
  onFilterModule?: (moduleName: string) => void;
  onDatePreset?: (from: Date, to: Date, label: string) => void;
  activeDatePreset?: string;
}

export const AuditLogStats = ({
  total, todayCount, weekCount, byModule,
  activeFilter = 'all',
  onFilterAll, onFilterToday, onFilterThisWeek, onFilterModule,
  onDatePreset, activeDatePreset,
}: AuditLogStatsProps) => {
  const topModules = Object.entries(byModule)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const presets = getDatePresets();
  // Exclude "Today" from presets since we already have a Today stat badge
  const extraPresets = presets.filter(p => p.label !== 'Today');

  const base = "gap-1.5 text-xs font-medium py-1 cursor-pointer transition-all ring-offset-background select-none";
  const activeRing = "ring-2 ring-primary ring-offset-1";
  const isFiltered = activeFilter !== 'all' || !!activeDatePreset;

  return (
    <div className="flex flex-wrap items-center gap-2 px-1">
      <Badge
        variant="secondary"
        className={cn(base, activeFilter === 'all' && !activeDatePreset && activeRing)}
        onClick={onFilterAll}
      >
        Total <span className="font-bold">{total}</span>
      </Badge>
      <Badge
        className={cn(base, "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-0", activeFilter === 'today' && activeRing)}
        onClick={onFilterToday}
      >
        Today <span className="font-bold">{todayCount}</span>
      </Badge>
      <Badge
        className={cn(base, "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0", activeFilter === 'week' && activeRing)}
        onClick={onFilterThisWeek}
      >
        This Week <span className="font-bold">{weekCount}</span>
      </Badge>
      <span className="text-muted-foreground text-xs">|</span>
      {topModules.map(([mod, count]) => (
        <Badge
          key={mod}
          variant="outline"
          className={cn(base, "font-normal", activeFilter === mod.toLowerCase() && activeRing)}
          onClick={() => onFilterModule?.(mod)}
        >
          {mod} <span className="font-bold">{count}</span>
        </Badge>
      ))}
      {extraPresets.length > 0 && (
        <>
          <span className="text-muted-foreground text-xs">|</span>
          {extraPresets.map(preset => (
            <Badge
              key={preset.label}
              variant="outline"
              className={cn(base, "font-normal", activeDatePreset === preset.label && activeRing)}
              onClick={() => onDatePreset?.(preset.from, preset.to, preset.label)}
            >
              {preset.label}
            </Badge>
          ))}
        </>
      )}
      {isFiltered && (
        <>
          <span className="text-muted-foreground text-xs">|</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={onFilterAll}
          >
            <X className="h-3 w-3 mr-1" />
            Clear filter
          </Button>
        </>
      )}
    </div>
  );
};
