import { Suspense } from "react";
import AgenciesPage from "@/views/AgenciesPage";

const Page = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <AgenciesPage />
        </Suspense>
    );
};

export default Page;
