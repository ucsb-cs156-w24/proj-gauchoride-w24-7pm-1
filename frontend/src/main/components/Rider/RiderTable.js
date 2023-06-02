import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/riderUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function RiderTable({
        ride,
        currentUser
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
    // Stryker restore all 

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

    const columnsDriver = [
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

    const columnsRider = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Day',
            accessor: 'day',
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
    /*

    const buttonColumns = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "RiderTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RiderTable")
    ]*/

    const buttonColumnsRider = [
        ...columnsRider,
        ButtonColumn("Edit", "primary", editCallback, "RiderTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RiderTable")
    ]

    const buttonColumnsAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "RiderTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RiderTable")
    ]

    const columnsToDisplay = (hasRole(currentUser, "ROLE_USER")) ? buttonColumnsRider : (hasRole(currentUser, "ROLE_DRIVER")) ? columnsDriver: buttonColumnsAdmin;
    
    

    const memoizedColumns = React.useMemo(() => columnsToDisplay, [columnsToDisplay]);
    const memoizedRides = React.useMemo(() => ride, [ride]);

    return <OurTable
        data={memoizedRides}
        columns={memoizedColumns}
        testid={"RiderTable"}
    />;
};