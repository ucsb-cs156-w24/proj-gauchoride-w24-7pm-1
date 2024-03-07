import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import DriverAvailabilityForm from 'main/components/Driver/DriverAvailabilityForm';
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DriverAvailabilityEditPage({storybook = false}) {
    let { id } = useParams();

    const { data: availability, _error, _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/driverAvailability/id?id=${id}`],
            {  // Stryker disable next-line all : GET is the default, so mutating this to "" doesn't introduce a bug
                method: "GET",
                url: `/api/driverAvailability/id`,
                params: {
                    id
                }
            }
        );

    const objectToAxiosPutParams = (availability) => ({
        url: "/api/driverAvailability",
        method: "PUT",
        params: {
            id: availability.id,
        },
        data: {
            driverId: availability.driverId,
            day: availability.day,
            startTime: availability.startTime,
            endTime: availability.endTime,
            notes: availability.notes
        }
    });

    const onSuccess = (availability) => {
        toast(`DriverAvailability Updated - id: ${availability.id}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosPutParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        [`/api/driverAvailability/id?id=${id}`]
    );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess && !storybook) {
        return <Navigate to="/availability" />
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Driver Availability</h1>
                {availability &&
                <DriverAvailabilityForm initialContents={availability} submitAction={onSubmit} buttonLabel="Update" />
                }
            </div>
        </BasicLayout>
    )

}