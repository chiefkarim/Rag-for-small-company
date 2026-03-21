import { Database, Zap, Brain, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    title: "Fragmented Data, Unified",
    description:
      "Connect and centralize all your corporate data sources — wikis, docs, SharePoint, Notion — into one intelligent knowledge layer.",
    color: "#5DD7AD",
    tag: "Data Sources",
  },
  {
    icon: Zap,
    title: "Pipeline Orchestration",
    description:
      "Configure production-grade ingestion pipelines with chunking strategies, embedding models, and retrieval policies, all without code.",
    color: "#4fb3e8",
    tag: "Pipelines",
  },
  {
    icon: Brain,
    title: "Advanced RAG Pipelines",
    description:
      "Optimize retrieval, re-ranking, embedding, and AI-powered answers with precision. Enterprise accuracy at every query.",
    color: "#a78bfa",
    tag: "AI Engine",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect Your Data",
    desc: "Link Notion, SharePoint, Confluence, Google Drive and 1000+ more connectors.",
  },
  {
    step: "02",
    title: "Pipeline Configuration",
    desc: "Customize chunking, embedding models, vector storage and retrieval parameters.",
  },
  {
    step: "03",
    title: "AI-Accurate Answers",
    desc: "Your teams query corporate knowledge instantly with source-attributed AI responses.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            <span className="w-12 h-px bg-primary/30" />
            Capabilities
            <span className="w-12 h-px bg-primary/30" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-8 tracking-tight italic">
            Your Knowledge, Unlocked
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            Latafarraqo turns your fragmented corporate data into a 
            seamless, organic knowledge engine that your teams can actually trust.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-secondary transition-transform duration-500 group-hover:scale-110"
                  >
                    <Icon size={26} className="text-primary" />
                  </div>
                </div>

                <h3 className="text-foreground font-serif text-2xl mb-4 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                  {feat.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                  <span>Explore detail</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-24 opacity-30">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-medium">The Process</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* How it works — 3 steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative mb-32">
          {HOW_IT_WORKS.map((item, idx) => (
            <div key={item.step} className="relative text-center group">
              <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-secondary border border-border/50 flex items-center justify-center text-2xl font-serif italic text-primary mb-8 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm">
                {item.step}
              </div>
              <h3 className="text-foreground font-serif text-xl mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Large Feature Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-secondary/40 border border-border/50 rounded-[2.5rem] p-12 hover:bg-secondary/60 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database size={120} className="text-primary" />
            </div>
            <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold mb-4">
              Seamless Integrations
            </div>
            <h3 className="text-foreground text-3xl font-serif mb-6 italic">
              Connect Your World
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 font-light">
              From Notion to SharePoint, plug in your existing ecosystem with one-click connectors. 
              No code, just connection.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Notion", "SharePoint", "Confluence", "Google Drive", "Slack"].map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-12 hover:bg-primary/10 transition-all duration-500 group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
              <Brain size={120} className="text-primary" />
            </div>
            <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold mb-4">
              Intelligence Engine
            </div>
            <h3 className="text-foreground text-3xl font-serif mb-6 italic">
              The Heart of Insight
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 font-light">
              Create secure, contextual knowledge hubs that serve instant, evidence-backed answers.
            </p>
            <div className="flex items-center gap-12">
              <div className="space-y-1">
                <div className="text-primary text-4xl font-serif italic">24.5k</div>
                <div className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Indexed</div>
              </div>
              <div className="space-y-1">
                <div className="text-primary text-4xl font-serif italic">99.9%</div>
                <div className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
