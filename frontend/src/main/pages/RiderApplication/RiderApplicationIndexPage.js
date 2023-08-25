import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import {useCurrentUser} from 'main/utils/currentUser'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RiderApplicationTable from "main/components/RiderApplication/RiderApplicationTable";

export default function RiderApplicationIndexPage() {

    const currentUser = useCurrentUser();
    
    const { data: riderApplications, error: _error, status: _status } =
          useBackend(
              // Stryker disable next-line all : don't test internal caching of React Query
              ["/api/rider"],
              { method: "GET", url: "/api/rider" },
              // Stryker disable next-line all : don't test default value of empty list
              []
          );   
    
    return (
          <BasicLayout>
              <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/apply/rider/new">
                    New Rider Application
                </Button>
                <h1>Rider Applications</h1>
                <RiderApplicationTable riderApplications={riderApplications} currentUser={currentUser} />
              </div>
          </BasicLayout>
      );
}