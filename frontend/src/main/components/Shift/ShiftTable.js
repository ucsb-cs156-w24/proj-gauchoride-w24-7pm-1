
import OurTable from "main/components/OurTable"



export default function ShiftTable({ shift }) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'day',
            accessor: 'day',
        },
        {
            Header: 'shift',
            accessor: 'shift',
        },
        {
            Header: 'driver',
            accessor: 'driver'
        },
        {
            Header: 'driver backup',
            accessor: 'driverBackup',
        }
    ];

    return <OurTable
        data={shift}
        columns={columns}
        testid={"ShiftTable"}
    />;
};