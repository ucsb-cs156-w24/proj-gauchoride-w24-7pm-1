import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShiftCreatePage from "main/pages/Shift/ShiftCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ShiftCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend, and redirects to /shift", async () => {

        const queryClient = new QueryClient();
        const shift = {
            id: 1,
            day: "Sunday",
            shiftStart: "11:40AM",
            shiftEnd: "11:59AM",
            driverID: "1",
            driverBackupID: "2"
        };
        const noidshift = {
            day: "Sunday",
            shiftStart: "11:40AM",
            shiftEnd: "11:59AM",
            driverID: "1",
            driverBackupID: "2"
        }

        axiosMock.onPost("/api/shift/post").reply(202, shift);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByLabelText("Day of the Week")).toBeInTheDocument();
        });

        // Test for Day input
        const dayInput = screen.getByLabelText("Day of the Week");
        expect(dayInput).toBeInTheDocument();

        // Test for Shift Start input
        const shiftStartInput = screen.getByLabelText("Shift Start");
        expect(shiftStartInput).toBeInTheDocument();

        // Test for Shift End input
        const shiftEndInput = screen.getByLabelText("Shift End");
        expect(shiftEndInput).toBeInTheDocument();

        // Test for Driver ID input
        const driverIDInput = screen.getByLabelText("Driver ID");
        expect(driverIDInput).toBeInTheDocument();

        // Test for Driver Backup ID input
        const driverBackupIDInput = screen.getByLabelText("Driver Backup ID");
        expect(driverBackupIDInput).toBeInTheDocument();

        // Simulating filling out the form
        fireEvent.change(dayInput, { target: { value: shift.day } });
        fireEvent.change(shiftStartInput, { target: { value: shift.shiftStart } });
        fireEvent.change(shiftEndInput, { target: { value: shift.shiftEnd } });
        fireEvent.change(driverIDInput, { target: { value: String(shift.driverID) } });
        fireEvent.change(driverBackupIDInput, { target: { value: String(shift.driverBackupID) } });

        const createButton = screen.getByRole('button', { name: /Create/ });

        fireEvent.click(createButton);

        // Wait for the axios call to be made
        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        // Asserting that the post request was made with correct parameters
        expect(axiosMock.history.post[0].params).toEqual(noidshift);

        // Assert that the toast and navigate functions were called with expected values
        expect(mockToast).toBeCalledWith(`New shift Created - id: ${shift.id}, day: ${shift.day}, shiftStart: ${shift.shiftStart}, shiftEnd: ${shift.shiftEnd}, driverID: ${shift.driverID}, driverBackupID: ${shift.driverBackupID}`);
        expect(mockNavigate).toBeCalledWith({ "to": "/shift" });

    });
});

