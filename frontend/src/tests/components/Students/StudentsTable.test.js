import { fireEvent, render, waitFor } from "@testing-library/react";
import { studentFixtures } from "fixtures/studentFixtures";
import StudentsTable from "main/components/Students/StudentsTable"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


describe("StudentsTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentsTable students={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentsTable students={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentsTable students={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected colum headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentsTable students={studentFixtures.twoStudents} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "First Name", "Last Name", "Perm"];
    const expectedFields = ["id", "firstName", "lastName", "perm"];
    const testId = "StudentsTable";

    expectedHeaders.forEach( (headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    } );

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("abcd1234abcd1234abcd1234");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("abcd5678abcd5678abcd5678");
    expect(getByTestId(`${testId}-cell-row-0-col-firstName`)).toHaveTextContent("Chris");
    expect(getByTestId(`${testId}-cell-row-1-col-firstName`)).toHaveTextContent("Seth");

  });

});

