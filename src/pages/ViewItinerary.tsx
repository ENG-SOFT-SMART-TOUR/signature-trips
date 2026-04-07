import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { getDestination, getActivity } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Edit, FileText, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

export default function ViewItinerary() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { itineraries } = useStore();
  const itinerary = itineraries.find(it => it.id === id);
  const [exportOpen, setExportOpen] = useState(false);
  const [openDays, setOpenDays] = useState<number[]>([1]);

  if (!itinerary) return <AppLayout><div className="p-12 text-center text-muted-foreground">Itinerary not found.</div></AppLayout>;

  const dest = getDestination(itinerary.destinationId);
  const totalActivities = itinerary.days.reduce((sum, d) => sum + d.activityIds.length, 0);

  const toggleDay = (dayNum: number) => {
    setOpenDays(prev => prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]);
  };

  const exportText = itinerary.days.map(day => {
    const acts = day.activityIds.map(aid => getActivity(aid)).filter(Boolean);
    return `Day ${day.dayNumber} — ${day.date}\n${acts.map(a => `  • ${a!.name} (${a!.shift}, ${a!.duration})`).join('\n') || '  No activities'}`;
  }).join('\n\n');

  return (
    <AppLayout>
      <PageTransition>
        {/* Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={dest?.image} alt={dest?.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{dest?.name}</h1>
            <p className="font-body text-sm text-muted-foreground">{dest?.country}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm font-body">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{itinerary.days.length} days</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-body">
              <Clock className="h-4 w-4 text-primary" />
              <span>{totalActivities} activities</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" onClick={() => navigate(`/itinerary/${id}/edit`)} className="rounded-full text-sm">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="ghost" onClick={() => setExportOpen(true)} className="rounded-full text-sm">
                <FileText className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="bg-surface rounded-full p-1 mb-8">
              <TabsTrigger value="list" className="rounded-full text-sm font-body">List View</TabsTrigger>
              <TabsTrigger value="map" className="rounded-full text-sm font-body">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {itinerary.days.map(day => {
                const acts = day.activityIds.map(aid => getActivity(aid)).filter(Boolean);
                const isOpen = openDays.includes(day.dayNumber);
                return (
                  <div key={day.dayNumber} className="rounded-lg bg-surface overflow-hidden">
                    <button
                      onClick={() => toggleDay(day.dayNumber)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div>
                        <span className="font-display text-lg font-semibold">Day {day.dayNumber}</span>
                        <span className="font-body text-xs text-muted-foreground ml-3">{day.date} · {acts.length} activities</span>
                      </div>
                      <Link
                        to={`/itinerary/${id}/day/${day.dayNumber}`}
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-primary font-body hover:underline"
                      >
                        Full preview →
                      </Link>
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="px-5 pb-5 space-y-3"
                      >
                        {acts.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No activities planned.</p>
                        ) : acts.map(act => act && (
                          <Link
                            key={act.id}
                            to={`/activity/${act.id}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors"
                          >
                            <img src={act.images[0]} alt={act.name} className="w-12 h-12 rounded-md object-cover" />
                            <div>
                              <span className="font-body text-sm font-medium">{act.name}</span>
                              <div className="flex gap-2 mt-0.5">
                                <Badge variant="secondary" className="text-xs rounded-full">{act.category}</Badge>
                                <span className="text-xs text-muted-foreground">{act.shift} · {act.duration}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="map">
              <div className="rounded-lg bg-surface overflow-hidden min-h-[500px] relative">
                {/* Legend */}
                <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-1.5">
                  <span className="text-xs font-body font-medium text-foreground block mb-2">Days</span>
                  {itinerary.days.map(day => {
                    const color = `hsl(${(day.dayNumber * 55 + 150) % 360}, 55%, 45%)`;
                    return (
                      <div key={day.dayNumber} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs font-body text-muted-foreground">Day {day.dayNumber} · {day.activityIds.length} stops</span>
                      </div>
                    );
                  })}
                </div>

                {/* Mock map surface */}
                <div className="w-full h-[500px] relative" style={{
                  background: `
                    radial-gradient(ellipse at 30% 40%, hsl(var(--primary) / 0.06) 0%, transparent 60%),
                    radial-gradient(ellipse at 70% 60%, hsl(var(--accent) / 0.05) 0%, transparent 50%),
                    linear-gradient(135deg, hsl(160 20% 92%) 0%, hsl(170 15% 88%) 40%, hsl(150 18% 85%) 100%)
                  `
                }}>
                  {/* Grid lines to simulate map */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={`${(i + 1) * 8}%`} x2="100%" y2={`${(i + 1) * 8}%`} stroke="currentColor" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line key={`v${i}`} x1={`${(i + 1) * 6}%`} y1="0" x2={`${(i + 1) * 6}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" />
                    ))}
                    {/* Abstract land shapes */}
                    <ellipse cx="45%" cy="45%" rx="25%" ry="30%" fill="hsl(150, 20%, 78%)" opacity="0.3" />
                    <ellipse cx="60%" cy="55%" rx="18%" ry="22%" fill="hsl(150, 20%, 78%)" opacity="0.2" />
                    <path d="M 100 150 Q 200 100 350 180 Q 450 220 500 160 L 500 500 L 100 500 Z" fill="hsl(150, 18%, 80%)" opacity="0.15" />
                  </svg>

                  {/* Destination label */}
                  <div className="absolute top-4 right-4 z-10 text-right">
                    <span className="font-display text-lg font-semibold text-foreground/70">{dest?.name}</span>
                    <span className="block text-xs font-body text-muted-foreground">{dest?.latitude.toFixed(2)}°, {dest?.longitude.toFixed(2)}°</span>
                  </div>

                  {/* Activity pins */}
                  {itinerary.days.map((day, dayIdx) => {
                    const color = `hsl(${(day.dayNumber * 55 + 150) % 360}, 55%, 45%)`;
                    return day.activityIds.map((aid, actIdx) => {
                      const act = getActivity(aid);
                      if (!act) return null;
                      // Distribute pins in a natural-looking pattern per day
                      const angle = (dayIdx * 1.8 + actIdx * 1.2) * 1.1;
                      const radius = 12 + dayIdx * 6 + actIdx * 3;
                      const cx = 45 + Math.cos(angle) * radius;
                      const cy = 42 + Math.sin(angle) * radius;
                      return (
                        <motion.div
                          key={`${day.dayNumber}-${aid}`}
                          initial={{ scale: 0, y: -10 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ delay: dayIdx * 0.15 + actIdx * 0.08, type: 'spring', stiffness: 300 }}
                          className="absolute group cursor-pointer"
                          style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -100%)' }}
                        >
                          {/* Pin */}
                          <div className="relative">
                            <svg width="24" height="32" viewBox="0 0 24 32" className="drop-shadow-md">
                              <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill={color} />
                              <circle cx="12" cy="11" r="5" fill="white" opacity="0.9" />
                              <text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="600" fill={color}>{actIdx + 1}</text>
                            </svg>
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                              <div className="bg-foreground text-background text-xs font-body px-2.5 py-1.5 rounded-md shadow-lg">
                                {act.name}
                                <span className="block text-[10px] opacity-70">{act.shift} · {act.duration}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    });
                  })}

                  {/* Connection lines between same-day pins */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    {itinerary.days.map((day, dayIdx) => {
                      const color = `hsl(${(day.dayNumber * 55 + 150) % 360}, 55%, 45%)`;
                      const points = day.activityIds.map((_, actIdx) => {
                        const angle = (dayIdx * 1.8 + actIdx * 1.2) * 1.1;
                        const radius = 12 + dayIdx * 6 + actIdx * 3;
                        return { x: 45 + Math.cos(angle) * radius, y: 42 + Math.sin(angle) * radius };
                      });
                      return points.slice(1).map((pt, i) => (
                        <line
                          key={`line-${dayIdx}-${i}`}
                          x1={`${points[i].x}%`} y1={`${points[i].y}%`}
                          x2={`${pt.x}%`} y2={`${pt.y}%`}
                          stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"
                        />
                      ));
                    })}
                  </svg>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Export Modal */}
        <Dialog open={exportOpen} onOpenChange={setExportOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Export Itinerary</DialogTitle>
            </DialogHeader>
            <pre className="text-xs font-body whitespace-pre-wrap bg-surface rounded-lg p-4 max-h-96 overflow-y-auto">
              {`${dest?.name}, ${dest?.country}\n${itinerary.departureDate} to ${itinerary.returnDate}\n\n${exportText}`}
            </pre>
            <Button
              onClick={() => { navigator.clipboard.writeText(exportText); toast.success('Copied to clipboard!'); }}
              className="rounded-full bg-primary text-primary-foreground"
            >
              Copy to Clipboard
            </Button>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </AppLayout>
  );
}
