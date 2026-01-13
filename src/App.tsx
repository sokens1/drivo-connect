import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import AuthPage from "./pages/AuthPage";
import FavoritesPage from "./pages/FavoritesPage";
import ClientDashboard from "./pages/ClientDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import ReservationPage from "./pages/ReservationPage";
import AgenciesPage from "./pages/AgenciesPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recherche" element={<SearchPage />} />
            <Route path="/vehicule/:id" element={<VehicleDetailsPage />} />
            <Route path="/connexion" element={<AuthPage />} />
            <Route path="/inscription" element={<AuthPage />} />
            <Route path="/favoris" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/dashboard/agence" element={<AgencyDashboard />} />
            <Route path="/reservation/:id" element={<ReservationPage />} />
            <Route path="/agences" element={<AgenciesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conditions" element={<TermsPage />} />
            <Route path="/confidentialite" element={<PrivacyPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
