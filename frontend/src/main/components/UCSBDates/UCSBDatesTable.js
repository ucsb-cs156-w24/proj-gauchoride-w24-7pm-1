import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
// import {useQueryClient} from "react-query";

export default function UCSBDatesTable({ dates }) {

    // const queryClient = useQueryClient();

    const editCallback = (cell) =>
        toast(`Edit Callback called on id: ${cell.row.values.id} name: ${cell.row.values.name}`);

    const cellToAxiosParamsDelete = (cell) => ({
        url: "/api/ucsbdates",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    });

    const onDeleteSuccess = (message) => {
        // const message = `Delete Callback called on id: ${cell.row.values.id} name: ${cell.row.values.name}`;
        // const message = `on delete success, cell=${cell}`
        console.log(message);
        toast(message);
    }

    const deleteMutation = useBackendMutation(cellToAxiosParamsDelete, { onSuccess: onDeleteSuccess },  ["/api/ucsbdates/all"]);

    const deleteCallback = async (cell) => {
        console.log(`start deleteCallback: id=${cell.row.values.id}`)
        deleteMutation.mutate(cell);
        // If it were possible, we'd do this: 
        //   dates =  dates.filter ( (date) => date.id != cell.row.values.id );
        // But for now, we'll just refresh the page.  There should be a better way:
        // window.location.reload(false);

        // await queryClient.invalidateQueries(["/api/ucsbdates/all"], {
        //     exact: true,
        //     refetchActive: true,
        //     refetchInactive: false
        //   }, { throwOnError: true, cancelRefetch: true })
        console.log(`end deleteCallback: id=${cell.row.values.id}`)
    }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'QuarterYYYYQ',
            accessor: 'quarterYYYYQ',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Date',
            accessor: 'localDateTime',
        },
        ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    ];

    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedDates = React.useMemo(() => dates, [dates]);

    return <OurTable
        data={ memoizedDates }
        columns={memoizedColumns}
        testid={"UCSBDatesTable"}
    />;
};