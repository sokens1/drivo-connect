import { Suspense } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AddVehicle from "@/views/agency/AddVehicle";

export default function Page() {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Chargement...</div>}>
                <AddVehicle />
            </Suspense>
        </DashboardLayout>
    );
}
