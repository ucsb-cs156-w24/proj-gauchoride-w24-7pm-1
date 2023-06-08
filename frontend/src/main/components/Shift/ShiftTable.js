
import OurTable from "main/components/OurTable"



export default function ShiftTable({ shift }) {

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
            Header: 'Shift start',
            accessor: 'shiftStart',
        },
        {
            Header: 'Shift end',
            accessor: 'shiftEnd',
        },
        {
            Header: 'Driver',
            accessor: 'driverID'
        },
        {
            Header: 'Backup driver',
            accessor: 'driverBackupID',
        }
    ];

    return <OurTable
        data={shift}
        columns={columns}
        testid={"ShiftTable"}
    />;
};