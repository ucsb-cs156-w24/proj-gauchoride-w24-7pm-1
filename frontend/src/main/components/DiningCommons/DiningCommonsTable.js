import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";

export default function DiningCommonsTable({ diningCommons, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdates/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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
            accessor: 'hasSackMeal',
            accessor: (row, _rowIndex) => String(row.hasSackMeal) // hack needed for boolean values to show up
        },
        {
            Header: 'Takeout Meal?',
            accessor: 'hasTakeOutMeal',
            accessor: (row, _rowIndex) => String(row.hasTakeOutMeal) // hack needed for boolean values to show up

        },
        {
            Header: 'Dining Cam?',
            accessor: 'hasDiningCam',
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

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
    //     ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={diningCommons}
        columns={columnsToDisplay}
        testid={"DiningCommonsTable"}
    />;
};