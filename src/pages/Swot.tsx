import { motion } from "framer-motion";

const strengths = [
  "Equipe bem dividida com PO, Scrum Master e Tech Lead alinhados e entrosados",
  "Stack tecnológica consolidada (Java + React + PostgreSQL) e arquitetura Clean Architecture bem definida",
  "Integração Git + Jira funcionando com commits linkados às tasks",
  "Protótipo navegável entregue no Lovable com fluxo completo da Release 1",
  "Diagramas ER, Diagrama de Classes, README, Roadmap de Releases, Product Backlog e Recursos por Release documentados",
  "Projeto inteiro definido e planejado desde a Sprint 1 (todas as releases estruturadas)",
];

const weaknesses = [
  "Ajuste de ritmo no início da Sprint devido ao feriado e à Páscoa",
];

const opportunities = [
  "Base sólida e bem construída para acelerar a entrega das próximas releases",
  "Projeto totalmente definido permite foco total na execução a partir da Sprint 2",
  "Equipe alinhada pode alavancar entregas utilizando a inteligência artificial como apoio",
];

const threats = [
  "Prazo curto entre as sprints",
  "Complexidade crescente nas próximas releases (mapa, galeria, diário)",
  "Dependência de APIs externas (Google Maps, S3/MinIO) nas releases 3 e 4",
];

interface QuadrantProps {
  title: string;
  emoji: string;
  items: string[];
  bgClass: string;
  titleColor: string;
  delay: number;
}

function Quadrant({ title, emoji, items, bgClass, titleColor, delay }: QuadrantProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${bgClass} rounded-2xl p-6 md:p-8 flex flex-col gap-4`}
    >
      <h2 className={`font-['Playfair_Display'] text-xl md:text-2xl font-medium ${titleColor} flex items-center gap-2`}>
        <span className="text-2xl">{emoji}</span> {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.08 }}
            className="flex items-start gap-3 text-sm md:text-base leading-relaxed"
          >
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${titleColor === "text-primary" ? "bg-primary" : titleColor === "text-accent" ? "bg-accent" : titleColor === "text-highlight" ? "bg-highlight" : "bg-destructive"}`} />
            <span className="text-foreground/85">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Swot() {
  return (
    <div className="min-h-screen bg-background">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
            Signature Trips
          </p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
            Matriz SWOT
          </h1>
          <p className="text-muted-foreground text-lg">Sprint 1 — Análise Estratégica</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Quadrant
            title="Forças"
            emoji="💪"
            items={strengths}
            bgClass="bg-primary/[0.06]"
            titleColor="text-primary"
            delay={0.1}
          />
          <Quadrant
            title="Fraquezas"
            emoji="⚠️"
            items={weaknesses}
            bgClass="bg-accent/[0.06]"
            titleColor="text-accent"
            delay={0.2}
          />
          <Quadrant
            title="Oportunidades"
            emoji="🚀"
            items={opportunities}
            bgClass="bg-highlight/[0.08]"
            titleColor="text-highlight"
            delay={0.3}
          />
          <Quadrant
            title="Ameaças"
            emoji="🔴"
            items={threats}
            bgClass="bg-destructive/[0.06]"
            titleColor="text-destructive"
            delay={0.4}
          />
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground text-xs mt-12 tracking-wide"
        >
          © {new Date().getFullYear()} Signature Trips — Sprint Review
        </motion.p>
      </div>
    </div>
  );
}
