"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, ChevronRight, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const ContactPage = () => {
  const { user } = useApp();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé ! Notre équipe vous répondra sous 24h.");
    setFormData({ ...formData, subject: "", message: "" });
    setIsSubmitting(false);
  };

  const MainContent = () => (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            Aide & Support
          </h1>
          <p className="text-muted-foreground text-lg">
            Comment pouvons-nous vous aider aujourd'hui ?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info & FAQs */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Phone className="h-24 w-24 rotate-12" />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl w-fit mb-4">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                <p className="text-slate-300 text-sm mb-4">Lun - Ven, 8h - 18h</p>
                <a href="tel:+24177000000" className="text-xl font-bold hover:text-primary transition-colors">
                  +241 77 00 00 00
                </a>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-2xl">
                  <MessageCircle className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">WhatsApp</h3>
                  <p className="text-sm text-slate-500">Réponse instantanée</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="https://wa.me/24177000000" target="_blank" rel="noopener noreferrer">
                    <ChevronRight className="h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Email</h3>
                  <p className="text-sm text-slate-500">support@drivo.ga</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="mailto:support@drivo.ga">
                    <ChevronRight className="h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg px-2">Questions fréquentes</h3>
            <div className="space-y-2">
              {[
                "Comment réserver un véhicule ?",
                "Quels sont les documents requis ?",
                "Comment annuler ma réservation ?",
                "Quels modes de paiement ?"
              ].map((q, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-transparent hover:border-primary/20 hover:bg-slate-50 transition-all text-left group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary">{q}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 p-8 border-b">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Nous traitons vos demandes en moins de 24 heures.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-slate-700">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    className="h-12 bg-slate-50 border-none rounded-xl px-4 text-slate-900 shadow-inner"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="h-12 bg-slate-50 border-none rounded-xl px-4 text-slate-900 shadow-inner"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+241 77 00 00 00"
                    className="h-12 bg-slate-50 border-none rounded-xl px-4 text-slate-900 shadow-inner"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-bold text-slate-700">Sujet</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) => setFormData({ ...formData, subject: v })}
                  >
                    <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl px-4 text-slate-900 shadow-inner">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="general">Question générale</SelectItem>
                      <SelectItem value="reservation">Problème de réservation</SelectItem>
                      <SelectItem value="agency">Devenir agence partenaire</SelectItem>
                      <SelectItem value="payment">Question sur le paiement</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-bold text-slate-700">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Comment pouvons-nous vous aider ? Soyez aussi précis que possible."
                  rows={6}
                  className="bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 shadow-inner resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full h-14 rounded-xl text-lg shadow-lg hover:translate-y-[-2px] transition-all" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 text-center md:text-left">
        <div className="p-6">
          <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
            <MapPin className="h-6 w-6 text-slate-600" />
          </div>
          <h4 className="font-bold text-slate-900">Siège Social</h4>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Boulevard Triomphal<br />
            Libreville, Gabon
          </p>
        </div>
        <div className="p-6">
          <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
            <Globe className="h-6 w-6 text-slate-600" />
          </div>
          <h4 className="font-bold text-slate-900">Étendue</h4>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Disponible dans l'Estuaire, Moyen-Ogooué et Ogooué-Maritime.
          </p>
        </div>
        <div className="h-fit">
          <Card className="bg-primary/5 border-dashed border-2 border-primary/20 p-6 rounded-2xl">
            <h4 className="font-bold text-primary flex items-center gap-2 justify-center md:justify-start">
              <HelpCircle className="h-5 w-5" />
              Centre d'aide en ligne
            </h4>
            <p className="text-sm text-slate-600 mt-2 mb-4">
              Consultez notre documentation complète pour tout savoir sur Drivo.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline">
              Accéder à la base de connaissance →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  if (user) {
    return (
      <DashboardLayout>
        <div className="py-8">
          <MainContent />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <MainContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
