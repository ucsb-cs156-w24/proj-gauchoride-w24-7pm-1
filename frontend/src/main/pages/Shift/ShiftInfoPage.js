import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import ShiftInfo from "main/components/Shift/ShiftInfo";
import RideTable from 'main/components/Ride/RideTable';
import { Button } from 'react-bootstrap';
import {useCurrentUser } from 'main/utils/currentUser'

export default function ShiftInfoPage() {
    const currentUser = useCurrentUser();
    let { id } = useParams();

    const { data: info, _error, _status } =
      useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        [`/api/shift?id=${id}`],
        {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
          method: "GET",
          url: `/api/shift`,
          // Stryker disable all
          params: {
            id
          }
          // Stryker restore all
        }
      );

    const { data: rides, error: _errorRides, status: _statusRides } =
    useBackend(
      // Stryker disable all : hard to test for query caching
      [`/api/ride_request/shiftId?shiftId=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/ride_request/shiftId`,
        // Stryker disable all
        params: {
          shiftId: id
        }
        // Stryker restore all
      },
      []
    );
      
    const returnButton = () => {
        const handleClick = () => {
            window.history.back();
        };
    
        return (
            <Button
                variant="primary"
                onClick={handleClick}
                data-testid="return-button"
            >
                Return
            </Button>
        );
    };

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Shift Info</h1>
                {info && <div className="pb-3"><ShiftInfo info={ info }/></div>}
                <h1>Associated Ride Requests</h1>
                <RideTable ride={rides} currentUser={currentUser} />
                {returnButton()}
            </div>
        </BasicLayout>
    )
}