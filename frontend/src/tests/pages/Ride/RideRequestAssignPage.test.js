import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RideRequestAssignPage from "main/pages/Ride/RideRequestAssignPage";

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

describe("RideRequestAssignPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ride_request", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {queryByTestId, findByText} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RideRequestAssignPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await findByText("Assign Driver to Ride Request");
            expect(queryByTestId("RideAssignDriverForm-day")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/ride_request", { params: { id: 17 } }).reply(200, {
                id: 17,
                shiftId: 1,
                day: "Tuesday",
                startTime: "5:00PM",
                endTime: "7:30PM", 
                pickupBuilding: "HSSB",
                dropoffBuilding: "SRB",
                dropoffRoom: "125",
                pickupRoom: "1111",
                course: "CMPSC 156",
                notes: "note1"
            });
            axiosMock.onPut('/api/ride_request/assigndriver').reply(200, {
                id: "17",
                shiftId: 3,
                day: "Monday",
                startTime: "3:30PM",
                endTime: "4:30PM", 
                pickupBuilding: "Phelps",
                dropoffBuilding: "HSSB",
                dropoffRoom: "1215",
                pickupRoom: "2222",
                course: "WRIT 105CD",
                notes: "note2"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RideRequestAssignPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RideRequestAssignPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RideAssignDriverForm-day");
            
            const shiftIdField = getByTestId("RideAssignDriverForm-shiftId")
            const dayField = getByTestId("RideAssignDriverForm-day");
            const startTimeField = getByTestId("RideAssignDriverForm-start");
            const endTimeField = getByTestId("RideAssignDriverForm-end");
            const pickupBuildingField = getByTestId("RideAssignDriverForm-pickupBuilding");
            const dropoffBuildingField = getByTestId("RideAssignDriverForm-dropoffBuilding");
            const dropoffRoomField = getByTestId("RideAssignDriverForm-dropoffRoom");
            const pickupRoomField = getByTestId("RideAssignDriverForm-pickupRoom");
            const courseField = getByTestId("RideAssignDriverForm-course");
            const notesField = getByTestId("RideAssignDriverForm-notes");
            
            expect(shiftIdField).toHaveValue("1");
            expect(dayField).toHaveValue("Tuesday");
            expect(startTimeField).toHaveValue("5:00PM");
            expect(endTimeField).toHaveValue("7:30PM");
            expect(pickupBuildingField).toHaveValue("HSSB");
            expect(dropoffBuildingField).toHaveValue("SRB");
            expect(dropoffRoomField).toHaveValue("125");
            expect(pickupRoomField).toHaveValue("1111");
            expect(courseField).toHaveValue("CMPSC 156");
            expect(notesField).toHaveValue("note1");
            
        });

        test("Changes when you click Update", async () => {

                

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RideRequestAssignPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RideAssignDriverForm-day");

            const shiftIdField = getByTestId("RideAssignDriverForm-shiftId")
            const dayField = getByTestId("RideAssignDriverForm-day");
            const startTimeField = getByTestId("RideAssignDriverForm-start");
            const endTimeField = getByTestId("RideAssignDriverForm-end");
            const pickupBuildingField = getByTestId("RideAssignDriverForm-pickupBuilding");
            const dropoffBuildingField = getByTestId("RideAssignDriverForm-dropoffBuilding");
            const dropoffRoomField = getByTestId("RideAssignDriverForm-dropoffRoom");
            const pickupRoomField = getByTestId("RideAssignDriverForm-pickupRoom");
            const courseField = getByTestId("RideAssignDriverForm-course");
            const notesField = getByTestId("RideAssignDriverForm-notes");
            const submitButton = getByTestId("RideAssignDriverForm-submit");

            expect(shiftIdField).toHaveValue("1");
            expect(dayField).toHaveValue("Tuesday");
            expect(startTimeField).toHaveValue("5:00PM");
            expect(endTimeField).toHaveValue("7:30PM");
            expect(pickupBuildingField).toHaveValue("HSSB");
            expect(dropoffBuildingField).toHaveValue("SRB");
            expect(dropoffRoomField).toHaveValue("125");
            expect(pickupRoomField).toHaveValue("1111")
            expect(courseField).toHaveValue("CMPSC 156");
            expect(notesField).toHaveValue("note1");


            expect(submitButton).toBeInTheDocument();
            
            fireEvent.change(shiftIdField, { target: { value: '3' } })
            fireEvent.change(dayField, { target: { value: 'Monday' } })
            fireEvent.change(startTimeField, { target: { value: '3:30PM' } })
            fireEvent.change(endTimeField, { target: { value: "4:30PM" } })
            fireEvent.change(pickupBuildingField, { target: { value: 'Phelps' } })
            fireEvent.change(dropoffBuildingField, { target: { value: 'HSSB' } })
            fireEvent.change(dropoffRoomField, { target: { value: "1215" } })
            fireEvent.change(courseField, { target: { value: "WRIT 105CD" } })


            fireEvent.click(submitButton);

    
            await waitFor(() => expect(mockToast).toHaveBeenCalled());
            expect(mockToast).toBeCalledWith("Driver Assigned - id: 17");
            expect(mockNavigate).toBeCalledWith({ "to": "/ride/" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                shiftId: "3",
            })); // posted object

        });

       
    });
});
