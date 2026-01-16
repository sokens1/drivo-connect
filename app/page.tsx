import { Suspense } from "react";
import Index from "@/views/Index";

const Page = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Index />
    </Suspense>
  );
};

export default Page;
