import { render, waitFor } from "@testing-library/react";
import usersFixtures from "fixtures/usersFixtures";
import UsersTable from "main/components/Users/UsersTable"
import { getFirstSmallestLargest } from "main/utils/arrayUtils";
import userEvent from "@testing-library/user-event";

describe("UserTable tests", () => {

    test("renders without crashing for empty table", () => {
        render(
            <UsersTable users={[]} />
        );
    });

    test("renders without crashing for three users", () => {
        render(
            <UsersTable users={usersFixtures.threeUsers} />
        );
    });

    test("Has the expected colum headers", () => {
        const { getByText, getByTestId } = render(
          <UsersTable users={usersFixtures.threeUsers}/>
        );
    
        const expectedHeaders = ["id", "First Name", "Last Name", "Email", "Admin"];
        const expectedFields = ["id", "givenName", "familyName", "email", "admin"];
        const testId = "UsersTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
      });
});

