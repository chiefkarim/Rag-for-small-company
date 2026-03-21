import { ArrowRight, Sparkles } from "lucide-react";

const INTEGRATIONS_LOGOS = [
  { name: "Notion", icon: "N", color: "#ffffff", bg: "#000000" },
  { name: "SharePoint", icon: "SP", color: "#ffffff", bg: "#0078d4" },
  { name: "Confluence", icon: "C", color: "#ffffff", bg: "#0052cc" },
  { name: "Google Drive", icon: "G", color: "#34a853", bg: "#ffffff" },
  { name: "Slack", icon: "S", color: "#ffffff", bg: "#4a154b" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Soft background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-10 text-primary text-sm font-medium tracking-wide">
          <Sparkles size={14} className="animate-pulse" />
          <span>Enterprise-grade RAG. Production-ready.</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-foreground leading-[1.1] max-w-5xl mx-auto mb-8 tracking-tight">
          The Intelligent Heart of Your{" "}
          <span className="italic text-primary">
            Enterprise Knowledge
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          From data chaos to actionable insights. Unite, process, and query your
          fragmented corporate data with organic, production-ready RAG applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <a
            href="/signup"
            className="group flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-full text-base hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start for Free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 text-foreground/80 hover:text-foreground font-medium px-10 py-4 rounded-full border border-border hover:bg-secondary/50 transition-all duration-300 text-base"
          >
            See how it works
          </a>
        </div>

        {/* Integrations strip */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <p className="text-muted-foreground/60 text-xs uppercase tracking-[0.2em] font-medium">
            Seamlessly integrates with
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {INTEGRATIONS_LOGOS.map((int) => (
              <div
                key={int.name}
                className="flex items-center gap-2 px-3 py-1.5"
                title={int.name}
              >
                <div
                  className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: int.bg,
                    color: int.color,
                    fontSize: "10px",
                  }}
                >
                  {int.icon}
                </div>
                <span className="text-foreground/60 text-sm font-medium">{int.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Screenshot Preview */}
        <div className="relative max-w-5xl mx-auto group">
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-3xl scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative rounded-[2rem] overflow-hidden border border-border/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-[1.01]">
            {/* Browser chrome bar - Simple */}
            <div className="flex items-center gap-2 bg-secondary/30 px-6 py-4 border-b border-border/50">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
            </div>

            {/* Actual screenshot */}
            <img
              src="/cover.png"
              alt="Dashboard Preview"
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default.png";
              }}
            />
          </div>

          {/* Minimalist Stat overlay */}
          <div className="absolute -left-8 -bottom-8 bg-card/90 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-2xl hidden lg:block animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className="text-primary font-serif italic text-3xl font-medium">24.5k</div>
            <div className="text-muted-foreground text-xs mt-1 uppercase tracking-widest">Docs Indexed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
