import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "Perfect for growing teams and small businesses.",
    color: "#5DD7AD",
    features: [
      "Full Features",
      "5 Knowledge Bases",
      "Unlimited Pipelines",
      "Standard Support",
      "50k Documents",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$149",
    period: "/month",
    desc: "For teams that need advanced collaboration and analytics.",
    color: "#4fb3e8",
    features: [
      "Full Features",
      "25 Knowledge Bases",
      "Unlimited Pipelines",
      "Priority Support",
      "500k Documents",
      "Analytics Dashboard",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations with custom requirements.",
    color: "#a78bfa",
    features: [
      "Unlimited Everything",
      "Custom Connectors",
      "Dedicated Support",
      "SLA Guarantee",
      "SOC2 / HIPAA",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e38] to-[#0a1628]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#122663]/40 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#5DD7AD] text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="w-8 h-px bg-[#5DD7AD]/60" />
            Pricing
            <span className="w-8 h-px bg-[#5DD7AD]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DD7AD] to-[#4fb3e8]">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[#122663] to-[#0d1e38] border-2 border-[#5DD7AD]/50 shadow-2xl shadow-[#5DD7AD]/10"
                  : "bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] text-[#0a1628] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div
                  className="text-xs uppercase tracking-widest font-semibold mb-2"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-white text-4xl font-black">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-white/45 text-sm leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <Check size={10} style={{ color: plan.color }} />
                    </div>
                    <span className="text-white/70">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                className={`group flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] text-[#0a1628] hover:shadow-lg hover:shadow-[#5DD7AD]/25 hover:scale-105"
                    : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                }`}
              >
                {plan.cta}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/30 text-xs mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
