"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Car, Search as SearchIcon, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

type HeaderNavLink = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useApp();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks: HeaderNavLink[] = [
    { path: "/", label: "Accueil", icon: Car },
    { path: "/#vehicules", label: "Véhicules", icon: SearchIcon },
    { path: "/#pourquoi-nous", label: "Pourquoi nous", icon: Car },
    { path: "/#nos-agences", label: "Nos agences", icon: Car },
    { path: "/#nos-clients", label: "Nos clients", icon: Car },
  ];

  return (
    <header className="sticky top-0 z-50 w-full drivo-glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Drivo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/connexion">Connexion</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/inscription">
                    <LogIn className="h-4 w-4 mr-2" />
                    Inscription
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-border animate-slide-up"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    {link.label}
                  </span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <User className="h-5 w-5" />
                    Mon compte
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/connexion"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                      <LogIn className="h-5 w-5" />
                      Connexion
                    </Link>
                    <Button variant="default" className="mx-4" asChild>
                      <Link href="/inscription" onClick={() => setIsMenuOpen(false)}>
                        Inscription
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
