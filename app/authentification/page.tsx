import AuthPage from "@/pages/AuthPage";

export const metadata = {
  title: "Authentification - Drivo",
  description: "Connectez-vous ou créez votre compte Drivo",
};

export default function AuthPageRoute() {
  return <AuthPage initialTab="login" />;
}
