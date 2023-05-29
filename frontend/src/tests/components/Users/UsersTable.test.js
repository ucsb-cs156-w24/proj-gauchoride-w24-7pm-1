import { render } from "@testing-library/react";
import usersFixtures from "fixtures/usersFixtures";
import UsersTable from "main/components/Users/UsersTable"
import { QueryClient, QueryClientProvider } from "react-query";


describe("UserTable tests", () => {
    const queryClient = new QueryClient();

    test("renders without crashing for empty table", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UsersTable users={[]} />
            </QueryClientProvider>
        );
    });

    test("renders without crashing for three users", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UsersTable users={usersFixtures.threeUsers} />
            </QueryClientProvider>
        );
    });

    test("Has the expected column headers and content", () => {
        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <UsersTable users={usersFixtures.threeUsers}/>
            </QueryClientProvider>
        );
    
        const expectedHeaders = ["id", "First Name", "Last Name", "Email", "Admin", "Driver"];
        const expectedFields = ["id", "givenName", "familyName", "email", "admin", "driver"];
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
        expect(getByTestId(`${testId}-cell-row-0-col-admin`)).toHaveTextContent("true");
        expect(getByTestId(`${testId}-cell-row-0-col-driver`)).toHaveTextContent("false");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-1-col-admin`)).toHaveTextContent("false");
        expect(getByTestId(`${testId}-cell-row-1-col-driver`)).toHaveTextContent("true");

      });
});

