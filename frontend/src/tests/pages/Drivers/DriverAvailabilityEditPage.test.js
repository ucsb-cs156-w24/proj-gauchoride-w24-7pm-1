import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import DriverAvailabilityEditPage from "main/pages/Drivers/DriverAvailabilityEditPage";

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

describe("DriverAvailabilityEditPage tests", () => {

    describe("when the backend doesn't return a availability", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/driverAvailability/id", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {queryByTestId, findByText} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DriverAvailabilityEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await findByText("Edit Driver Availability");
            expect(queryByTestId("day")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/driverAvailability/id", { params: { id: 17 } }).reply(200, {
                id: 17,
                driverId: 2,
                day: "Tuesday",
                startTime: "05:00PM",
                endTime: "07:30PM",
                notes: "none"
            });
            axiosMock.onPut('/api/driverAvailability').reply(200, {
                id: 17,
                driverId: 1,
                day: "Monday",
                startTime: "03:30PM",
                endTime: "04:30PM",
                notes: "important"
            });
              
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DriverAvailabilityEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DriverAvailabilityEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("DriverAvailabilityForm-day");

            const dayField = getByTestId("DriverAvailabilityForm-day");
            const startTimeField = getByTestId("DriverAvailabilityForm-startTime");
            const endTimeField = getByTestId("DriverAvailabilityForm-endTime");
            const driverIdField = getByTestId("DriverAvailabilityForm-driverId");
            const notesField = getByTestId("DriverAvailabilityForm-notes");

            expect(dayField).toHaveValue("Tuesday");
            expect(startTimeField).toHaveValue("05:00PM");
            expect(endTimeField).toHaveValue("07:30PM");
            expect(driverIdField).toHaveValue("2");
            expect(notesField).toHaveValue("none");
        });

        test("Changes when you click Update", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DriverAvailabilityEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        
            await findByTestId("DriverAvailabilityForm-day");
        
            const dayField = getByTestId("DriverAvailabilityForm-day");
            const startTimeField = getByTestId("DriverAvailabilityForm-startTime");
            const endTimeField = getByTestId("DriverAvailabilityForm-endTime");
            const driverIdField = getByTestId("DriverAvailabilityForm-driverId");
            const notesField = getByTestId("DriverAvailabilityForm-notes");

            expect(dayField).toHaveValue("Tuesday");
            expect(startTimeField).toHaveValue("05:00PM");
            expect(endTimeField).toHaveValue("07:30PM");
            expect(driverIdField).toHaveValue("2");
            expect(notesField).toHaveValue("none");
            
            const updateButton = screen.getByRole('button', { name: /Update/ });
            expect(updateButton).toBeInTheDocument();
        
            fireEvent.change(dayField, { target: { value: 'Monday' } });
            fireEvent.change(startTimeField, { target: { value: '03:30PM' } });
            fireEvent.change(endTimeField, { target: { value: "04:30PM" } });
            fireEvent.change(driverIdField, { target: { value: 1 } });
            fireEvent.change(notesField, { target: { value: "important" } });
        
            fireEvent.click(updateButton);

            await waitFor(() => expect(mockToast).toHaveBeenCalled());
            expect(mockToast).toBeCalledWith("DriverAvailability Updated - id: 17");
            expect(mockNavigate).toBeCalledWith({ "to": "/availability" });
            
            // Asserting the axios PUT call
            
            expect(axiosMock.history.put.length).toBe(1);


            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                driverId: "1",
                day: "Monday",
                startTime: "03:30PM",
                endTime: "04:30PM",
                notes: "important"
            })); // posted object
        });
        

    });
});
