import OurTable from "main/components/OurTable"


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
        Header: 'Backup driver',
        accessor: 'driverBackupID',
    }
];

export default function DriverShiftsTable({ drivershifts }) {
    return <OurTable
        data={drivershifts}
        columns={columns}
        testid={"DriverShiftsTable"}
    />;
};