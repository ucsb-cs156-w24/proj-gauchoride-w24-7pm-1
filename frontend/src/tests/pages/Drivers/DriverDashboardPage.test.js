import { render, waitFor } from "@testing-library/react";
import DriverDashboardPage from "main/pages/Drivers/DriverDashboardPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import shiftFixtures from "fixtures/shiftFixtures";
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
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("DriverDashBoardPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "ShiftTable";

   

    const setupDriverOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.driverOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

   

    test("renders without crashing for driver", () => {
        setupDriverOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/shift/drivershifts").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverDashboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });


    test("renders three rides without crashing for driver", async () => {
        setupDriverOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/shift/drivershifts").reply(200, shiftFixtures.threeShifts);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverDashboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Shifts")).toBeInTheDocument());
        expect(getByText("06:00PM")).toBeInTheDocument();

    });

    test("renders empty table when backend unavailable", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/shift/drivershifts").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DriverDashboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();

    });

 

});