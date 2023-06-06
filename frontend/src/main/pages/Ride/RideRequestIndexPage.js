import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RideTable from 'main/components/Ride/RideTable';
import {useCurrentUser } from 'main/utils/currentUser'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function RideRequestIndexPage() {

  const currentUser = useCurrentUser();

  const { data: rides, error: _error, status: _status } =
  useBackend(
    // Stryker disable all : hard to test for query caching
    ["/api/ride_request/all"],
    { method: "GET", url: "/api/ride_request/all" },
    []
    // Stryker restore all 
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        <Button style={{ float: "right" }} as={Link} to="/rideRequest/create">
          Create Ride Request
        </Button>
        <h1>Ride Requests</h1>
        <RideTable ride={rides} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}