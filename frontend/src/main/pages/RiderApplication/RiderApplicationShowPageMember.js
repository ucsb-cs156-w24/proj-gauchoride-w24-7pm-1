import RiderApplicationShowForm from "main/components/RiderApplication/RiderApplicationShowForm";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useBackend } from "main/utils/useBackend";
import { useParams } from "react-router-dom";


export default function RiderApplicationShowPage() {
  let { id } = useParams();

  const { data: riderApplication, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/riderApplication?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/riderApplication`,
        params: {
          id
        }
      }
    );

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Show Rider Application</h1>
                {riderApplication &&
                <RiderApplicationShowForm initialContents={riderApplication}  buttonLabel="Back" />
                }
            </div>
        </BasicLayout>
    )
}