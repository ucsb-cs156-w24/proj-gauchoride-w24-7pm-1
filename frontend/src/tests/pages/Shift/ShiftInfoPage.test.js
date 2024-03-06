import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ShiftInfoPage from "main/pages/Shift/ShiftInfoPage";

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

describe("ShiftInfoPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftInfoPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit", async () => {
        
        const queryClient = new QueryClient();
        const info = {
            "id": "1",
            "day": "Monday",
            "shiftStart": "3:30PM",
            "shiftEnd": "4:00PM",
            "driverID": "3",
            "driverBackupID": "4"
        };

        axiosMock.onGet("/api/shift").reply(200, info);


        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                   <ShiftInfoPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText("Id: 1")).toBeInTheDocument();
            expect(screen.getByText("Day: Monday")).toBeInTheDocument();
            expect(screen.getByText("Start: 3:30PM")).toBeInTheDocument();
            expect(screen.getByText("End: 4:00PM")).toBeInTheDocument();
            expect(screen.getByText("Driver Id: 3")).toBeInTheDocument();
            expect(screen.getByText("Driver Backup Id: 4")).toBeInTheDocument();
        });

    });
});
