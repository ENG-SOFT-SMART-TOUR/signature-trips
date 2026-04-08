import { useStore } from '@/store/useStore';
import { getDestination } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

export default function Diaries() {
  const { diaries } = useStore();

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2 block">Your stories</span>
            <h1 className="font-display text-4xl font-semibold">My Diaries</h1>
          </div>

          {diaries.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No diaries yet"
              description="Your travel diaries will appear here after completing a trip."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diaries.map((d, i) => {
                const dest = getDestination(d.destinationId);
                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link to={`/diary/${d.id}`} className="group hover-lift block">
                      <div className="rounded-xl bg-surface p-6 transition-all duration-300 group-hover:shadow-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-body text-xs text-muted-foreground bg-background px-3 py-1 rounded-full flex items-center gap-1">
                            {d.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                            {d.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-4">
                          {d.entries.length} entries
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline flex items-center gap-1">
                          Read diary <ArrowRight className="h-3 w-3" />
                        </span>
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
