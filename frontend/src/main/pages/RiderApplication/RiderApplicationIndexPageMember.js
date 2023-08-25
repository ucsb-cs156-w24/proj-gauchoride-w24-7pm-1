import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import {useCurrentUser} from 'main/utils/currentUser'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RiderApplicationTable from "main/components/RiderApplication/RiderApplicationTable";

export default function RiderApplicationIndexPage() {

    const currentUser = useCurrentUser();
    // Stryker disable all
    const currentUserCopy = { ...currentUser };
    if (currentUserCopy.data?.root?.rolesList.includes("ROLE_ADMIN"))
    {
        currentUserCopy.data.root.rolesList = currentUserCopy.data.root.rolesList.filter(role => role !== "ROLE_ADMIN");
    }
    // Stryker restore all 
    const { data: riderApplications, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : hard to test for query caching
            ["/api/rider"],
            { method: "GET", url: "/api/rider" },
            []
            // Stryker restore all 
    );  
    
    return (
          <BasicLayout>
              <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/apply/rider/new">
                    New Rider Application
                </Button>
                <h1>Rider Applications</h1>
                <RiderApplicationTable riderApplications={riderApplications} currentUser={currentUserCopy} />
              </div>
          </BasicLayout>
      );
}