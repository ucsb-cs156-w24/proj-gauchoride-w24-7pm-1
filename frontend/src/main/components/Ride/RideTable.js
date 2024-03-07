import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/rideUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import { Link } from "react-router-dom";

export default function RideTable({
        ride,
        currentUser
    }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ride/edit/${cell.row.values.id}`)
    }

    const assignCallback = (cell) => {
        navigate(`/ride/assigndriver/${cell.row.values.id}`)
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
            Header: 'Shift',
            accessor: 'shiftId',
            Cell: ({ value }) => (
                // Stryker disable next-line all : hard to set up test
                <Link to={`/shiftInfo/${value}`}>{value}</Link>
              ),
        },
        {
            Header: 'Course #',
            accessor: 'course',
        },
        {
            Header: 'Pick Up Time',
            accessor: 'pickUpTime',
        },
        {
            Header: 'Drop Off Time',
            accessor: 'dropOffTime',
        },
        {
            Header: 'Pick Up Building',
            accessor: 'pickupBuilding',
        },
        {
            Header: 'Pick Up Room',
            accessor: 'pickupRoom',
        },
        {
            Header: 'Drop Off Building',
            accessor: 'dropoffBuilding',
        },
        {
            Header: 'Drop Off Room',
            accessor: 'dropoffRoom',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
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
            Header: 'Shift',
            accessor: 'shiftId',
            Cell: ({ value }) => (
                // Stryker disable next-line all : hard to set up test
                <Link to={`/shiftInfo/${value}`}>{value}</Link>
              ),
        },
        {
            Header: 'Course #',
            accessor: 'course',
        },
        {
            Header: 'Pick Up Time',
            accessor: 'pickUpTime',
        },
        {
            Header: 'Drop Off Time',
            accessor: 'dropOffTime',
        },
        {
            Header: 'Pick Up Building',
            accessor: 'pickupBuilding',
        },
        {
            Header: 'Pick Up Room',
            accessor: 'pickupRoom',
        },
        {
            Header: 'Drop Off Building',
            accessor: 'dropoffBuilding',
        },
        {
            Header: 'Drop Off Room',
            accessor: 'dropoffRoom',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
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
            Header: 'Course #',
            accessor: 'course',
        },
        {
            Header: 'Pick Up Time',
            accessor: 'pickUpTime',
        },
        {
            Header: 'Drop Off Time',
            accessor: 'dropOffTime',
        },
        {
            Header: 'Pick Up Building',
            accessor: 'pickupBuilding',
        },
        {
            Header: 'Pick Up Room',
            accessor: 'pickupRoom',
        },
        {
            Header: 'Drop Off Building',
            accessor: 'dropoffBuilding',
        },
        {
            Header: 'Drop Off Room',
            accessor: 'dropoffRoom',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
        }
    ];


    const buttonColumnsRider = [
        ...columnsRider,
        ButtonColumn("Edit", "primary", editCallback, "RideTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RideTable")
    ]

    const buttonColumnsAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "RideTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "RideTable"),
        ButtonColumn("Assign Driver", "success", assignCallback, "RideTable")
    ]

   
    const columnsToDisplay = (hasRole(currentUser, "ROLE_ADMIN")) ? buttonColumnsAdmin : (hasRole(currentUser, "ROLE_DRIVER")) ? columnsDriver: buttonColumnsRider;
    
    
    return <OurTable
        data={ride}
        columns={columnsToDisplay}
        testid={"RideTable"}
    />;
};