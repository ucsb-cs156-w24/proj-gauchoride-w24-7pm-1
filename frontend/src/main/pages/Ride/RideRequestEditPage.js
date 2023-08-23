import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import RideForm from "main/components/Ride/RideForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";

import { toast } from "react-toastify";

export default function RideRequestEditPage() {
  let { id } = useParams();

  const { data: ride, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/ride_request?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/ride_request`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (ride) => ({
    url: "/api/ride_request",
    method: "PUT",
    params: {
      id: ride.id,
    },
    data: {
        day: ride.day,
        startTime: ride.start,
        endTime: ride.end, 
        pickupBuilding: ride.pickupBuilding,
        dropoffBuilding: ride.dropoffBuilding,
        dropoffRoom: ride.dropoffRoom,
        pickupRoom: ride.pickupRoom,
        course: ride.course,
        notes: ride.notes
    }
  });

  const onSuccess = (ride) => {
    toast(`Ride Updated - id: ${ride.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/ride_request?id=${id}`]
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
                <h1>Edit Ride Request</h1>
                {ride &&
                <RideForm initialContents={ride} submitAction={onSubmit} buttonLabel="Update" />
                }
            </div>
        </BasicLayout>
    )
}