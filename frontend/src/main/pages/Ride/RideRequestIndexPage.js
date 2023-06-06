import React, { useEffect, useState } from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RideTable from 'main/components/Ride/RideTable';
import { hasRole, useCurrentUser } from 'main/utils/currentUser'

export default function RideRequestIndexPage() {

    

  const currentUser = useCurrentUser();
  let rides; //declare variable for use in the if/else block

  if(hasRole(currentUser,"ROLE_DRIVER")){
    const { data: returnedRides, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ride_request/all"],
      { method: "GET", url: "/api/ride_request/admin/all" },
      []
    );
    rides = returnedRides; //assign data values
  }
  else{
    const { data: returnedRides, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ride_request/all"],
      { method: "GET", url: "/api/ride_request/all" },
      []
    );
    rides = returnedRides; //assign data values
  }

  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Ride Requests</h1>
        <RideTable ride={rides} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}