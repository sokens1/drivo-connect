import { Suspense } from "react";
import AuthPage from "@/views/AuthPage";

export const metadata = {
  title: "Authentification - Drivo",
  description: "Connectez-vous ou créez votre compte Drivo",
};

export default function AuthPageRoute() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AuthPage initialTab="login" />
    </Suspense>
  );
}
