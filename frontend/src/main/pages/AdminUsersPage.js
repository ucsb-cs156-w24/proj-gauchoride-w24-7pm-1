import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersTable from "main/components/Users/UsersTable"

import { useBackend } from "main/utils/useBackend";
const AdminUsersPage = () => {

    const { data: users, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/admin/users"],
            { method: "GET", url: "/api/admin/users" },
            []
        );

    return (
        <BasicLayout>
            <h2>Users</h2>
            <UsersTable users={users} />
        </BasicLayout>
    );
};

export default AdminUsersPage;
