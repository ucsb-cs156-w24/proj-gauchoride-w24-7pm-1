import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DriverAvailabilityForm from "main/components/Driver/DriverAvailabilityForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DriverAvailabilityCreatePage() {

    const objectToAxiosParams = (availability) => ({
        url: "/api/driverAvailability/new",
        method: "POST",
        params: {
            driverId: availability.driverId,
            day: availability.day,
            startTime: availability.startTime,
            endTime: availability.endTime,
            notes: availability.notes
        }
    });

    const onSuccess = (availability) => {
        toast(`New Driver Availability Created - id: ${availability.id}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/driverAvailability"]
    );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess) {
        return <Navigate to="/availability/" />
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Submit New Driver Availability</h1>
                <DriverAvailabilityForm submitAction={onSubmit} />
            </div>
        </BasicLayout>
    )
}