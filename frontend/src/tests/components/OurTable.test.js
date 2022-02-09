import { render, waitFor, fireEvent } from "@testing-library/react";
import OurTable from "main/components/OurTable";

describe("OurTable tests", () => {
    const threeRows = [
        {
            col1: 'Hello',
            col2: 'World',
        },
        {
            col1: 'react-table',
            col2: 'rocks',
        },
        {
            col1: 'whatever',
            col2: 'you want',
        }
    ];

    const columns = [
        {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
        },
        {
            Header: 'Column 2',
            accessor: 'col2',
        }
    ];

    test("renders an empty table without crashing", () => {
        render(
            <OurTable columns={columns} data={[]} />
        );
    });

    test("renders a table with two rows without crashing", () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );
    });

    test("click on a header and a sort caret should appear", async () => {
        const {getByTestId, getByText } = render(
            <OurTable columns={columns} data={threeRows} testid={"sampleTestId"} />
        );

        await waitFor( ()=> expect(getByTestId("table-header-sampleTestId-col1")).toBeInTheDocument() );
        const col1Header = getByTestId("table-header-sampleTestId-col1");

        fireEvent.click(col1Header);
        await waitFor( ()=> expect(getByText("🔼")).toBeInTheDocument() );

        fireEvent.click(col1Header);
        await waitFor( ()=> expect(getByText("🔽")).toBeInTheDocument() );

    });

});