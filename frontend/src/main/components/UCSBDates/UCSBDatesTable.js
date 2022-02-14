import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess, editCallback } from "main/utils/UCSBDateUtils"

export default function UCSBDatesTable({ dates }) {
  
    const deleteMutation = useBackendMutation(cellToAxiosParamsDelete, { onSuccess: onDeleteSuccess },  ["/api/ucsbdates/all"]);
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell);  }

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

    // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedDates = React.useMemo(() => dates, [dates]);

    return <OurTable
        data={ memoizedDates }
        columns={memoizedColumns}
        testid={"UCSBDatesTable"}
    />;
};