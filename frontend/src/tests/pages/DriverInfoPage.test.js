import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import DriverInfoPage from "main/pages/DriverInfoPage";

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

describe("DriverInfoPage tests", () => {

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
                    <DriverInfoPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, not driver", async () => {
        
        const queryClient = new QueryClient();
        const info = {
            "isDriver": false
        };

        axiosMock.onGet("/api/drivers/get").reply(200, info);


        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                   <DriverInfoPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText("Searched user was not a driver")).toBeInTheDocument();
        });
        expect(screen.getByText("Additional information")).toBeInTheDocument();
        expect(screen.getByText("Return")).toBeInTheDocument();
    });

    test("on submit, is driver", async () => {
        
        const queryClient = new QueryClient();
        const info = {
            "isDriver": true,
            "email": "example@gmail.com",
            "givenName": "gName",
            "familyName": "fName"
        };

        axiosMock.onGet("/api/drivers/get").reply(200, info);


        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                   <DriverInfoPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText("gName fName, Email: example@gmail.com")).toBeInTheDocument();
        });

    });
});
