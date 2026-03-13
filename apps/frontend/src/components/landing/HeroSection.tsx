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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#122663] via-[#0a1628] to-[#0d2040]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5DD7AD]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#122663]/60 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      {/* Floating orb animations */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#5DD7AD] rounded-full animate-ping opacity-60" />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#5DD7AD] rounded-full animate-ping opacity-40 animation-delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#5DD7AD]/10 border border-[#5DD7AD]/30 rounded-full px-4 py-1.5 mb-8 text-[#5DD7AD] text-sm font-medium">
          <Sparkles size={14} />
          <span>Enterprise-grade RAG. Production-ready.</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto mb-6">
          The Intelligent Heart of Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e]">
            Enterprise Knowledge Base
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From data chaos to actionable insights. Unite, process, and query your
          fragmented corporate data with production-ready RAG applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/signup"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] text-[#0a1628] font-bold px-8 py-3.5 rounded-xl text-base hover:shadow-xl hover:shadow-[#5DD7AD]/30 hover:scale-105 transition-all duration-300"
          >
            Start for Free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 text-white/80 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-base"
          >
            See how it works
          </a>
        </div>

        {/* Integrations strip */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
            Connect with your tools in minutes
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {INTEGRATIONS_LOGOS.map((int) => (
              <div
                key={int.name}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-all duration-200"
              >
                <div
                  className="w-6 h-6 rounded text-xs font-bold flex items-center justify-center"
                  style={{
                    backgroundColor: int.bg,
                    color: int.color,
                    fontSize: "9px",
                  }}
                >
                  {int.icon}
                </div>
                <span className="text-white/60 text-xs">{int.name}</span>
              </div>
            ))}
            <span className="text-white/30 text-xs">+ more</span>
          </div>
        </div>

        {/* Dashboard Screenshot */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5DD7AD]/20 to-[#122663]/20 rounded-2xl blur-2xl scale-95" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 bg-[#0d1a30] px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 bg-white/5 rounded text-white/30 text-xs px-3 py-1 text-center">
                app.latafarraqo.com/dashboard
              </div>
            </div>

            {/* Actual screenshot */}
            <img
              src="/cover.png"
              alt="latafarraqo Knowledge Bases Dashboard"
              className="w-full h-auto object-cover"
              onError={(e) => {
                // fallback to public/default.png
                (e.target as HTMLImageElement).src = "/default.png";
              }}
            />
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-6 bottom-12 bg-[#0d1a30]/90 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-xl hidden lg:block">
            <div className="text-[#5DD7AD] font-bold text-2xl">24.5k</div>
            <div className="text-white/50 text-xs mt-0.5">Documents indexed</div>
            <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
              High
            </div>
          </div>

          <div className="absolute -right-6 top-16 bg-[#0d1a30]/90 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-xl hidden lg:block">
            <div className="text-white font-bold text-sm mb-1">
              Pipeline Status
            </div>
            <div className="space-y-1">
              {["Start Pipeline", "Embed Task", "Event Pipeline"].map((p) => (
                <div key={p} className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DD7AD]" />
                  <span className="text-white/60">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
