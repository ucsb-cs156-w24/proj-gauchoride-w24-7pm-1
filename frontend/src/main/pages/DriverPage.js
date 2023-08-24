import React from 'react';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

import { useBackend } from "main/utils/useBackend";
import DriverShiftsTable from 'main/components/Driver/DriversShiftsTable';

const DriverPage = () => {
    const { data: drivershifts, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/shift/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/shift/all" },
            []
        );
    
    return (
        <BasicLayout>
            <h2>Driver's Shifts</h2>
            <DriverShiftsTable drivershifts={drivershifts} />
        </BasicLayout>
    );
};

export default DriverPage;