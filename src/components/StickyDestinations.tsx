import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

type Destination = {
  name: string;
  country: string;
  tag: string;
};

type Props = {
  destinations: Destination[];
};

/**
 * Apple-style pinned scroll sequence.
 * The section is tall (1 viewport per slide). The visual stage is sticky
 * and cross-fades between full-bleed destination images as the user scrolls.
 * Each image gets its own segment of scrollYProgress.
 */
export default function StickyDestinations({ destinations }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Total height = 1 intro vh + 1 vh per slide (so the last one breathes too)
  const slides = destinations.length;
  const totalHeight = `${(slides + 0.5) * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      className="relative bg-foreground"
      style={{ height: totalHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Eyebrow + heading — fixed during the whole sequence */}
        <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-10 md:pt-16 text-center pointer-events-none">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/70 mb-3 block">
            By mood
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-primary-foreground max-w-2xl mx-auto leading-[1.15]">
            Find a place that matches the day you're having
          </h2>
        </div>

        {/* Slides stack */}
        {destinations.map((dest, i) => (
          <DestSlide
            key={dest.name}
            destination={dest}
            index={i}
            total={slides}
            scrollYProgress={scrollYProgress}
            reduce={!!reduce}
          />
        ))}

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {destinations.map((_, i) => (
            <Dot key={i} index={i} total={slides} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestSlide({
  destination,
  index,
  total,
  scrollYProgress,
  reduce,
}: {
  destination: Destination;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduce: boolean;
}) {
  // Carve scroll into segments: each slide gets 1/total progress range.
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const fadeIn = start;
  const fullIn = start + seg * 0.2;
  const fullOut = end - seg * 0.2;
  const fadeOut = end;

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fullIn, fullOut, fadeOut],
    [0, 1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [fadeIn, fadeOut], [1.08, 1]);
  const textY = useTransform(scrollYProgress, [fadeIn, fullIn], [40, 0]);
  const filter = useTransform(
    scrollYProgress,
    [fadeIn, fullIn, fullOut, fadeOut],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
  );

  // First slide is visible immediately at scroll=0
  const initialOpacity = index === 0 ? 1 : 0;

  return (
    <motion.div
      className="absolute inset-0 will-change-[opacity,transform]"
      style={reduce ? { opacity: index === 0 ? 1 : 0 } : { opacity }}
      initial={{ opacity: initialOpacity }}
    >
      <motion.img
        src={`https://picsum.photos/seed/${destination.name.toLowerCase()}/1600/1000`}
        alt={`${destination.name}, ${destination.country}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
        style={reduce ? undefined : { scale, filter }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/40" />

      <motion.div
        className="absolute inset-x-0 bottom-24 z-20 px-6 text-center"
        style={reduce ? undefined : { y: textY }}
      >
        <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-body font-medium mb-4">
          {destination.tag}
        </span>
        <h3 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-2">
          {destination.name}
        </h3>
        <p className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-primary-foreground/80">
          {destination.country}
        </p>
      </motion.div>
    </motion.div>
  );
}

function Dot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const width = useTransform(scrollYProgress, [start, start + seg * 0.2, end - seg * 0.2, end], [8, 28, 28, 8]);
  const opacity = useTransform(scrollYProgress, [start, start + seg * 0.2, end - seg * 0.2, end], [0.4, 1, 1, 0.4]);
  return (
    <motion.span
      className="h-1.5 rounded-full bg-primary-foreground"
      style={{ width, opacity }}
    />
  );
}
