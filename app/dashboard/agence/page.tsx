import { Suspense } from "react";
import AgencyDashboard from "@/views/agency/Dashboard";

const Page = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AgencyDashboard />
    </Suspense>
  );
};

export default Page;
