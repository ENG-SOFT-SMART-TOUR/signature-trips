import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, QuizAnswers } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

const questions = [
  { key: 'landscape', title: 'Your ideal landscape?', options: ['Beach', 'Mountains', 'City', 'Countryside'] },
  { key: 'style', title: 'Your travel style?', options: ['Adventure', 'Culture', 'Relaxation', 'Gastronomy'] },
  { key: 'budget', title: 'Your budget range?', options: ['Budget', 'Moderate', 'Comfortable', 'Luxury'] },
  { key: 'companion', title: 'Who are you traveling with?', options: ['Solo', 'Couple', 'Family', 'Friends'] },
  { key: 'pace', title: 'Your travel pace?', options: ['Slow & deep', 'Balanced', 'Fast & packed'] },
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
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
              <h2 className="font-display text-3xl font-semibold mb-8">{current.title}</h2>
              <div className="grid grid-cols-2 gap-3">
                {current.options.map(opt => {
                  const selected = answers[current.key as keyof QuizAnswers] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => select(opt)}
                      className={`p-5 rounded-lg text-left font-body text-sm font-medium transition-all duration-200 hover-lift ${
                        selected
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-surface text-foreground hover:bg-surface/80'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-10">
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
