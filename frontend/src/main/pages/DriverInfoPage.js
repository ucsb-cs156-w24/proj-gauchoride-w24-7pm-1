import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import DriverInfo from "main/components/Driver/DriverInfo";
import { Button } from 'react-bootstrap';

export default function DriverInfoPage() {
    let { id } = useParams();

    const { data: info, _error, _status } =
      useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        [`/api/drivers/get?id=${id}`],
        {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
          method: "GET",
          url: `/api/drivers/get`,
          params: {
            id
          }
        }
      );

      const returnButton = () => {
            return (
                <Button
                    variant="primary"
                    href="/shift/"
                    style={{ float: "right" }}
                >
                    Return
                </Button>
            )
    }

  
      return (
          <BasicLayout>
              <div className="pt-2">
              {returnButton()}
                <h1>Additional information</h1>
                  {info && <DriverInfo info={ info }/>}
              </div>
          </BasicLayout>
      )
  }




