import { render } from "@testing-library/react";
import driverFixtures from "fixtures/driverFixtures";
import DriverTable from "main/components/Driver/DriverTable";
import { QueryClient, QueryClientProvider } from "react-query";


describe("DriverTable tests", () => {
    const queryClient = new QueryClient();

    test("renders without crashing for empty table", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <DriverTable drivers={[]} />
            </QueryClientProvider>
        );
    });

    test("renders without crashing for three shifts", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <DriverTable drivers={driverFixtures.threeDrivers} />
            </QueryClientProvider>
        );
    });

    test("Has the expected column headers and content", () => {
        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <DriverTable drivers={driverFixtures.threeDrivers}/>
            </QueryClientProvider>
        );
    
        const expectedHeaders = ["id", "Name", "Email", "Cell-Phone"];
        const expectedFields = ["id", "Name", "email", "cellPhone"];
        const testId = "DriverTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(getByTestId(`${testId}-cell-row-0-col-Name`)).toHaveTextContent("gName1 fName1");
        expect(getByTestId(`${testId}-cell-row-0-col-email`)).toHaveTextContent("generic1@gmail.com");
        expect(getByTestId(`${testId}-cell-row-0-col-cellPhone`)).toHaveTextContent("111-111-1111");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-1-col-Name`)).toHaveTextContent("gName2 fName2");
        expect(getByTestId(`${testId}-cell-row-1-col-email`)).toHaveTextContent("generic2@gmail.com");
        expect(getByTestId(`${testId}-cell-row-1-col-cellPhone`)).toHaveTextContent("222-222-2222");
      });
});
