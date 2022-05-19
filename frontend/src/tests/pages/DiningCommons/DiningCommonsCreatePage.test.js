import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
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


describe("DiningCommonsCreatePage tests", () => {

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
                    <DiningCommonsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();

        const commons = {
            "code": "ortega",
            "name": "Ortega",
            "hasSackMeal": true,
            "hasTakeOutMeal": true,
            "hasDiningCam": true,
            "latitude": 30.0,
            "longitude": -119.0
          };
        
    
        axiosMock.onPost("/api/ucsbdiningcommons/post").reply( 202, commons );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("DiningCommonsForm-code")).toBeInTheDocument();
        });

        const codeField = getByTestId("DiningCommonsForm-code");
        const nameField = getByTestId("DiningCommonsForm-name");
        const latitudeField = getByTestId("DiningCommonsForm-latitude");
        const longitudeField = getByTestId("DiningCommonsForm-longitude");

        const submitButton = getByTestId("DiningCommonsForm-submit");

        fireEvent.change(codeField, { target: { value: 'ortega' } });
        fireEvent.change(nameField, { target: { value: 'Ortega' } });
        fireEvent.change(latitudeField, { target: { value: '30.0' } });
        fireEvent.change(longitudeField, { target: { value: '-119.0' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            "code": "ortega",
            "name": "Ortega",
            "hasSackMeal": false,
            "hasTakeOutMeal": false,
            "hasDiningCam": false,
            "latitude": '30.0',
            "longitude": '-119.0'
        });

        expect(mockToast).toBeCalledWith("New Dining Commons Created - code: ortega name: Ortega");
        expect(mockNavigate).toBeCalledWith({ "to": "/diningCommons/list" });
    });


});


