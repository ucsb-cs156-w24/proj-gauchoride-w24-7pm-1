import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/driverAvailabilityUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function DriverAvailabilityTable({
    Availability,
    currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/availability/edit/${cell.row.values.id}`)
    }

    const reviewCallback = (cell) => {
        navigate(`/admin/availability/review/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/availability"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Driver Id',
            accessor: 'driverId',
        },
        {
            Header: 'Day',
            accessor: 'day',
        },
        {
            Header: 'Start Time',
            accessor: 'startTime',
        },
        {
            Header: 'End Time',
            accessor: 'endTime',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
        }
    ];

    // Stryker disable all : hard to test for button mutations
    const buttonColumnsDriver = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "DriverAvailabilityTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "DriverAvailabilityTable")
    ];

    const buttonColumnsAdmin = [
        ...columns,
        ButtonColumn("Review", "primary", reviewCallback, "DriverAvailabilityTable")
    ];
    // Stryker restore all 

    const columnsToDisplay = (hasRole(currentUser, "ROLE_ADMIN")) ? buttonColumnsAdmin : (hasRole(currentUser, "ROLE_DRIVER")) ? buttonColumnsDriver : columns;

    return <OurTable
        data={Availability}
        columns={columnsToDisplay}
        testid={"DriverAvailabilityTable"}
    />;
};

