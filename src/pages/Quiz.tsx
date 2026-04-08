import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, QuizAnswers } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Waves, Mountain, Building2, TreePine, Compass, Landmark, Palmtree, UtensilsCrossed, Wallet, BadgeDollarSign, CreditCard, Gem, User, Heart, Users, UserPlus, Snail, Scale, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

const questions = [
  {
    key: 'landscape',
    title: 'Where do you feel most alive?',
    options: [
      { label: 'Beach', icon: Waves },
      { label: 'Mountains', icon: Mountain },
      { label: 'City', icon: Building2 },
      { label: 'Countryside', icon: TreePine },
    ],
  },
  {
    key: 'style',
    title: 'What moves your soul?',
    options: [
      { label: 'Adventure', icon: Compass },
      { label: 'Culture', icon: Landmark },
      { label: 'Relaxation', icon: Palmtree },
      { label: 'Gastronomy', icon: UtensilsCrossed },
    ],
  },
  {
    key: 'budget',
    title: 'Your comfort zone?',
    options: [
      { label: 'Budget', icon: Wallet },
      { label: 'Moderate', icon: BadgeDollarSign },
      { label: 'Comfortable', icon: CreditCard },
      { label: 'Luxury', icon: Gem },
    ],
  },
  {
    key: 'companion',
    title: 'Who shares the journey?',
    options: [
      { label: 'Solo', icon: User },
      { label: 'Couple', icon: Heart },
      { label: 'Family', icon: Users },
      { label: 'Friends', icon: UserPlus },
    ],
  },
  {
    key: 'pace',
    title: 'Your rhythm of discovery?',
    options: [
      { label: 'Slow & deep', icon: Snail },
      { label: 'Balanced', icon: Scale },
      { label: 'Fast & packed', icon: Zap },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const setQuizAnswers = useStore(s => s.setQuizAnswers);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const select = (value: string) => {
    setAnswers(a => ({ ...a, [current.key]: value }));
  };

  const next = () => {
    if (!answers[current.key as keyof QuizAnswers]) {
      toast.error('Please select an option');
      return;
    }
    if (step < questions.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      setQuizAnswers(answers);
      toast.success('Profile created! Here are your matches.');
      navigate('/matches');
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2 block">
              Step {step + 1} of {questions.length}
            </span>
            <Progress value={progress} className="h-1 bg-surface [&>div]:bg-primary" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-foreground">
                {current.title}
              </h2>
              <div className={`grid gap-4 ${current.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {current.options.map(opt => {
                  const selected = answers[current.key as keyof QuizAnswers] === opt.label;
                  const Icon = opt.icon;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => select(opt.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group relative flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-xl font-body text-sm font-medium transition-all duration-300 cursor-pointer ${
                        selected
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-surface text-foreground hover:shadow-md'
                      }`}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
                      >
                        <Icon
                          className={`h-8 w-8 md:h-10 md:w-10 transition-all duration-300 ${
                            selected
                              ? 'text-primary-foreground'
                              : 'text-primary group-hover:scale-110'
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <span className="text-sm md:text-base">{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-12">
            <Button
              variant="ghost"
              onClick={prev}
              disabled={step === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={next} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              {step === questions.length - 1 ? 'See Matches' : 'Next'} <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
