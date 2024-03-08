import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import RideAssignDriverForm from "main/components/Ride/RideAssignDriverForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";

import { toast } from "react-toastify";

export default function RideRequestAssignPage() {
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
    url: "/api/ride_request/assigndriver",
    method: "PUT",
    params: {
      id: ride.id,
    },
    data: {
        shiftId: ride.shiftId,
    }
  });

  const onSuccess = (ride) => {
    toast(`Driver Assigned - id: ${ride.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/ride_request/assigndriver?id=${id}`]
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
                <h1>Assign Driver to Ride Request</h1>
                {ride &&
                <RideAssignDriverForm initialContents={ride} submitAction={onSubmit} buttonLabel="Assign Driver" />
                }
            </div>
        </BasicLayout>
    )
}