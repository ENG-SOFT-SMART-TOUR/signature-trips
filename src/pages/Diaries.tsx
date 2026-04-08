import { useStore } from '@/store/useStore';
import { getDestination } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import AppLayout from '@/components/AppLayout';

export default function Diaries() {
  const { diaries } = useStore();

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1 block">Your memories</span>
            <h1 className="font-display text-3xl font-semibold">Diaries</h1>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={`/diary/${d.id}`} className="group hover-lift block">
                      <div className="rounded-xl bg-surface p-5 border border-border/30">
                        <h3 className="font-display text-lg font-semibold mb-1">{dest?.name || 'Unknown'}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          {d.entries.length} entries · {d.isPublic ? 'Public' : 'Private'}
                        </p>
                        <span className="font-body text-xs text-primary group-hover:underline">Read diary →</span>
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
