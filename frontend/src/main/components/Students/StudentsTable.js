import React from "react";
import OurTable from "main/components/OurTable";

export default function StudentsTable({ students, currentUser }) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'Perm',
            accessor: 'perm',
        }
    ];

    // Stryker disable ArrayDeclaration : [columns] and [students] are performance optimization; mutation preserves correctness
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedDates = React.useMemo(() => students, [students]);
    // Stryker enable ArrayDeclaration

    return <OurTable
        data={memoizedDates}
        columns={memoizedColumns}
        testid={"StudentsTable"}
    />;
};