import { Suspense } from "react";
import VehicleDetailPage from "@/views/VehicleDetailPage";

export const runtime = "edge";

export default function Page() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <VehicleDetailPage />
        </Suspense>
    );
}
