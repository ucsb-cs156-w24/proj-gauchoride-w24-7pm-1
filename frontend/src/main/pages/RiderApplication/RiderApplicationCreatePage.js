import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RiderApplicationForm from "main/components/RiderApplication/RiderApplicationForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RideRequestCreatePage() {

  const objectToAxiosParams = (riderApplication) => ({
      url: "/api/riderApplication/new",
      method: "POST",
      params: {
          perm_number: riderApplication.perm_number,
          description: riderApplication.description,
      }
  });

  const onSuccess = (riderApplication) => {
      toast(`New Rider Application Made - id: ${riderApplication.id}`);
  }

  const mutation = useBackendMutation(
      objectToAxiosParams,
      { onSuccess },
      // Stryker disable next-line all : hard to set up test for caching
      ["/api/riderApplication/new"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
      mutation.mutate(data);
  }

  if (isSuccess) {
      return <Navigate to="/apply/rider" />
  }

  return (
      <BasicLayout>
      <div className="pt-2">
          <h1>Submit New Rider Application</h1>
          <RiderApplicationForm submitAction={onSubmit} />
      </div>
      </BasicLayout>
  )
}