import { Suspense } from "react";
import FavoritesPage from "@/views/client/Favorites";

const Page = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <FavoritesPage />
        </Suspense>
    );
};

export default Page;
