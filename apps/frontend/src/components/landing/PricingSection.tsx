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
    <section id="pricing" className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            <span className="w-12 h-px bg-primary/30" />
            Pricing
            <span className="w-12 h-px bg-primary/30" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-8 tracking-tight italic">
            Simple, Honest Plans
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-10 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.05] z-10"
                  : "bg-card border border-border/50 hover:bg-secondary/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-foreground text-background text-[10px] uppercase tracking-widest font-bold px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-10">
                <div
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-4 ${
                    plan.highlighted ? "text-primary-foreground/70" : "text-primary"
                  }`}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-serif italic font-medium">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed font-light ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-light">
                    <Check 
                      size={16} 
                      className={plan.highlighted ? "text-primary-foreground" : "text-primary"} 
                    />
                    <span className={plan.highlighted ? "text-primary-foreground/90" : "text-foreground/80"}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                className={`group flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {plan.cta}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground/40 text-[10px] uppercase tracking-widest mt-16 font-medium">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
