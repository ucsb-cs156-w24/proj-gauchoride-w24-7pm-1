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
        const { getByText } = render(
          <UsersTable users={[]}/>
        );
    
        const expectedHeaders = ["id", "First Name", "Last Name", "Email", "Admin"];
        
        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });
      });
  
});

