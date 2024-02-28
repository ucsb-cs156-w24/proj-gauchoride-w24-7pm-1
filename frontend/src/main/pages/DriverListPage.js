import React from 'react';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

import { useBackend } from "main/utils/useBackend";
import DriverTable from "main/components/Driver/DriverTable";

const DriverListPage = () => {
    const { data: drivers, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/drivers/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/drivers/all" },
            []
        );
    
    return (
        <BasicLayout>
            <h2>Drivers</h2>
            <DriverTable drivers={drivers} />
        </BasicLayout>
    );
};

export default DriverListPage;