import { Suspense } from "react";
import EditVehicle from "@/views/agency/EditVehicle";
import DashboardLayout from "@/components/DashboardLayout";

export default function Page() {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Chargement...</div>}>
                <EditVehicle />
            </Suspense>
        </DashboardLayout>
    );
}
