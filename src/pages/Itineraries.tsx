import { useStore } from '@/store/useStore';
import { getDestination } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { Map, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

export default function Itineraries() {
  const { itineraries } = useStore();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1 block">Plan your trips</span>
              <h1 className="font-display text-3xl font-semibold">Itineraries</h1>
            </div>
            <Button onClick={() => navigate('/itinerary/new')} className="rounded-full">
              <Plus className="h-4 w-4 mr-1" /> New Itinerary
            </Button>
          </div>

          {itineraries.length === 0 ? (
            <EmptyState
              icon={Map}
              title="No itineraries yet"
              description="Create your first itinerary and start planning your dream trip."
              actionLabel="Create Itinerary"
              actionTo="/itinerary/new"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((it, i) => {
                const dest = getDestination(it.destinationId);
                return (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={`/itinerary/${it.id}`} className="group hover-lift block">
                      <div className="rounded-xl bg-surface p-5 border border-border/30">
                        <h3 className="font-display text-lg font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {it.departureDate} → {it.returnDate} · {it.days.length} days
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">View itinerary →</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </PageTransition>
    </AppLayout>
  );
}
