import { Suspense } from "react";
import SearchPage from "@/views/client/Search";

const Page = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <SearchPage />
        </Suspense>
    );
};

export default Page;
