import React from "react";
import OurTable from "main/components/OurTable"

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
    }
];

export default function UCSBDatesTable({ dates }) {
    return <OurTable
        data={dates}
        columns={columns}
        testid={"UCSBDatesTable"} />;
};