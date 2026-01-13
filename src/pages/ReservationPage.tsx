import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Calendar,
  CreditCard,
  Shield,
  Check,
  Smartphone,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";
import { toast } from "sonner";

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, user } = useApp();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("orange_money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [insurance, setInsurance] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle || !vehicle.pricePerDay) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Véhicule non disponible</h2>
              <p className="text-muted-foreground mb-6">
                Ce véhicule n'est pas disponible à la location.
              </p>
              <Button variant="hero" asChild>
                <Link to="/recherche?type=location">Voir les véhicules disponibles</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate pricing
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const basePrice = days * (vehicle.pricePerDay || 0);
  const insurancePrice = insurance ? days * 15000 : 0;
  const deliveryPrice = delivery ? 25000 : 0;
  const totalPrice = basePrice + insurancePrice + deliveryPrice;

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour réserver");
      navigate("/connexion");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Veuillez sélectionner les dates");
      return;
    }

    if (!phoneNumber) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep(3);
    toast.success("Réservation confirmée !");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to={`/vehicule/${vehicle.id}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour au véhicule
            </Link>
          </Button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 md:w-24 h-1 ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>1. Choisissez vos dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Date de début</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">Date de fin</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Options supplémentaires</h3>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Assurance tous risques</p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(15000)}/jour
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          checked={insurance}
                          onCheckedChange={(checked) => setInsurance(checked as boolean)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Car className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Livraison à domicile</p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(25000)} (forfait)
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          checked={delivery}
                          onCheckedChange={(checked) => setDelivery(checked as boolean)}
                        />
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => setStep(2)}
                      disabled={!startDate || !endDate || days <= 0}
                    >
                      Continuer vers le paiement
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>2. Paiement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Mode de paiement</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: "orange_money", label: "Orange Money", color: "bg-orange-500" },
                          { id: "airtel_money", label: "Airtel Money", color: "bg-red-500" },
                          { id: "card", label: "Carte bancaire", color: "bg-primary" },
                        ].map((method) => (
                          <button
                            key={method.id}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              paymentMethod === method.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div
                              className={`w-10 h-10 mx-auto mb-2 rounded-full ${method.color} flex items-center justify-center`}
                            >
                              {method.id === "card" ? (
                                <CreditCard className="h-5 w-5 text-primary-foreground" />
                              ) : (
                                <Smartphone className="h-5 w-5 text-primary-foreground" />
                              )}
                            </div>
                            <p className="font-medium text-sm">{method.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+241 77 00 00 00"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Vous recevrez une notification pour confirmer le paiement
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button
                        variant="hero"
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={isProcessing || !phoneNumber}
                      >
                        {isProcessing ? "Traitement..." : `Payer ${formatPrice(totalPrice)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="h-10 w-10 text-success" />
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      Réservation confirmée !
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Vous recevrez un SMS de confirmation avec les détails de votre réservation.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                      <h3 className="font-semibold mb-3">Récapitulatif</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Véhicule</span>
                          <span>{vehicle.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dates</span>
                          <span>{startDate} - {endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durée</span>
                          <span>{days} jour{days > 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total payé</span>
                          <span className="text-success">{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="hero" asChild>
                        <Link to="/dashboard">Voir mes réservations</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/">Retour à l'accueil</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{vehicle.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(vehicle.pricePerDay || 0)}/jour
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {days} jour{days > 1 ? "s" : ""} × {formatPrice(vehicle.pricePerDay || 0)}
                      </span>
                      <span>{formatPrice(basePrice)}</span>
                    </div>
                    {insurance && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assurance</span>
                        <span>{formatPrice(insurancePrice)}</span>
                      </div>
                    )}
                    {delivery && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Livraison</span>
                        <span>{formatPrice(deliveryPrice)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Paiement sécurisé</span>
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

export default ReservationPage;
