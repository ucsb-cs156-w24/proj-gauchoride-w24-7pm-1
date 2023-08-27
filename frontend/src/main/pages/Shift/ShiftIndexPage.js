import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ShiftTable from 'main/components/Shift/ShiftTable';
import { useCurrentUser , hasRole} from 'main/utils/currentUser'
import { Button } from 'react-bootstrap';

export default function ShiftIndexPage() {

    const currentUser = useCurrentUser();

    const { data: shifts, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : hard to test for query caching
            ["/api/shift/all"],
            { method: "GET", url: "/api/shift/all" },
            []
            // Stryker restore all 
        );

    const createButton = () => {
        if (hasRole(currentUser, "ROLE_ADMIN")) {
            return (
                <Button
                    variant="primary"
                    href="/shift/create"
                    style={{ float: "right" }}
                >
                    Create Shift
                </Button>
            )
        } 
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                {createButton()}
                <h1>Shifts</h1>
                <ShiftTable shift={shifts} currentUser={currentUser} />
            </div>
        </BasicLayout>
    );
}