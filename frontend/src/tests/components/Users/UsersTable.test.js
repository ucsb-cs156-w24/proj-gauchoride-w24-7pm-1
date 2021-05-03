import { render } from "@testing-library/react";
import usersFixtures from "fixtures/usersFixtures";
import UsersTable from "main/components/Users/UsersTable"

describe("UserTable tests", () => {

    test("renders without crashing for empty table", () => {
        render(
            <UsersTable users={[]} />
        );
    });

    test("renders without crashing for two users", () => {
        render(
            <UsersTable users={usersFixtures.twoUsers} />
        );
    });

});

