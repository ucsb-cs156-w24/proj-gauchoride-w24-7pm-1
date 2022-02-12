import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
// import { toast } from "react-toastify";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
// import axios from "axios";
// import { useMutation } from "react-query";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";


export default function UCSBDatesCreatePage() {

  // const postUrl = (ucsbDate) =>
  //   `/api/ucsbdates/post?quarterYYYYQ=${ucsbDate.quarterYYYYQ}&name=${ucsbDate.name}&localDateTime=${ucsbDate.localDateTime}`;

  // const postUser = async (ucsbDate) =>
  //   await (await axios.post(
  //     postUrl(ucsbDate))
  //     ).data

  // const postUser = async (ucsbDate) =>
  //   await (await axios({
  //     url: "/api/ucsbdates/post",
  //     method: "POST",
  //     params: {
  //       quarterYYYYQ: ucsbDate.quarterYYYYQ,
  //       name: ucsbDate.name,
  //       localDateTime: ucsbDate.localDateTime
  //     }
  //   })).data;

  // const wrappedParams = async (params) =>
  //   await (await axios(params)).data;

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
    toast( `New ucsbDate Created - id: ${ucsbDate.id} name: ${ucsbDate.name}`);
  }

  const mutation = useBackendMutation(objectToAxiosParams, {onSuccess});

  const { _isLoading, _isError, _error, isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  }

  if (isSuccess) {
    return <Navigate to="/" />
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