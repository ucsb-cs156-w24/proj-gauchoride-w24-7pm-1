import { render } from "@testing-library/react";
import shiftFixtures from "fixtures/shiftFixtures";
import ShiftTable from "main/components/Shift/ShiftTable"
import { QueryClient, QueryClientProvider } from "react-query";


describe("ShiftTable tests", () => {
    const queryClient = new QueryClient();

    test("renders without crashing for empty table", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ShiftTable shift={[]} />
            </QueryClientProvider>
        );
    });

    test("renders without crashing for three shifts", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ShiftTable shift={shiftFixtures.threeShifts} />
            </QueryClientProvider>
        );
    });

    test("Has the expected column headers and content", () => {
        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <ShiftTable shift={shiftFixtures.threeShifts}/>
            </QueryClientProvider>
        );
    
        const expectedHeaders = ["id", "day", "shift", "driver", "driver backup"];
        const expectedFields = ["id", "day", "shift", "driver", "driverBackup"];
        const testId = "ShiftTable";

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
        expect(getByTestId(`${testId}-cell-row-0-col-shift`)).toHaveTextContent("8AM-11AM");
        expect(getByTestId(`${testId}-cell-row-0-col-driver`)).toHaveTextContent("Adam");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-1-col-day`)).toHaveTextContent("Tuesday");
        expect(getByTestId(`${testId}-cell-row-1-col-shift`)).toHaveTextContent("11AM-2PM");
        expect(getByTestId(`${testId}-cell-row-1-col-driver`)).toHaveTextContent("Bob");

      });
});

