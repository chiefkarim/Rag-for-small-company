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
    <section id="integrations" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#0d1e38]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5DD7AD]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Integration logos grid */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#5DD7AD] text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="w-8 h-px bg-[#5DD7AD]/60" />
              Connect Your Tools in Minutes
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Works with tools{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DD7AD] to-[#4fb3e8]">
                your team loves
              </span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              Connect all your corporate data sources out of the box. 1000+
              integrations available. Custom connectors for any source.
            </p>

            {/* Grid of integration logos */}
            <div className="grid grid-cols-4 gap-3">
              {INTEGRATIONS.map((int) => (
                <div
                  key={int.name}
                  title={int.name}
                  className="group flex flex-col items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg"
                    style={{
                      backgroundColor: int.bg,
                      color: int.color,
                      boxShadow: `0 4px 12px ${int.bg}40`,
                    }}
                  >
                    {int.label}
                  </div>
                  <span className="text-white/40 text-[9px] text-center leading-tight truncate w-full text-center group-hover:text-white/60 transition-colors">
                    {int.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Trusted by */}
          <div>
            <div className="inline-flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-semibold mb-6">
              <span className="w-8 h-px bg-white/20" />
              Trusted by Innovations
            </div>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {TRUSTED.map((t) => (
                <div
                  key={t.name}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="font-semibold text-white text-sm mb-1">
                    {t.name}
                  </div>
                  {t.desc && (
                    <p className="text-white/40 text-xs leading-relaxed">
                      {t.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-[#5DD7AD]/10 to-[#122663]/30 border border-[#5DD7AD]/20 rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[#5DD7AD] text-2xl font-black">1000+</div>
                  <div className="text-white/40 text-xs mt-1">Connectors</div>
                </div>
                <div>
                  <div className="text-white text-2xl font-black">5min</div>
                  <div className="text-white/40 text-xs mt-1">Setup time</div>
                </div>
                <div>
                  <div className="text-[#4fb3e8] text-2xl font-black">SOC2</div>
                  <div className="text-white/40 text-xs mt-1">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
