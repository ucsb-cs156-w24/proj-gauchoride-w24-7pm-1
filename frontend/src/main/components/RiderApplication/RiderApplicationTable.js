import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onPutSuccess, cellToAxiosParamsCancelApplicationMember} from "main/utils/riderApplicationUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import { Button } from "react-bootstrap";

export default function RiderApplicationTable({
        riderApplications,
        currentUser
    }){

    const testid = "RiderApplicationTable";
    const navigate = useNavigate();

    const showCallback = (cell) => {
        navigate(`/apply/rider/show/${cell.row.values.id}`)
    }
    
    const editCallback = (cell) => {
        navigate(`/apply/rider/edit/${cell.row.values.id}`)
    }

    const reviewCallback = (cell) => {
        navigate(`/admin/applications/riders/review/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const cancelMutation = useBackendMutation(
        cellToAxiosParamsCancelApplicationMember,
        { onSuccess: onPutSuccess },
        ["/apply/rider"]
    );

    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const cancelCallback = async (cell) => { 
        const confirmation = window
                            .confirm("Are you sure you want to cancel this application?\n\nClick 'OK' to confirm or 'Cancel' to keep your application active.");
        if (confirmation)
        {
            cancelMutation.mutate(cell); 
        }
    }

    const defaultColumns = [
        {
            Header: 'Application Id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Date Applied',
            accessor: 'created_date',
        },
        {
            Header: 'Date Updated',
            accessor: 'updated_date',
        },
        {
            Header: 'Date Cancelled',
            accessor: 'cancelled_date',
        },
        {
            Header: 'Status',
            accessor: 'status',
        }
    ];

    const buttonColumnsMember = [
        ...defaultColumns,
        ButtonColumn("Show", "primary", showCallback, "RiderApplicationTable"),
        {
            Header: 'Edit',
            Cell: ({ cell }) => {
                if (cell.row.values.status === 'pending') {
                    return (
                        <Button
                        data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-button`}
                        variant = {"primary"} 
                        onClick={() => editCallback(cell)}>Edit</Button>
                    );
                }
                return null;
            }
        },
        {
            Header: 'Cancel',
            Cell: ({ cell }) => {
                if (cell.row.values.status === 'pending') {
                    return (
                        <Button
                        data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-button`}
                        variant = {"danger"} 
                        onClick={() => cancelCallback(cell)}>Cancel</Button>
                    );
                }
                return null;
            }
        },
    ]

    const buttonColumnsAdmin = [
        ...defaultColumns,
        ButtonColumn("Review", "primary", reviewCallback, "RiderApplicationTable")

    ];

    const columnsToDisplay = (hasRole(currentUser, "ROLE_ADMIN")) ? buttonColumnsAdmin : buttonColumnsMember;

    return <OurTable
        data={riderApplications}
        columns={columnsToDisplay}
        testid={testid}
    />;
};

