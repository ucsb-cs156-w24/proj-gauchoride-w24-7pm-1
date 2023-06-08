import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RideForm from "main/components/Ride/RideForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RideRequestCreatePage() {

    const objectToAxiosParams = (ride) => ({
        url: "/api/ride_request/post",
        method: "POST",
        params: {
            day: ride.day,
            startTime: ride.start,
            endTime: ride.end, 
            pickupLocation: ride.pickup,
            dropoffLocation: ride.dropoff,
            room: ride.room,
            course: ride.course
        }
    });

    const onSuccess = (ride) => {
        toast(`New Ride Created - id: ${ride.id}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/ride_request/all"]
    );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess) {
        return <Navigate to="/ride/" />
    }

    return (
        <BasicLayout>
        <div className="pt-2">
            <h1>Submit New Ride Request</h1>
            <RideForm submitAction={onSubmit} />
        </div>
        </BasicLayout>
    )
}