import OurTable from "main/components/OurTable"


export default function DriverTable({ drivers }) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Name',
            accessor: (row) => `${row.givenName} ${row.familyName}`, // Combine givenName and familyName
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Cell-Phone',
            accessor: 'cellPhone',
        }
    ];

    return <OurTable
        data={drivers}
        columns={columns}
        testid={"DriverTable"}
    />;
};