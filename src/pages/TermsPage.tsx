import { Link } from "react-router-dom";
import { Car, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Conditions Générales d'Utilisation
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : Janvier 2024
            </p>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">1. Présentation du service</h2>
              <p className="text-muted-foreground mb-4">
                Drivo est une plateforme numérique gabonaise qui met en relation des agences de vente et de location de véhicules avec des clients particuliers et professionnels. Notre service permet aux agences de publier leurs offres de véhicules et aux clients de rechercher, comparer et réserver des véhicules.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">2. Inscription et compte utilisateur</h2>
              <p className="text-muted-foreground mb-4">
                Pour utiliser certaines fonctionnalités de Drivo, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités effectuées sous votre compte.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Vous devez fournir des informations exactes et à jour</li>
                <li>Vous devez avoir au moins 18 ans pour créer un compte</li>
                <li>Un seul compte par personne physique ou morale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">3. Utilisation du service</h2>
              <p className="text-muted-foreground mb-4">
                En utilisant Drivo, vous vous engagez à :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Ne pas publier de contenu illégal, offensant ou frauduleux</li>
                <li>Respecter les droits de propriété intellectuelle</li>
                <li>Ne pas utiliser le service à des fins commerciales non autorisées</li>
                <li>Ne pas tenter de compromettre la sécurité de la plateforme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">4. Transactions et paiements</h2>
              <p className="text-muted-foreground mb-4">
                Drivo facilite les transactions entre agences et clients mais n'est pas partie aux contrats de vente ou de location. Les paiements sont sécurisés via nos partenaires (Orange Money, Airtel Money, cartes bancaires).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">5. Responsabilité</h2>
              <p className="text-muted-foreground mb-4">
                Drivo agit en tant qu'intermédiaire et ne peut être tenu responsable des litiges entre utilisateurs, de l'état des véhicules proposés ou des comportements des parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">6. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions, contactez-nous à{" "}
                <a href="mailto:legal@drivo.ga" className="text-primary hover:underline">
                  legal@drivo.ga
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

export default TermsPage;
