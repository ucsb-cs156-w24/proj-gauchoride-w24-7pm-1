import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DriverAvailabilityTable from 'main/components/Driver/DriverAvailabilityTable';
import { useCurrentUser , hasRole} from 'main/utils/currentUser'
import { Button } from 'react-bootstrap';

export default function DriverAvailabilityIndexPage() {

    const currentUser = useCurrentUser();

    const { data: availabilities, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : hard to test for query caching
            ["/api/driverAvailability"],
            { method: "GET", url: "/api/driverAvailability" },
            []
            // Stryker restore all 
        );

    const createButton = () => {
        if (hasRole(currentUser, "ROLE_DRIVER")) {
            return (
                <Button
                    variant="primary"
                    href="/availability/create"
                    style={{ float: "right" }}
                >
                    Create Driver Availability
                </Button>
            )
        } 
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                {createButton()}
                <h1>Driver Availabilities</h1>
                <DriverAvailabilityTable Availability={availabilities} currentUser={currentUser} />
            </div>
        </BasicLayout>
    );
}