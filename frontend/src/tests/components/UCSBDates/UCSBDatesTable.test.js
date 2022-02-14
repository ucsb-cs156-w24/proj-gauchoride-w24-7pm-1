import { render } from "@testing-library/react";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";
import UCSBDatesTable from "main/components/UCSBDates/UCSBDatesTable"
import { QueryClient, QueryClientProvider } from "react-query";


describe("UserTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UCSBDatesTable dates={[]} />
      </QueryClientProvider>

    );
  });

  test("Has the expected colum headers and content", () => {
    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <UCSBDatesTable dates={ucsbDatesFixtures.threeDates} />
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "QuarterYYYYQ", "Name", "Date"];
    const expectedFields = ["id", "quarterYYYYQ", "name", "localDateTime"];
    const testId = "UCSBDatesTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });
});

