import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-background">
                Drivo
              </span>
            </Link>
            <p className="text-background/70 text-sm">
              La première plateforme de vente et location de véhicules au Gabon. 
              Trouvez votre véhicule idéal en quelques clics.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/recherche" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Véhicules à vendre
                </Link>
              </li>
              <li>
                <Link to="/recherche?type=location" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Location de véhicules
                </Link>
              </li>
              <li>
                <Link to="/agences" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Agences partenaires
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Pour les agences</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inscription?role=agency" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link to="/dashboard/agence" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Espace agence
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Tarifs et abonnements
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  FAQ Agences
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Boulevard Triomphal, Libreville, Gabon</span>
              </li>
              <li>
                <a
                  href="tel:+24177000000"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  +241 77 00 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@drivo.ga"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  contact@drivo.ga
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Drivo. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-primary transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
