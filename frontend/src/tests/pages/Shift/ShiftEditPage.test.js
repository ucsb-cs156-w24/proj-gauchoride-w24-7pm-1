import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ShiftEditPage from "main/pages/Shift/ShiftEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

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
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ShiftEditPage tests", () => {

    describe("when the backend doesn't return a shift", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/shift", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {queryByTestId, findByText} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await findByText("Edit Shift");
            expect(queryByTestId("ShiftForm-day")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/shift", { params: { id: 17 } }).reply(200, {
                id: 17,
                day: "Tuesday",
                shiftStart: "05:00PM",
                shiftEnd: "07:30PM",
                driverID: 1,
                driverBackupID: 2
            });
            axiosMock.onPut('/api/shift').reply(200, {
                id: 17,
                day: "Monday",
                shiftStart: "03:30PM",
                shiftEnd: "04:30PM",
                driverID: 2,
                driverBackupID: 3
            });
              
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("ShiftForm-day");

            const dayField = getByTestId("ShiftForm-day");
            const startField = getByTestId("ShiftForm-shiftStart");
            const endField = getByTestId("ShiftForm-shiftEnd");
            const driverField = getByTestId("ShiftForm-driverID");
            const backupDriverField = getByTestId("ShiftForm-driverBackupID");

            expect(dayField).toHaveValue("Tuesday");
            expect(startField).toHaveValue("05:00PM");
            expect(endField).toHaveValue("07:30PM");
            expect(driverField).toHaveValue(1);
            expect(backupDriverField).toHaveValue(2);
        });

        test("Changes when you click Update", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        
            await findByTestId("ShiftForm-day");
        
            const dayField = getByTestId("ShiftForm-day");
            const startField = getByTestId("ShiftForm-shiftStart");
            const endField = getByTestId("ShiftForm-shiftEnd");
            const driverField = getByTestId("ShiftForm-driverID");
            const backupDriverField = getByTestId("ShiftForm-driverBackupID");
            const submitButton = getByTestId("ShiftForm-submit");
        
            // Initial values assertions
            expect(dayField).toHaveValue("Tuesday");
            expect(startField).toHaveValue("05:00PM");
            expect(endField).toHaveValue("07:30PM");
            expect(driverField).toHaveValue(1);
            expect(backupDriverField).toHaveValue(2);

            expect(submitButton).toBeInTheDocument();
        
            fireEvent.change(dayField, { target: { value: 'Monday' } });
            fireEvent.change(startField, { target: { value: '03:30PM' } });
            fireEvent.change(endField, { target: { value: "04:30PM" } });
            fireEvent.change(driverField, { target: { value: 2 } });
            fireEvent.change(backupDriverField, { target: { value: 3 } });
        
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toHaveBeenCalled());
            expect(mockToast).toBeCalledWith("Shift Updated - id: 17");
            expect(mockNavigate).toBeCalledWith({ "to": "/shift" });
            
            // Asserting the axios PUT call
            
            expect(axiosMock.history.put.length).toBe(1);


            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                day: "Monday",
                shiftStart: "03:30PM",
                shiftEnd: "04:30PM",
                driverID: "2",
                driverBackupID: "3"
            })); // posted object
        });
        

    });
});
