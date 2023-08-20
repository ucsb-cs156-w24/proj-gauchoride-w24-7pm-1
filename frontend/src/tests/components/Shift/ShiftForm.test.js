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

    test("validates specific time format anomalies", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test removing start anchor for shift start
        fireEvent.change(shiftStartInput, { target: { value: "X11:59AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    
        // Test removing end anchor for shift start
        fireEvent.change(shiftStartInput, { target: { value: "11:59AMX" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    
        // Test changing character class for shift start
        fireEvent.change(shiftStartInput, { target: { value: "01X:59AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    
        // Repeat for shiftEndInput
        fireEvent.change(shiftEndInput, { target: { value: "X11:59AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
        
        fireEvent.change(shiftEndInput, { target: { value: "11:59AMX" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
        
        fireEvent.change(shiftEndInput, { target: { value: "01X:59AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
    });

    test("validates time format with extra characters", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test for characters following AM/PM for shift start
        fireEvent.change(shiftStartInput, { target: { value: "11:59AMX" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    
        // Resetting input
        fireEvent.change(shiftStartInput, { target: { value: "" } });
    
        // Test for characters following AM/PM for shift end
        fireEvent.change(shiftEndInput, { target: { value: "11:59PMX" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
    
        // Resetting input
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    });
    
    test("validates time format with character anomalies", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test for strings like "0X:00AM" for shift start
        fireEvent.change(shiftStartInput, { target: { value: "0X:00AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    
        // Resetting input
        fireEvent.change(shiftStartInput, { target: { value: "" } });
    
        // Test for strings like "0X:00PM" for shift end
        fireEvent.change(shiftEndInput, { target: { value: "0X:00PM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
    
        // Resetting input
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    });
    
    test("invalidates incorrect time formats from mutations", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test the mutation that allows any character except those between 0-5 for the first character of the minutes
        fireEvent.change(shiftStartInput, { target: { value: "12:X5AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
        fireEvent.change(shiftStartInput, { target: { value: "" } });
    
        // Test the mutation that allows any character except 0-2 after the 1 for hours
        fireEvent.change(shiftEndInput, { target: { value: "1X:59AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    
        // Test the mutation that allows any character except 0-9 for the second character of the minutes
        fireEvent.change(shiftStartInput, { target: { value: "11:5XAM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    });

    test("invalidates evem more time formats from mutations", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftStartInput = screen.getByTestId("ShiftForm-shiftStart");
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test for any character except 0-2 after the 1 for hours for shift start
        fireEvent.change(shiftStartInput, { target: { value: "1X:00AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
        fireEvent.change(shiftStartInput, { target: { value: "" } });
    
        // Test for any character except 0-5 as the first character for minutes for shift end
        fireEvent.change(shiftEndInput, { target: { value: "12:X0AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    
        // Test for any character except 0-9 as the second character for minutes for shift start
        fireEvent.change(shiftStartInput, { target: { value: "11:5XAM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftStart + .invalid-feedback' });
    });
    
    test("validates time format with more character anomalies for shift end", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test for strings like "0X:00AM" for shift end
        fireEvent.change(shiftEndInput, { target: { value: "0X:00AM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
        
        // Resetting input
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    });

    test("validates that the minutes part of the time format must have digits", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ShiftForm />
                </Router>
            </QueryClientProvider>
        );
    
        const shiftEndInput = screen.getByTestId("ShiftForm-shiftEnd");
    
        // Test for strings like "12:5XAM" for shift end
        fireEvent.change(shiftEndInput, { target: { value: "12:5XAM" } });
        fireEvent.click(screen.getByText(/Create/));
        await screen.findByText(/Invalid time format./, { selector: '#shiftEnd + .invalid-feedback' });
    
        // Resetting input
        fireEvent.change(shiftEndInput, { target: { value: "" } });
    });
    
    
    
    
});