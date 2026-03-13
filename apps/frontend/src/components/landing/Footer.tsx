const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact", "Press"],
  Resources: ["Documentation", "API Reference", "Status", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#080f1e] border-t border-white/5">
      {/* Top CTA bar */}
      <div className="bg-gradient-to-r from-[#122663] via-[#1a3a7c] to-[#122663] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to unify your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DD7AD] to-[#4fb3e8]">
              enterprise knowledge?
            </span>
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Join hundreds of enterprises using latafarraqo to turn fragmented data
            into actionable, AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] text-[#0a1628] font-bold px-8 py-3.5 rounded-xl hover:shadow-xl hover:shadow-[#5DD7AD]/30 hover:scale-105 transition-all duration-300 text-sm"
            >
              Get Started Free
            </a>
            <a
              href="#contact"
              className="text-white/70 hover:text-white text-sm font-medium px-8 py-3.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <img
                src="/vector/isolated-monochrome-white.svg"
                alt="latafarraqo"
                className="h-8 w-8 group-hover:scale-110 transition-transform"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-xs tracking-wider uppercase">
                  latafarraqo
                </span>
                <span className="text-[#5DD7AD] text-[7px] tracking-[0.2em] uppercase">
                  la tafarraqo
                </span>
              </div>
            </a>
            <p className="text-white/35 text-xs leading-relaxed mb-4">
              The intelligent heart of your enterprise knowledge base. Production-ready RAG for real teams.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "gh"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-xs font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white text-xs transition-colors duration-200"
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
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 latafarraqo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="/vector/default-monochrome-white.svg"
              alt="latafarraqo"
              className="h-5 opacity-20 hover:opacity-40 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
