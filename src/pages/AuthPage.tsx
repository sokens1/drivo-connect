import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Car, Mail, Lock, User, Phone, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<"client" | "agency">("client");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(loginEmail)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }
    if (loginPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock successful login
    setUser({
      id: "1",
      email: loginEmail,
      name: "Jean-Pierre",
      phone: "+241 77 00 00 00",
      role: "client",
      favorites: [],
      reservations: [],
    });
    
    toast.success("Connexion réussie !");
    navigate("/");
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerName.trim()) {
      toast.error("Veuillez entrer votre nom");
      return;
    }
    if (!validateEmail(registerEmail)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }
    if (registerPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (userType === "agency" && !agencyName.trim()) {
      toast.error("Veuillez entrer le nom de votre agence");
      return;
    }
    if (!acceptTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful registration
    setUser({
      id: "1",
      email: registerEmail,
      name: registerName,
      phone: registerPhone,
      role: userType,
      favorites: [],
      reservations: [],
    });

    toast.success("Inscription réussie ! Bienvenue sur Drivo.");
    navigate(userType === "agency" ? "/dashboard/agence" : "/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      {/* Header */}
      <header className="bg-card border-b py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Drivo</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">
              {activeTab === "login" ? "Connexion" : "Inscription"}
            </CardTitle>
            <CardDescription>
              {activeTab === "login"
                ? "Connectez-vous à votre compte Drivo"
                : "Créez votre compte gratuitement"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        Se souvenir de moi
                      </Label>
                    </div>
                    <Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Ou continuer avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      userType === "client"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setUserType("client")}
                  >
                    <User className={`h-6 w-6 mb-2 ${userType === "client" ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold">Client</p>
                    <p className="text-xs text-muted-foreground">Acheter ou louer</p>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      userType === "agency"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setUserType("agency")}
                  >
                    <Building2 className={`h-6 w-6 mb-2 ${userType === "agency" ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold">Agence</p>
                    <p className="text-xs text-muted-foreground">Vendre ou louer</p>
                  </button>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {userType === "agency" && (
                    <div className="space-y-2">
                      <Label htmlFor="agency-name">Nom de l'agence</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="agency-name"
                          placeholder="Nom de votre agence"
                          className="pl-10"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-name"
                        placeholder="Jean-Pierre Nkoghe"
                        className="pl-10"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+241 77 00 00 00"
                        className="pl-10"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 caractères"
                        className="pl-10 pr-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                      J'accepte les{" "}
                      <Link to="/conditions" className="text-primary hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link to="/confidentialite" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? "Inscription..." : "Créer mon compte"}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Guest CTA */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Continuer en tant qu'invité →
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AuthPage;
