import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import {useCurrentUser} from 'main/utils/currentUser'
import RiderApplicationTable from "main/components/RiderApplication/RiderApplicationTable";

export default function RiderApplicationIndexPage() {

    const currentUser = useCurrentUser();
    // Stryker disable all
    // Stryker restore all 
    
    const { data: riderApplications, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : hard to test for query caching
            ["/api/rider"],
            { method: "GET", url: "/api/rider" },
            []
            // Stryker restore all 
    ); 
    
    const pendingRiderApplications = riderApplications?.filter(application => application.status === "pending");
    
    return (
          <BasicLayout>
              <div className="pt-2">
                <h1>Pending Rider Applications</h1>
                <RiderApplicationTable riderApplications={pendingRiderApplications} currentUser={currentUser} />
                <h1>All Rider Applications</h1>
                <RiderApplicationTable riderApplications={riderApplications} currentUser={currentUser} />
              </div>
          </BasicLayout>
      );
}