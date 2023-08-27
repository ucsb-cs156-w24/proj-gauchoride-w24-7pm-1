import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ShiftIndexPage from "main/pages/Shift/ShiftIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { shiftFixtures } from "fixtures/shiftFixtures";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("ShiftIndexPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "ShiftTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };


    const queryClient = new QueryClient();


    test("fetches shifts using the correct GET method", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/shift/all").reply(config => {
            if (config.method === "get") {  // Ensures the method is GET
                return [200, shiftFixtures.threeShifts];
            }
            return [405, { error: "Method not allowed" }]; // Return a 405 error if the method is not GET
        });
    
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        // Check that the shifts were fetched and displayed
        await waitFor(() => { 
            expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 
        });
        
        // If the method was not GET, the test should throw an error
        // You could either verify that no error toast is displayed or verify that the shifts are displayed
        expect(mockToast).not.toBeCalledWith("Method not allowed");
    });

    test("fetches shifts using the GET method", async () => {
        setupAdminUser();
    
        // This variable will help us verify that the correct method was used.
        let wasGetMethodUsed = false;
    
        axiosMock.onAny("/api/shift/all").reply(config => {
            if (config.method === "get") {  
                wasGetMethodUsed = true; 
                return [200, shiftFixtures.threeShifts];
            }
            // If any other method is used, return an error
            return [405, { error: "Method not allowed" }];
        });
    
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        // Check that the shifts were fetched and displayed
        await waitFor(() => { 
            expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 
        });
        
        // Check if the correct GET method was used.
        expect(wasGetMethodUsed).toBeTruthy();
    
        // Ensure that no error toast with "Method not allowed" is shown, further validating that GET was used.
        expect(mockToast).not.toBeCalledWith("Method not allowed");
    });

    test("Renders with Create Button for admin user", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/shift/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Create Shift/)).toBeInTheDocument();
        });
        const button = screen.getByText(/Create Shift/);
        expect(button).toHaveAttribute("href", "/shift/create");
        expect(button).toHaveAttribute("style", "float: right;");
    });

    test("renders three shifts correctly for regular user", async () => {
        setupUserOnly();
        axiosMock.onGet("/api/shift/all").reply(200, shiftFixtures.threeShifts);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(screen.getByTestId(`${testId}-cell-row-0-col-day`)).toHaveTextContent("Monday");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-shiftStart`)).toHaveTextContent("08:00AM");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-shiftEnd`)).toHaveTextContent("11:00AM");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-driverID`)).toHaveTextContent("1");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-driverBackupID`)).toHaveTextContent("3");


        const createShiftButton = screen.queryByText("Create Shift");
        expect(createShiftButton).not.toBeInTheDocument();

        const day = screen.getByText("Monday");
        expect(day).toBeInTheDocument();

        // const description = screen.getByText("Burrito joint, and iconic Isla Vista location");
        // expect(description).toBeInTheDocument();

        // for non-admin users, details button is visible, but the edit and delete buttons should not be visible
        expect(screen.queryByTestId("ShiftTable-cell-row-0-col-Delete-button")).not.toBeInTheDocument();
        expect(screen.queryByTestId("ShiftTable-cell-row-0-col-Edit-button")).not.toBeInTheDocument();
    });



    test("what happens when you click delete, admin", async () => {
        setupAdminUser();

        axiosMock.onGet("/api/shift/all").reply(200, shiftFixtures.threeShifts);
        axiosMock.onDelete("/api/shift").reply(200, "Shift with id 1 was deleted");


        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

        expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");


        const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("Shift with id 1 was deleted") });

        await waitFor(() => { expect(axiosMock.history.delete.length).toBe(1); });
        //expect(axiosMock.history.delete[0].url).toBe("/api/shift");
        expect(axiosMock.history.delete[0].url).toBe("/api/shift");
        expect(axiosMock.history.delete[0].params).toEqual({ id: 1 });
    });

});


