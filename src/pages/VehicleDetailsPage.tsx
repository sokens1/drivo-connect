import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Fuel,
  Settings2,
  Shield,
  Phone,
  MessageCircle,
  Star,
  Check,
  Car,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { formatPrice, formatNumber } from "@/data/mockData";
import { toast } from "sonner";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, favorites, toggleFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);
  const isFavorite = vehicle ? favorites.includes(vehicle.id) : false;

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Véhicule non trouvé</h1>
            <p className="text-muted-foreground mb-4">
              Ce véhicule n'existe pas ou a été retiré.
            </p>
            <Button asChild>
              <Link to="/recherche">Voir tous les véhicules</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: vehicle.title,
        text: `Découvrez ce véhicule sur Drivo: ${vehicle.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  const handleContact = (method: string) => {
    if (method === "call") {
      window.location.href = `tel:${vehicle.agency.phone}`;
    } else if (method === "whatsapp") {
      window.open(`https://wa.me/${vehicle.agency.phone.replace(/\s/g, "")}?text=Bonjour, je suis intéressé par ${vehicle.title}`, "_blank");
    }
    setShowContactDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Fil d'Ariane">
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Accueil
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/recherche" className="text-muted-foreground hover:text-primary">
                Véhicules
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{vehicle.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/10]">
                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                {vehicle.images.length > 1 && (
                  <>
                    <Button
                      variant="glass"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? vehicle.images.length - 1 : prev - 1
                        )
                      }
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="glass"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === vehicle.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {/* Image indicators */}
                {vehicle.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {vehicle.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-primary-foreground w-6"
                            : "bg-primary-foreground/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="glass"
                    size="icon"
                    className="rounded-full"
                    onClick={() => toggleFavorite(vehicle.id)}
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-destructive text-destructive" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                    className="rounded-full"
                    onClick={handleShare}
                    aria-label="Partager"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Type badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {vehicle.type === "vente" && <Badge variant="sale">À vendre</Badge>}
                  {vehicle.type === "location" && <Badge variant="rental">Location</Badge>}
                  {vehicle.type === "both" && (
                    <>
                      <Badge variant="sale">Vente</Badge>
                      <Badge variant="rental">Location</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Basic Info */}
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {vehicle.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {vehicle.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {vehicle.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Settings2 className="h-4 w-4" />
                    {formatNumber(vehicle.km)} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" />
                    {vehicle.fuel}
                  </span>
                </div>
              </div>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Caractéristiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Année</p>
                      <p className="font-semibold text-foreground">{vehicle.year}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Kilométrage</p>
                      <p className="font-semibold text-foreground">{formatNumber(vehicle.km)} km</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Carburant</p>
                      <p className="font-semibold text-foreground capitalize">{vehicle.fuel}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-semibold text-foreground capitalize">{vehicle.transmission}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Équipements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        <Check className="h-3 w-3" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Price & Contact */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Price */}
                  <div>
                    {vehicle.type !== "location" && (
                      <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Prix de vente</p>
                        <p className="text-3xl font-bold text-foreground">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>
                    )}
                    {vehicle.pricePerDay && (
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Prix de location</p>
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(vehicle.pricePerDay)}/jour
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Agency */}
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <img
                      src={vehicle.agency.logo}
                      alt={vehicle.agency.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{vehicle.agency.name}</p>
                        {vehicle.agency.verified && (
                          <Shield className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        {vehicle.agency.rating} ({vehicle.agency.reviews} avis)
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                      <DialogTrigger asChild>
                        <Button variant="hero" className="w-full" size="lg">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Contacter l'agence
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contacter {vehicle.agency.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <Button
                            variant="outline"
                            className="w-full h-14 justify-start gap-4"
                            onClick={() => handleContact("call")}
                          >
                            <Phone className="h-5 w-5 text-primary" />
                            <div className="text-left">
                              <p className="font-medium">Appeler</p>
                              <p className="text-sm text-muted-foreground">{vehicle.agency.phone}</p>
                            </div>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full h-14 justify-start gap-4"
                            onClick={() => handleContact("whatsapp")}
                          >
                            <Smartphone className="h-5 w-5 text-success" />
                            <div className="text-left">
                              <p className="font-medium">WhatsApp</p>
                              <p className="text-sm text-muted-foreground">Envoyer un message</p>
                            </div>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {vehicle.pricePerDay && (
                      <Button variant="success" className="w-full" size="lg" asChild>
                        <Link to={`/reservation/${vehicle.id}`}>
                          <Calendar className="h-5 w-5 mr-2" />
                          Réserver maintenant
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-6 pt-4 border-t text-sm text-muted-foreground">
                    <span>{vehicle.views} vues</span>
                    <span>{vehicle.interests} intéressés</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetailsPage;
