import React from "react";
import OurTable from "main/components/OurTable"

const columns = [
    {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
    },
    {
        Header: 'First Name',
        accessor: 'givenName',
    },
    {
        Header: 'Last Name',
        accessor: 'familyName',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Admin',
        accessor: 'admin',
    },
];

export default function UsersTable({ users }) {
    return <OurTable
        data={users}
        columns={columns} />;
};