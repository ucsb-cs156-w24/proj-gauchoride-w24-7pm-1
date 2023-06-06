import { render, waitFor, fireEvent } from "@testing-library/react";
import RideRequestCreatePage from "main/pages/Ride/RideRequestCreatePage";
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

describe("RideRequestCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RideRequestCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ride = {
            id: 17,
            day: "Monday",
            startTime: "3:30PM",
            endTime: "4:30PM", 
            pickupLocation: "Phelps",
            dropoffLocation: "HSSB",
            room: "1215",
            course: "WRIT 105CD"
        };

        axiosMock.onPost("/api/ride_request/post").reply( 202, ride );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RideRequestCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("RideForm-day")).toBeInTheDocument();
        });

        const dayField = getByTestId("RideForm-day");
        const startTimeField = getByTestId("RideForm-start");
        const endTimeField = getByTestId("RideForm-end");
        const pickupLocationField = getByTestId("RideForm-pickup");
        const dropoffLocationField = getByTestId("RideForm-dropoff");
        const roomField = getByTestId("RideForm-room");
        const courseField = getByTestId("RideForm-course");
        const submitButton = getByTestId("RideForm-submit");

        fireEvent.change(dayField, { target: { value: 'Monday' } });
        fireEvent.change(startTimeField, { target: { value: '3:30PM' } });
        fireEvent.change(endTimeField, { target: { value: '4:30PM' } });
        fireEvent.change(pickupLocationField, { target: { value: 'Phelps' } });
        fireEvent.change(dropoffLocationField, { target: { value: 'HSSB' } });
        fireEvent.change(roomField, { target: { value: '1215' } });
        fireEvent.change(courseField, { target: { value: 'WRIT 105CD' } });


        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "day": "Monday",
                "startTime": "3:30PM",
                "endTime": "4:30PM", 
                "pickupLocation": "Phelps",
                "dropoffLocation": "HSSB",
                "room": "1215",
                "course": "WRIT 105CD"
        });

        expect(mockToast).toBeCalledWith("New Ride Created - id: 17");
        expect(mockNavigate).toBeCalledWith({ "to": "/ride/" });
    });


});



