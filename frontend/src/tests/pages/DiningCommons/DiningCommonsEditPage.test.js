import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import _mockConsole from "jest-mock-console";

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
            code: "ortega"
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("DiningCommonsEditPage tests", () => {

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ucsbdiningcommons", { params: { code: "ortega" } }).reply(200, {  
                name: "Ortega",
                code: "ortega",
                hasSackMeal: true,
                hasTakeOutMeal: true,
                hasDiningCam: true,
                latitude: 34.410987,
                longitude: -119.84709
            });
            axiosMock.onPut('/api/ucsbdiningcommons').reply(200, {
                name: "Ortega Dining Commons",
                code: "ortega",
                hasSackMeal: true,
                hasTakeOutMeal: true,
                hasDiningCam: true,
                latitude: 34.410123,
                longitude: -119.847123
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsForm-code")).toBeInTheDocument());

            const codeField = getByTestId("DiningCommonsForm-code");
            const nameField = getByTestId("DiningCommonsForm-name");
            const latitudeField = getByTestId("DiningCommonsForm-latitude");
            const longitudeField = getByTestId("DiningCommonsForm-longitude");

            expect(codeField).toHaveValue("ortega");
            expect(nameField).toHaveValue("Ortega");
            expect(latitudeField).toHaveValue(34.410987);
            expect(longitudeField).toHaveValue(-119.84709);
        });

        test("Changes when you click Update", async () => {

            const { getByTestId, getByText } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsForm-code")).toBeInTheDocument());

            const codeField = getByTestId("DiningCommonsForm-code");
            const nameField = getByTestId("DiningCommonsForm-name");
            const latitudeField = getByTestId("DiningCommonsForm-latitude");
            const longitudeField = getByTestId("DiningCommonsForm-longitude");

            expect(codeField).toHaveValue("ortega");
            expect(nameField).toHaveValue("Ortega");
            expect(latitudeField).toHaveValue(34.410987);
            expect(longitudeField).toHaveValue(-119.84709);
           
            const submitButton = getByText("Update");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(nameField, { target: { value: 'Ortega Dining Commons' } })
            fireEvent.change(latitudeField, { target: { value: 34.410123 } })
            fireEvent.change(longitudeField, { target: { value: -119.847123  } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("DiningCommons Updated - code: ortega name: Ortega Dining Commons");
            expect(mockNavigate).toBeCalledWith({ "to": "/diningCommons/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ code:"ortega" });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                name: "Ortega Dining Commons",
                hasSackMeal: true,
                hasTakeOutMeal: true,
                hasDiningCam: true,
                latitude: "34.410123",
                longitude: "-119.847123"
            })); // posted object

        });

       
    });
});


