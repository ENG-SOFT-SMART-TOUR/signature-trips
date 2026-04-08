import { useStore } from '@/store/useStore';
import { destinations, getDestination } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { Map, BookOpen, Heart, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-surface border border-border/30 p-5 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold">{value}</p>
        <p className="font-body text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user, savedDestinations, itineraries, diaries } = useStore();
  const navigate = useNavigate();
  const saved = savedDestinations.map(id => destinations.find(d => d.id === id)).filter(Boolean);

  const quizProfile = user?.quizAnswers?.style
    ? user.quizAnswers.style.charAt(0).toUpperCase() + user.quizAnswers.style.slice(1)
    : 'Not set';

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1 block">Welcome back</span>
            <h1 className="font-display text-3xl font-semibold">{user?.name || 'Traveler'}</h1>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard label="Saved Places" value={savedDestinations.length} icon={Heart} />
            <StatCard label="Itineraries" value={itineraries.length} icon={Map} />
            <StatCard label="Diaries" value={diaries.length} icon={BookOpen} />
            <StatCard label="Travel Style" value={quizProfile} icon={Sparkles} />
          </div>

          {/* Saved Destinations */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold">Saved Destinations</h2>
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
              <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {saved.map(dest => dest && (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-shrink-0 w-64 group hover-lift"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[3/2]">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <h3 className="font-display text-base font-semibold text-primary-foreground">{dest.name}</h3>
                        <p className="font-body text-xs text-primary-foreground/80">{dest.country}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Itineraries */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold">Recent Itineraries</h2>
              <Link to="/itineraries" className="text-sm text-primary font-body hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {itineraries.length === 0 ? (
              <EmptyState
                icon={Map}
                title="No itineraries yet"
                description="Create your first itinerary and start planning."
                actionLabel="Create Itinerary"
                actionTo="/itinerary/new"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {itineraries.slice(0, 3).map(it => {
                  const dest = getDestination(it.destinationId);
                  return (
                    <Link key={it.id} to={`/itinerary/${it.id}`} className="group hover-lift">
                      <div className="rounded-xl bg-surface border border-border/30 p-5">
                        <h3 className="font-display text-base font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {it.departureDate} → {it.returnDate} · {it.days.length} days
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">View →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recent Diaries */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold">Recent Diaries</h2>
              <Link to="/diaries" className="text-sm text-primary font-body hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {diaries.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No diaries yet"
                description="Your travel diaries will appear here after completing a trip."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {diaries.slice(0, 3).map(d => {
                  const dest = getDestination(d.destinationId);
                  return (
                    <Link key={d.id} to={`/diary/${d.id}`} className="group hover-lift">
                      <div className="rounded-xl bg-surface border border-border/30 p-5">
                        <h3 className="font-display text-base font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {d.entries.length} entries · {d.isPublic ? 'Public' : 'Private'}
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">Read →</span>
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
