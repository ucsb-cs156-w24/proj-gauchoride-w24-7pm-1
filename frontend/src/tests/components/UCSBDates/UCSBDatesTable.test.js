import { render } from "@testing-library/react";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";
import UCSBDatesTable from "main/components/UCSBDates/UCSBDatesTable"


describe("UserTable tests", () => {

    test("renders without crashing for empty table", () => {
        render(
            <UCSBDatesTable dates={[]} />
        );
    });

    test("Has the expected colum headers and content", () => {
        const { getByText, getByTestId } = render(
          <UCSBDatesTable dates={ucsbDatesFixtures.threeDates}/>
        );
    
        const expectedHeaders = ["id", "QuarterYYYYQ", "Name", "Date"];
        const expectedFields = ["id", "quarterYYYYQ", "name", "localDateTime"];
        const testId = "UCSBDatesTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

      });
});

