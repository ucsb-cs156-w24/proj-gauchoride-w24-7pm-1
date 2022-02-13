import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

describe("UCSBDatesIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "UCSBDatesTable";


    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three dates without crashing", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").reply(200, ucsbDatesFixtures.threeDates);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders empty table when backend unavailable", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/ucsbdates/all").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/ucsbdates/all");
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

});


