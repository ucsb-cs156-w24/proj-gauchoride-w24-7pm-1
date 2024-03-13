import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DriverAvailabilityIndexPage from "main/pages/Drivers/DriverAvailabilityIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { driverAvailabilityFixtures } from "fixtures/driverAvailabilityFixtures";

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

describe("DriverAvailabilityIndexPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "DriverAvailabilityTable";

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupDriverUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.driverOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };


    const queryClient = new QueryClient();


    test("fetches driverAvailabilities using the correct GET method", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/driverAvailability").reply(config => {
            if (config.method === "get") {  // Ensures the method is GET
                return [200, driverAvailabilityFixtures.threeAvailability];
            }
            return [405, { error: "Method not allowed" }]; // Return a 405 error if the method is not GET
        });
    
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverAvailabilityIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        // Check that the DriverAvailabilitys were fetched and displayed
        await waitFor(() => { 
            expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 
        });
        
        // If the method was not GET, the test should throw an error
        // You could either verify that no error toast is displayed or verify that the DriverAvailabilitys are displayed
        expect(mockToast).not.toBeCalledWith("Method not allowed");
    });

    test("fetches DriverAvailabilitys using the GET method", async () => {
        setupAdminUser();
    
        // This variable will help us verify that the correct method was used.
        let wasGetMethodUsed = false;
    
        axiosMock.onAny("/api/driverAvailability").reply(config => {
            if (config.method === "get") {  
                wasGetMethodUsed = true; 
                return [200, driverAvailabilityFixtures.threeAvailability];
            }
            // If any other method is used, return an error
            return [405, { error: "Method not allowed" }];
        });
    
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverAvailabilityIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        // Check that the DriverAvailabilitys were fetched and displayed
        await waitFor(() => { 
            expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 
        });
        
        // Check if the correct GET method was used.
        expect(wasGetMethodUsed).toBeTruthy();
    
        // Ensure that no error toast with "Method not allowed" is shown, further validating that GET was used.
        expect(mockToast).not.toBeCalledWith("Method not allowed");
    });

    test("Renders with Create Button for driver user", async () => {
        setupDriverUser();
        axiosMock.onGet("/api/driverAvailability").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverAvailabilityIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Create Driver Availability/)).toBeInTheDocument();
        });
        const button = screen.getByText(/Create Driver Availability/);
        expect(button).toHaveAttribute("href", "/availability/create");
        expect(button).toHaveAttribute("style", "float: right;");
    });

    
    test("renders three DriverAvailabilitys correctly for regular user", async () => {
        setupDriverUser();
        axiosMock.onGet("/api/driverAvailability").reply(200, driverAvailabilityFixtures.threeAvailability);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverAvailabilityIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(screen.getByTestId(`${testId}-cell-row-0-col-driverId`)).toHaveTextContent("4");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-day`)).toHaveTextContent("Monday");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-startTime`)).toHaveTextContent("09:00AM");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-endTime`)).toHaveTextContent("12:00PM");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-notes`)).toHaveTextContent("has class from 8-9am");


        const createDriverAvailabilityButton = screen.queryByText("Create Driver Availability");
        expect(createDriverAvailabilityButton).toBeInTheDocument();

        const day = screen.getByText("Monday");
        expect(day).toBeInTheDocument();

        // const description = screen.getByText("Burrito joint, and iconic Isla Vista location");
        // expect(description).toBeInTheDocument();

        // for drivers users all buttons should be visible
        expect(screen.queryByTestId("DriverAvailabilityTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.queryByTestId("DriverAvailabilityTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });



    test("what happens when you click delete, driver", async () => {
        setupDriverUser();

        axiosMock.onGet("/api/driverAvailability").reply(200, driverAvailabilityFixtures.threeAvailability);
        axiosMock.onDelete("/api/driverAvailability").reply(200, "DriverAvailability with id 1 was deleted");


        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverAvailabilityIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

        expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");


        const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("DriverAvailability with id 1 was deleted") });

        await waitFor(() => { expect(axiosMock.history.delete.length).toBe(1); });
        expect(axiosMock.history.delete[0].url).toBe("/api/driverAvailability");
        expect(axiosMock.history.delete[0].params).toEqual({ id: 1 });
    });

});