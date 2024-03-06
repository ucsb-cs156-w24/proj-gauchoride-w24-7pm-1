import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/driverAvailabilityUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function DriverAvailabilityTable({
    driverAvailability,
    currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/availability/edit/${cell.row.values.id}`)
    }

    const reviewCallback = (cell) => {
        navigate(`/availability/review/${cell.row.values.id}`)
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
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'driverId',
            accessor: 'driverId',
        },
        {
            Header: 'day',
            accessor: 'day',
        },
        {
            Header: 'startTime',
            accessor: 'startTime',
        },
        {
            Header: 'endTime',
            accessor: 'endTime',
        },
        {
            Header: 'notes',
            accessor: 'notes',
        }
    ];

    const buttonColumnsDriver = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "DriverAvalabilityTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "DriverAvalabilityTable")
    ];

    const buttonColumnsAdmin = [
        ...columns,
        ButtonColumn("Review", "primary", reviewCallback, "DriverAvalabilityTable")
    ];

    const columnsToDisplay = (hasRole(currentUser, "ROLE_ADMIN")) ? buttonColumnsAdmin : buttonColumnsDriver;

    return <OurTable
        data={driverAvailability}
        columns={columnsToDisplay}
        testid={"DriverAvalabilityTable"}
    />;
};

