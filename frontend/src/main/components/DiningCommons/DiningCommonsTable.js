import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsbdiningcommons",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function DiningCommonsTable({ diningCommons, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/diningCommons/edit/${cell.row.values.code}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsbdiningcommons/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Code',
            accessor: 'code', 
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Sack Meal?',
            id: 'hasSackMeal', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasSackMeal) // hack needed for boolean values to show up
        },
        {
            Header: 'Takeout Meal?',
            id: 'hasTakeOutMeal', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasTakeOutMeal) // hack needed for boolean values to show up

        },
        {
            Header: 'Dining Cam?',
            id: 'hasDiningCam', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasDiningCam) // hack needed for boolean values to show up
        },
        {
            Header: 'Latitude',
            accessor: 'latitude',
        },
        {
            Header: 'Longitude',
            accessor: 'longitude',
        }
    ];

    const testid = "DiningCommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={diningCommons}
        columns={columnsToDisplay}
        testid={testid}
    />;
};