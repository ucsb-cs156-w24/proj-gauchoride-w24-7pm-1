import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default function UsersTable({ users }) {

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
        },
        {
            dataField: "givenName",
            text: "First Name",
            sort: true,
        },
        {
            dataField: "familyName",
            text: "Last Name",
            sort: true,
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
        },
        {
            dataField: "admin",
            text: "Admin",
            sort: true,
        }
    ];

    return <BootstrapTable
        bootstrap4={true}
        keyField="id"
        data={users}
        columns={columns} />;
};