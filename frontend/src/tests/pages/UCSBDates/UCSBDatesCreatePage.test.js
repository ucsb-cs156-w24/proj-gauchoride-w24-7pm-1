import { render, waitFor, fireEvent } from "@testing-library/react";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
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

describe("UCSBDatesCreatePage tests", () => {

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
                    <UCSBDatesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ucsbDate = {
            id: 17,
            quarterYYYYQField: 20221,
            name: "Groundhog Day",
            localDateTime: "2022-02-02T00:00"
        };

        axiosMock.onPost("/api/ucsbdates/post").reply( 202, ucsbDate );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument();
        });

        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const nameField = getByTestId("UCSBDateForm-name");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.change(quarterYYYYQField, { target: { value: '20221' } });
        fireEvent.change(nameField, { target: { value: 'Groundhog Day' } });
        fireEvent.change(localDateTimeField, { target: { value: '2022-02-02T00:00' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "localDateTime": "2022-02-02T00:00",
            "name": "Groundhog Day",
            "quarterYYYYQ": "20221"
        });

        expect(mockToast).toBeCalledWith("New ucsbDate Created - id: 17 name: Groundhog Day");
        expect(mockNavigate).toBeCalledWith({ "to": "/ucsbdates/list" });
    });


});


