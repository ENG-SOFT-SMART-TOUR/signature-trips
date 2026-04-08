import { useStore } from '@/store/useStore';
import { destinations, getDestination } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { Map, BookOpen, Plus, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

export default function Dashboard() {
  const { user, savedDestinations, itineraries, diaries } = useStore();
  const navigate = useNavigate();
  const saved = savedDestinations.map(id => destinations.find(d => d.id === id)).filter(Boolean);

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2 block">Welcome back</span>
            <h1 className="font-display text-4xl font-semibold">{user?.name || 'Traveler'}</h1>
          </motion.div>

          {/* Saved Destinations */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">Saved Destinations</h2>
              <Link to="/matches" className="text-sm text-primary font-body hover:underline flex items-center gap-1">
                Explore more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {saved.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="No saved destinations yet"
                description="Explore our curated matches and save the ones that speak to you."
                actionLabel="Find Destinations"
                actionTo="/matches"
              />
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {saved.map(dest => dest && (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-shrink-0 w-72 group hover-lift"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[3/2]">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <h3 className="font-display text-lg font-semibold text-primary-foreground">{dest.name}</h3>
                        <p className="font-body text-xs text-primary-foreground/80">{dest.country}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/itinerary/new')}
                      variant="ghost"
                      className="rounded-full mt-3 text-sm w-full hover:bg-primary/10 hover:text-primary"
                    >
                      Plan Trip <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Itineraries */}
          <section id="itineraries" className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">My Itineraries</h2>
              <Button onClick={() => navigate('/itinerary/new')} variant="ghost" className="rounded-full text-sm">
                <Plus className="h-4 w-4 mr-1" /> New
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
                {itineraries.map(it => {
                  const dest = getDestination(it.destinationId);
                  return (
                    <Link key={it.id} to={`/itinerary/${it.id}`} className="group hover-lift">
                      <div className="rounded-lg bg-surface p-5">
                        <h3 className="font-display text-lg font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {it.departureDate} → {it.returnDate} · {it.days.length} days
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">View itinerary →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Diaries */}
          <section id="diaries">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">My Diaries</h2>
            </div>
            {diaries.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No diaries yet"
                description="Your travel diaries will appear here after completing a trip."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diaries.map(d => {
                  const dest = getDestination(d.destinationId);
                  return (
                    <Link key={d.id} to={`/diary/${d.id}`} className="group hover-lift">
                      <div className="rounded-lg bg-surface p-5">
                        <h3 className="font-display text-lg font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {d.entries.length} entries · {d.isPublic ? 'Public' : 'Private'}
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">Read diary →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </PageTransition>
    </AppLayout>
  );
}
