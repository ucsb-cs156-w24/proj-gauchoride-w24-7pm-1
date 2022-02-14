import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBDatesCreatePage() {

  const objectToAxiosParams = (ucsbDate) => ({
    url: "/api/ucsbdates/post",
    method: "POST",
    params: {
      quarterYYYYQ: ucsbDate.quarterYYYYQ,
      name: ucsbDate.name,
      localDateTime: ucsbDate.localDateTime
    }
  });

  const onSuccess = (ucsbDate) => {
    toast(`New ucsbDate Created - id: ${ucsbDate.id} name: ${ucsbDate.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/ucsbdates/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/ucsbdates/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New UCSBDate</h1>

        <UCSBDateForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}