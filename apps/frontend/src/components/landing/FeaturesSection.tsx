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
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e38] to-[#0a1628]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#5DD7AD]/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-[#5DD7AD] text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="w-8 h-px bg-[#5DD7AD]/60" />
            Feature Deep Dive
            <span className="w-8 h-px bg-[#5DD7AD]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your RAG Challenge,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DD7AD] to-[#4fb3e8]">
              Unlocked
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            latafarraqo turns your fragmented corporate data into a
            production-ready RAG engine that your teams can actually use.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feat.color}15, transparent 70%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feat.color}15` }}
                  >
                    <Icon size={22} style={{ color: feat.color }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full border"
                    style={{
                      color: feat.color,
                      borderColor: `${feat.color}30`,
                      backgroundColor: `${feat.color}10`,
                    }}
                  >
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-3">
                  {feat.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feat.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: feat.color }}>
                  <span>Learn more</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-white/20 text-xs uppercase tracking-widest">How it works</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* How it works — 3 steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#5DD7AD]/30 to-transparent hidden sm:block" />

          {HOW_IT_WORKS.map((item, idx) => (
            <div key={item.step} className="relative text-center group">
              <div
                className={`relative z-10 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-xl font-black mb-4 transition-all duration-300 group-hover:scale-110 ${
                  idx === 0
                    ? "bg-gradient-to-br from-[#5DD7AD]/20 to-[#5DD7AD]/5 border border-[#5DD7AD]/30 text-[#5DD7AD]"
                    : idx === 1
                    ? "bg-gradient-to-br from-[#4fb3e8]/20 to-[#4fb3e8]/5 border border-[#4fb3e8]/30 text-[#4fb3e8]"
                    : "bg-gradient-to-br from-[#a78bfa]/20 to-[#a78bfa]/5 border border-[#a78bfa]/30 text-[#a78bfa]"
                }`}
              >
                {item.step}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Large Feature Highlight — Actionable Knowledge Bases */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="text-[#5DD7AD] text-xs uppercase tracking-widest font-semibold mb-3">
              Seamless Integrations
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">
              Connect Your Tools in Minutes
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              From Notion and SharePoint to Confluence and Google Drive — plug in
              your existing tools with one-click connectors. No custom code. No
              data locks.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Notion", "SharePoint", "Confluence", "Google Drive", "Slack", "wikis"].map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="text-[#4fb3e8] text-xs uppercase tracking-widest font-semibold mb-3">
              Knowledge Base Engine
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">
              Actionable Knowledge Bases
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Create your own secure, AI-powered knowledge hubs. From company
              wikis to product docs, serve instant, context-aware AI answers to
              any question.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[#4fb3e8] text-3xl font-black">24.5k</div>
                <div className="text-white/40 text-xs mt-1">Docs indexed</div>
              </div>
              <div>
                <div className="text-[#5DD7AD] text-3xl font-black">99.9%</div>
                <div className="text-white/40 text-xs mt-1">Uptime SLA</div>
              </div>
              <div>
                <div className="text-white text-3xl font-black">&lt;200ms</div>
                <div className="text-white/40 text-xs mt-1">Avg. query time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
