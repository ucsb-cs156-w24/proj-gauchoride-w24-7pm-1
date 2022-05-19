import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DiningCommonsEditPage() {
  let { code } = useParams();

  const { data: commons, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/ucsbdiningcommons?code=${code}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/ucsbdiningcommons`,
        params: {
          code
        }
      }
    );


  const objectToAxiosPutParams = (commons) => ({
    url: "/api/ucsbdiningcommons",
    method: "PUT",
    params: {
      code: commons.code,
    },
    data: {
      name: commons.name,
      hasSackMeal: commons.hasSackMeal,
      hasTakeOutMeal: commons.hasTakeOutMeal,
      hasDiningCam: commons.hasDiningCam,
      latitude: commons.latitude,
      longitude: commons.longitude,
    }
  });

  const onSuccess = (commons) => {
    toast(`DiningCommons Updated - code: ${commons.code} name: ${commons.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/ucsbdiningcommons?code=${code}`]
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
        <h1>Edit Dining Commons</h1>
        {commons &&
          <DiningCommonsForm initialCommons={commons} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

