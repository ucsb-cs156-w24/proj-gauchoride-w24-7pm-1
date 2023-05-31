import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/riderUtils"
import { useNavigate } from "react-router-dom";
//import { hasRole } from "main/utils/currentUser";

export default function RiderTable({
        ride
        //currentUser,
        //showButtons = true
    }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ride_request/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ride_request/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }


    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Day',
            accessor: 'day',
        },
        {
            Header: 'Student',
            accessor: 'student',
        },
        {
            Header: 'Driver',
            accessor: 'driver',
        },
        {
            Header: 'Course #',
            accessor: 'course',
        },
        {
            Header: 'Start Time',
            accessor: 'start',
        },
        {
            Header: 'End Time',
            accessor: 'end',
        },
        {
            Header: 'Pick Up',
            accessor: 'pickup',
        },
        {
            Header: 'Drop Off',
            accessor: 'dropoff',
        },
        {
            Header: 'Room #',
            accessor: 'room',
        }
    ];

    const buttonColumns = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "RiderTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RiderTable")
    ]

    // TODO: NEED TO ADD DRIVER ROLE THAT DOES NOT HAVE BUTTONS, NEED TO WAIT FOR DRIVER ROLE TO BE DEFINED

    //const columnsToDisplay = (showButtons && hasRole(currentUser, "ROLE_USER")) ? buttonColumns : columns;


    // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization
    //const memoizedColumns = React.useMemo(() => buttonColumns, [buttonColumns]);
    const memoizedRides = React.useMemo(() => ride, [ride]);

    return <OurTable
        data={memoizedRides}
        columns={buttonColumns}
        testid={"RiderTable"}
    />;
};