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

    test("renders without crashing for two users", () => {
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
    

      const columnIsSortable = async ( mapping, columnHeading, col) => {
        const { getByText, getByTestId } = render(
            <UsersTable users={usersFixtures.threeUsers} />
          );
      
          const users = usersFixtures.threeUsers;
      
          const { first, smallest, largest } = getFirstSmallestLargest(
            users,
            mapping
          );
      
          const header = getByText(columnHeading);
          expect(header).toBeInTheDocument();
          expect(getByTestId(`row-0-col-${col}`)).toHaveTextContent(first);
      
          userEvent.click(header);
      
          await waitFor(() =>
            expect(getByTestId(`row-0-col-${col}`)).toHaveTextContent(largest)
          );
      
          userEvent.click(header);
      
          await waitFor(() =>
            expect(getByTestId(`row-0-col-${col}`)).toHaveTextContent(smallest)
          );
      };

      test("Id column is sortable", async () => {
        await columnIsSortable((u)=>u.id, "id",0);
      });

      test("First Name column is sortable", async () => {
        await columnIsSortable((u)=>u.givenName, "First Name",1);
      });

      test("Last Name column is sortable", async () => {
        await columnIsSortable((u)=>u.familyName, "Last Name",2);
      });

      test("Email column is sortable", async () => {
        await columnIsSortable((u)=>u.email, "Email",3);
      });

      test("Admin column is sortable", async () => {
        await columnIsSortable((u)=>u.admin, "Admin",4);
      });

      test("sort carets appear (i.e. bootstrap4=true is passed)", async () => {
        const { container, getByText } = render(
            <UsersTable users={usersFixtures.threeUsers} />
        );
    
        const header = getByText("id");
        expect(header).toBeInTheDocument();
    
        // checks for presence of Bootstrap 4 sort carets
        userEvent.click(header);
        await waitFor(() =>
          expect(container.getElementsByClassName("caret-4-desc").length).toBe(1)
        );
    
        // checks for presence of Bootstrap 4 sort carets
        userEvent.click(header);
        await waitFor(() =>
          expect(container.getElementsByClassName("caret-4-asc").length).toBe(1)
        );
      });
});

