import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RiderApplicationIndexPageAdmin from "main/pages/RiderApplication/RiderApplicationIndexPageAdmin";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { riderApplicationFixtures } from "fixtures/riderApplicationFixtures";
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

describe("RiderApplicationIndexPageAdmin tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "RiderApplicationTable";

    const applications = [
        riderApplicationFixtures.threeRiderApplications[0],
        riderApplicationFixtures.threeRiderApplications[1],
        {
            ...riderApplicationFixtures.threeRiderApplications[2],
            status: "pending"
        }
    ]

    const setupMemberOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.memberOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupMemberOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPageAdmin />
                </MemoryRouter>
            </QueryClientProvider>
        );

    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPageAdmin />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders three rides without crashing for regular user", async () => {
        setupMemberOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeRiderApplications);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPageAdmin />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
        expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4");

    });

    test("renders three rides without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeRiderApplications);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPageAdmin />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
        expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4");

    });

    test("renders empty table when backend unavailable, member only", async () => {
        setupMemberOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPageAdmin />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

});