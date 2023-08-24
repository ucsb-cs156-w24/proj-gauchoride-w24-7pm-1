import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ShiftEditPage from "main/pages/Shift/ShiftEditPage";
import { shiftFixtures } from "fixtures/shiftFixtures";

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

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/shift", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit Shift");
            expect(screen.queryByTestId("Shift-name")).not.toBeInTheDocument();//TODO
            restoreConsole();
        });
    });

    describe("tests where the backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/shift", { params: { id: 17 } }).reply(200, shiftFixtures.oneShift[0]);
            axiosMock.onPut('/api/shift').reply(200, shiftFixtures.oneShift[0]);
        });

        const queryClient = new QueryClient();

        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("ShiftForm-id");

            const idField = screen.getByTestId("ShiftForm-id");
            const dayField = screen.getByTestId("ShiftForm-day");
            const startField = screen.getByTestId("ShiftForm-shiftStart");
            const endField = screen.getByTestId("ShiftForm-shiftEnd");
            const driverField = screen.getByTestId("ShiftForm-driverID");
            const backupDriverField = screen.getByTestId("ShiftForm-driverBackupID");
            const submitButton = screen.getByTestId("ShiftForm-submit");

            expect(idField).toBeInTheDocument();
            expect(idField).toHaveValue("1");
            expect(dayField).toBeInTheDocument();
            expect(dayField).toHaveValue("Friday");
            expect(startField).toBeInTheDocument();
            expect(startField).toHaveValue("09:00AM");
            expect(endField).toBeInTheDocument();
            expect(endField).toHaveValue("10:00AM");
            expect(driverField).toBeInTheDocument();
            expect(driverField).toHaveValue(1);
            expect(backupDriverField).toBeInTheDocument();
            expect(backupDriverField).toHaveValue(2);

            expect(submitButton).toHaveTextContent("Update");

            fireEvent.change(dayField, { target: { value: 'Monday' } });
            fireEvent.change(startField, { target: { value: '08:00AM' } });
            fireEvent.change(endField, { target: { value: '09:00AM' } });
            fireEvent.change(driverField, { target: { value: 2 } });
            fireEvent.change(backupDriverField, { target: { value: 3 } });

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("Shift Updated - id: 1 day: Monday");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/shifts" });

            // ... (You can further assert the axios call here)

        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ShiftEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        
            await screen.findByTestId("ShiftForm-id");
        
            const idField = screen.getByTestId("ShiftForm-id");
            const dayField = screen.getByTestId("ShiftForm-day");
            const startField = screen.getByTestId("ShiftForm-shiftStart");
            const endField = screen.getByTestId("ShiftForm-shiftEnd");
            const driverField = screen.getByTestId("ShiftForm-driverID");
            const backupDriverField = screen.getByTestId("ShiftForm-driverBackupID");
            const submitButton = screen.getByTestId("ShiftForm-submit");
        
            expect(idField).toHaveValue("1");
            expect(dayField).toHaveValue("Friday");
            expect(startField).toHaveValue("09:00AM");
            expect(endField).toHaveValue("10:00AM");
            expect(driverField).toHaveValue(1);
            expect(backupDriverField).toHaveValue(2);
            expect(submitButton).toBeInTheDocument();
        
            fireEvent.change(dayField, { target: { value: 'Monday' } });
            fireEvent.change(startField, { target: { value: '08:00AM' } });
            fireEvent.change(endField, { target: { value: '09:00AM' } });
            fireEvent.change(driverField, { target: { value: 2 } });
            fireEvent.change(backupDriverField, { target: { value: 3 } });
        
            fireEvent.click(submitButton);
        
            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("Shift Updated - id: 1 day: Monday");
            expect(mockNavigate).toBeCalledWith({ "to": "/shifts" });
        });
        

       
    });
});
