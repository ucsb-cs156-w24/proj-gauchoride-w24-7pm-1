import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DiningCommonsCreatePage() {

  const objectToAxiosParams = (commons) => ({
    url: "/api/ucsbdiningcommons/post",
    method: "POST",
    params: {
      code: commons.code,
      name: commons.name,
      hasSackMeal: commons.hasSackMeal,
      hasTakeOutMeal: commons.hasTakeOutMeal,
      hasDiningCam: commons.hasDiningCam,
      latitude: commons.latitude,
      longitude: commons.longitude,
    }
  });

  const onSuccess = (commons) => {
    toast(`New Dining Commons Created - code: ${commons.code} name: ${commons.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/ucsbdiningcommons/all"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/diningCommons/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Dining Commons</h1>

        <DiningCommonsForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}