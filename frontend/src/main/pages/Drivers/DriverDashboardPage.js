import React from 'react'
import ShiftTable from "main/components/Shift/ShiftTable"


import BasicLayout from 'main/layouts/BasicLayout/BasicLayout';
import { useBackend } from "main/utils/useBackend";
export default function DriverDashboardPage() {
    const { data: shift, error: _error, status: _status } =
    useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        ["/api/shift/drivershifts"],
        // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
        { method: "GET", url: "/api/shift/drivershifts" },
        []
    );
   
  
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Your Shifts</h1>
        <ShiftTable shift={shift} />
      </div>
    </BasicLayout>
  )
};