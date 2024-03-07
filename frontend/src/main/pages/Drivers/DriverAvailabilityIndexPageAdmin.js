import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DriverAvailabilityTable from 'main/components/Driver/DriverAvailabilityTable';
import { useCurrentUser , hasRole} from 'main/utils/currentUser'
import { Button } from 'react-bootstrap';

export default function DriverAvailabilityIndexPage() {

    const currentUser = useCurrentUser();

    const { data: driverAvailabilities, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : hard to test for query caching
            ["/api/driverAvailability/all"],
            { method: "GET", url: "/api/driverAvailability/all" },
            []
            // Stryker restore all 
        );

    const createButton = () => {
        if (hasRole(currentUser, "ROLE_ADMIN")) {
            return (
                <Button
                    variant="primary"
                    href="/driverAvailability/create"
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
                <DriverAvailabilityTable driverAvailability={driverAvailabilities} currentUser={currentUser} />
            </div>
        </BasicLayout>
    );
}