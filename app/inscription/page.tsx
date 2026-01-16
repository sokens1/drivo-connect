import { Suspense } from "react";
import AuthPage from "@/views/AuthPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AuthPage initialTab="register" />
    </Suspense>
  );
};

export default Page;
