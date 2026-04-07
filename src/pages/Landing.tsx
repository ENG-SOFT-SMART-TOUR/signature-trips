import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, Map, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

export default function Landing() {
  const steps = [
    { icon: Sparkles, title: 'Take the Quiz', desc: 'Tell us about your ideal travel style and preferences.' },
    { icon: Compass, title: 'Get Matched', desc: 'We pair you with destinations that match your personality.' },
    { icon: Map, title: 'Plan Your Trip', desc: 'Build a detailed itinerary with curated local experiences.' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/hero-travel/1920/1080)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Compass className="h-8 w-8 text-accent" />
                <span className="font-body text-sm tracking-[0.2em] uppercase text-accent-foreground/80">
                  Signature Trips
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                Your journey,
                <br />
                <span className="italic">your signature</span>
              </h1>
              <p className="font-body text-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto">
                Personalized itineraries crafted around who you are. Every trip tells your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Steps */}
        <section className="py-24 px-4 bg-surface">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-3 block">How it works</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">Three steps to your perfect trip</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <step.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 text-center">
          <p className="text-sm text-muted-foreground font-body">© 2026 Signature Trips. Crafted with wanderlust.</p>
        </footer>
      </div>
    </PageTransition>
  );
}
