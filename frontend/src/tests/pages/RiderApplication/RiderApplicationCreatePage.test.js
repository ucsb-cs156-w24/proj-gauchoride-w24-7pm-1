import { render, waitFor, fireEvent } from "@testing-library/react";
import RiderApplicationCreatePage from "main/pages/RiderApplication/RiderApplicationCreatePage";
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

describe("RiderApplicationCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.memberOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const riderApplication = {
            id: 17,
            perm_number: "1202201",
            description: "I broke my leg."
        };

        axiosMock.onPost("/api/riderApplication/new").reply( 202, riderApplication );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("RiderApplicationForm-perm_number")).toBeInTheDocument();
        });

        const permNumberField = getByTestId("RiderApplicationForm-perm_number");
        const descriptionField = getByTestId("RiderApplicationForm-description");
        const submitButton = getByTestId("RiderApplicationForm-submit");

        fireEvent.change(permNumberField, { target: { value: "1202201" } });
        fireEvent.change(descriptionField, { target: { value: "I broke my leg." } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "perm_number": "1202201",
                "description": "I broke my leg.",
        });

        expect(mockToast).toBeCalledWith("New Rider Application Made - id: 17");
        expect(mockNavigate).toBeCalledWith({ "to": "/apply/rider" });
    });


});



