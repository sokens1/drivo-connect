import { Suspense } from "react";
import ClientDashboard from "@/views/client/Dashboard";

const Page = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ClientDashboard />
    </Suspense>
  );
};

export default Page;
