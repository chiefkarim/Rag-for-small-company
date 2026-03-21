import { Sparkles } from "lucide-react";

const INTEGRATIONS = [
  { name: "Notion", bg: "#000", color: "#fff", label: "N" },
  { name: "Microsoft", bg: "#0078d4", color: "#fff", label: "M" },
  { name: "Atlassian", bg: "#0052cc", color: "#fff", label: "A" },
  { name: "Instentry", bg: "#ff6b35", color: "#fff", label: "I" },
  { name: "Confluence", bg: "#0052cc", color: "#fff", label: "C" },
  { name: "X / Twitter", bg: "#000", color: "#fff", label: "X" },
  { name: "wikis", bg: "#3b5998", color: "#fff", label: "W" },
  { name: "Slack", bg: "#4a154b", color: "#fff", label: "S" },
  { name: "Speak to Sales", bg: "#5DD7AD", color: "#0a1628", label: "💬" },
  { name: "Google Drive", bg: "#fff", color: "#34a853", label: "G" },
  { name: "SharePoint", bg: "#0078d4", color: "#fff", label: "SP" },
  { name: "OneDrive", bg: "#0078d4", color: "#fff", label: "OD" },
];

const TRUSTED = [
  { name: "FictionHall", desc: "These tedious models couldn't have been more efficient! Your Free" },
  { name: "Microsoft", desc: "This is with every enterprise of imaginative company for your team" },
  { name: "Atlassian", desc: '"Power-searching, but what you could support for the Free"' },
  { name: "Instentry", desc: "" },
];

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Integration logos grid */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
              <span className="w-12 h-px bg-primary/30" />
              Connectivity
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-8 leading-tight italic">
              Works with tools your team loves
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-light">
              Connect all your corporate data sources out of the box. 
              1000+ integrations available. Custom connectors for any source.
            </p>

            {/* Grid of integration logos */}
            <div className="grid grid-cols-4 gap-4">
              {INTEGRATIONS.map((int) => (
                <div
                  key={int.name}
                  title={int.name}
                  className="group flex flex-col items-center gap-3 bg-card border border-border/50 rounded-2xl p-4 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm"
                    style={{
                      backgroundColor: int.bg,
                      color: int.color,
                    }}
                  >
                    {int.label}
                  </div>
                  <span className="text-muted-foreground text-[10px] uppercase tracking-widest text-center leading-tight truncate w-full group-hover:text-primary transition-colors">
                    {int.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Trusted by & Stats */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 text-muted-foreground/40 text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
                <span className="w-12 h-px bg-border" />
                Trusted by
              </div>
              <div className="grid grid-cols-2 gap-6 mb-12">
                {TRUSTED.map((t) => (
                  <div
                    key={t.name}
                    className="bg-card border border-border/30 rounded-2xl p-5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="font-serif italic text-foreground text-lg mb-2">
                      {t.name}
                    </div>
                    {t.desc && (
                      <p className="text-muted-foreground text-xs leading-relaxed font-light">
                        {t.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats Box - Simple & Natural */}
              <div className="bg-secondary/50 border border-border/50 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-[0.03]">
                  <Sparkles size={160} className="text-primary" />
                </div>
                <div className="grid grid-cols-3 gap-8 text-center relative z-10">
                  <div className="space-y-1">
                    <div className="text-primary text-3xl font-serif italic">1000+</div>
                    <div className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Connectors</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-foreground text-3xl font-serif italic">5min</div>
                    <div className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Setup</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-primary text-3xl font-serif italic">SOC2</div>
                    <div className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
