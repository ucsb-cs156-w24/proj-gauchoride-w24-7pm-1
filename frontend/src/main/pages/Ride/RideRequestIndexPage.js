import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RideTable from 'main/components/Ride/RideTable';
import {useCurrentUser } from 'main/utils/currentUser'

export default function RideRequestIndexPage() {

  const currentUser = useCurrentUser();

  const { data: rides, error: _error, status: _status } =
  useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/ride_request/all"],
    { method: "GET", url: "/api/ride_request/all" },
    []
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Ride Requests</h1>
        <RideTable ride={rides} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}