import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Integrations", href: "#integrations" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif font-bold tracking-tight text-foreground italic">
              Latafarraqo
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/signin"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 pt-6 pb-10 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-xl font-serif text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 pt-4">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-center text-foreground font-medium py-3 rounded-full border border-border hover:bg-secondary/50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="text-center bg-primary text-primary-foreground font-semibold py-3 rounded-full shadow-lg shadow-primary/10"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
