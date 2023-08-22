import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ShiftIndexPage from "main/pages/Shift/ShiftIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";
import { shiftFixtures } from "fixtures/shiftFixtures";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

console.log("Log message start 1")
const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

console.log("Log message 2")

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

    console.log("Log message 3")

    const queryClient = new QueryClient();

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
    console.log("Log message 4")

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
        //TODO: Fix these expects to be cosistent with shiftFixtures.threeShifts
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
    console.log("Log message 5")

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        axiosMock.onGet("/api/shift/all").timeout();

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        
        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/shift/all");
        restoreConsole();

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


console.log("Log message 6")
