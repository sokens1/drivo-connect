import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : Janvier 2024
            </p>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">1. Collecte des données</h2>
              <p className="text-muted-foreground mb-4">
                Nous collectons les informations suivantes lorsque vous utilisez Drivo :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Informations d'identification (nom, email, téléphone)</li>
                <li>Informations de paiement (via nos prestataires sécurisés)</li>
                <li>Données de localisation (avec votre consentement)</li>
                <li>Données de navigation et d'utilisation de la plateforme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">2. Utilisation des données</h2>
              <p className="text-muted-foreground mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fournir et améliorer nos services</li>
                <li>Faciliter les transactions entre utilisateurs</li>
                <li>Vous envoyer des notifications importantes</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Prévenir la fraude et assurer la sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">3. Partage des données</h2>
              <p className="text-muted-foreground mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Les agences partenaires (pour faciliter les transactions)</li>
                <li>Nos prestataires de paiement (Orange Money, Airtel Money)</li>
                <li>Les autorités compétentes (si requis par la loi)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">4. Sécurité des données</h2>
              <p className="text-muted-foreground mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">5. Vos droits</h2>
              <p className="text-muted-foreground mb-4">
                Conformément à la réglementation applicable, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">7. Contact</h2>
              <p className="text-muted-foreground">
                Pour exercer vos droits ou pour toute question concernant cette politique, contactez notre délégué à la protection des données à{" "}
                <a href="mailto:privacy@drivo.ga" className="text-primary hover:underline">
                  privacy@drivo.ga
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
