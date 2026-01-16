import { Suspense } from "react";
import ReservationsPage from "@/views/client/Booking";

const Page = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ReservationsPage />
        </Suspense>
    );
};

export default Page;
