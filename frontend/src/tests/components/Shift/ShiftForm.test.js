import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import ShiftForm from "main/components/Shift/ShiftForm";
import { shiftFixtures } from "fixtures/shiftFixtures";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ShiftForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["Day of the Week", "Shift Start","Shift End","Driver ID","Driver Backup ID"];
    const testId = "ShiftForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm initialContents={shiftFixtures.oneShift} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expect(await screen.findByTestId(`${testId}-id`)).toBeInTheDocument();
        expect(screen.getByText(`Id`)).toBeInTheDocument();
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("that the correct validations are performed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        await screen.findByText(/Day is required/);
        expect(screen.getByText(/Shift start time is required/)).toBeInTheDocument();
        expect(screen.getByText(/Shift end time is required/)).toBeInTheDocument();
        expect(screen.getByText(/Driver ID is required/)).toBeInTheDocument();
        expect(screen.getByText(/Driver Backup ID is required/)).toBeInTheDocument();


    });
    //ADDED BELOW
    test("renders data-testid attributes", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
        expect(screen.getByTestId("ShiftForm-day")).toBeInTheDocument();
        expect(screen.getByTestId("ShiftForm-shiftStart")).toBeInTheDocument();
        expect(screen.getByTestId("ShiftForm-shiftEnd")).toBeInTheDocument();
        expect(screen.getByTestId("ShiftForm-driverID")).toBeInTheDocument();
        expect(screen.getByTestId("ShiftForm-driverBackupID")).toBeInTheDocument();
        expect(screen.getByTestId("ShiftForm-submit")).toBeInTheDocument();
    });

    test("validates time format", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );

        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");

        // Test an invalid start time
        fireEvent.change(shiftStartInput, { target: { value: "2567:00AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./)
        fireEvent.change(shiftStartInput, { target: { value: "" } }); 
        // Test an invalid end time
        fireEvent.change(shiftEndInput, { target: { value: "12345:65PM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./)
        fireEvent.change(shiftStartInput, { target: { value: "" } }); 
        // Test another invalid end time format
        fireEvent.change(shiftEndInput, { target: { value: "6543:30AB" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./)
    });

    test("shows validation error messages", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );

        // Click create without filling in any fields
        fireEvent.click(screen.getByText(/Create/));

        // Check for validation error messages
        await screen.findByText(/Day is required/);
        //expect(screen.getByText("Day is required.")).toBeInTheDocument();
        expect(screen.getByText("Shift start time is required.")).toBeInTheDocument();
        expect(screen.getByText("Shift end time is required.")).toBeInTheDocument();
        expect(screen.getByText("Driver ID is required.")).toBeInTheDocument();
        expect(screen.getByText("Driver Backup ID is required.")).toBeInTheDocument();
    });

});