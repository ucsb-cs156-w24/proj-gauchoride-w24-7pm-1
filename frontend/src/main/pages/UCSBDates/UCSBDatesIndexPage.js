import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDatesTable from 'main/components/UCSBDates/UCSBDatesTable';
import { useCurrentUser } from 'main/utils/currentUser'

export default function UCSBDatesIndexPage() {

  const currentUser = useCurrentUser();

  const { data: dates, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ucsbdates/all"],
      { method: "GET", url: "/api/ucsbdates/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSBDates</h1>
        <UCSBDatesTable dates={dates} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}