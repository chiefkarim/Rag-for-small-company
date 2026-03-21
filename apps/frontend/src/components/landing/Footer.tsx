const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact", "Press"],
  Resources: ["Documentation", "API Reference", "Status", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

export default function Footer() {
  return (
    <footer className="relative bg-secondary/30 border-t border-border/50">
      {/* Top CTA bar - Elegant & Natural */}
      <div className="bg-primary py-24 relative overflow-hidden">
        {/* Subtle texture or pattern could go here */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-primary-foreground mb-8 italic">
            Ready to unify your enterprise insight?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Join forward-thinking organizations using Latafarraqo to cultivate 
            intelligence from their corporate data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/signup"
              className="bg-background text-foreground font-bold px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-300 text-base"
            >
              Get Started Free
            </a>
            <a
              href="#contact"
              className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium px-10 py-4 rounded-full border border-primary-foreground/20 hover:border-primary-foreground/40 hover:bg-primary-foreground/5 transition-all duration-300"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-8 group">
              <span className="text-xl font-serif font-bold italic tracking-tight text-foreground">
                Latafarraqo
              </span>
            </a>
            <p className="text-muted-foreground/60 text-xs leading-relaxed mb-8 font-light">
              The intelligent heart of your enterprise knowledge base. 
              Organic, simple, and production-ready RAG.
            </p>
            <div className="flex gap-4">
              {["𝕏", "in", "gh"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-foreground font-serif text-sm italic mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary text-sm font-light transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-10 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground/40 text-[10px] uppercase tracking-widest font-medium">
            © 2026 Latafarraqo. Crafted with care.
          </p>
          <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">SOC2 Type II</span>
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
