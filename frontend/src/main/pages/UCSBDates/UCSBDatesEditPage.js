import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBDatesEditPage() {
  let { id } = useParams();

  const { data: ucsbDate, error: error, status: status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/ucsbdates?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/ucsbdates`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (ucsbDate) => ({
    url: "/api/ucsbdates",
    method: "PUT",
    params: {
      id: ucsbDate.id,
    },
    data: {
      quarterYYYYQ: ucsbDate.quarterYYYYQ,
      name: ucsbDate.name,
      localDateTime: ucsbDate.localDateTime
    }
  });

  const onSuccess = (ucsbDate) => {
    toast(`UCSBDate Updated - id: ${ucsbDate.id} name: ${ucsbDate.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/ucsbdates?id=${id}`]
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
        <h1>Edit UCSBDate</h1>
        {ucsbDate &&
          <UCSBDateForm initialUCSBDate={ucsbDate} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

