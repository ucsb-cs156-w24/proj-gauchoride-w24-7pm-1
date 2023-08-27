import { render } from "@testing-library/react";
import drivershiftsFixtures from "fixtures/drivershiftsFixtures";
import DriverShiftsTable from "main/components/Driver/DriverShiftsTable";
import { QueryClient, QueryClientProvider } from "react-query";


describe("DriverShiftsTable tests", () => {
    const queryClient = new QueryClient();

    test("renders without crashing for empty table", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <DriverShiftsTable drivershifts={[]} />
            </QueryClientProvider>
        );
    });

    test("renders without crashing for three shifts", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <DriverShiftsTable drivershifts={drivershiftsFixtures.threeShifts} />
            </QueryClientProvider>
        );
    });

    test("Has the expected column headers and content", () => {
        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <DriverShiftsTable drivershifts={drivershiftsFixtures.threeShifts}/>
            </QueryClientProvider>
        );
    
        const expectedHeaders = ["id", "Day", "Shift start", "Shift end", "Driver", "Backup driver"];
        const expectedFields = ["id", "day", "shiftStart", "shiftEnd", "driverID", "driverBackupID"];
        const testId = "DriverShiftsTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(getByTestId(`${testId}-cell-row-0-col-day`)).toHaveTextContent("Monday");
        expect(getByTestId(`${testId}-cell-row-0-col-shiftStart`)).toHaveTextContent("09:00AM");
        expect(getByTestId(`${testId}-cell-row-0-col-shiftEnd`)).toHaveTextContent("12:00PM");
        expect(getByTestId(`${testId}-cell-row-0-col-driverBackupID`)).toHaveTextContent("3");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-1-col-day`)).toHaveTextContent("Tuesday");
        expect(getByTestId(`${testId}-cell-row-1-col-shiftStart`)).toHaveTextContent("11:30AM");
        expect(getByTestId(`${testId}-cell-row-1-col-shiftEnd`)).toHaveTextContent("02:30PM");
        expect(getByTestId(`${testId}-cell-row-1-col-driverBackupID`)).toHaveTextContent("1");
      });
});
