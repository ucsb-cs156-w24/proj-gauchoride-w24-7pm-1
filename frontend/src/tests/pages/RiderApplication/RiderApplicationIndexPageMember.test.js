import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RiderApplicationIndexPage from "main/pages/RiderApplication/RiderApplicationIndexPageMember";


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

describe("RiderApplicationIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "RiderApplicationTable";

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
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createRideButton = screen.getByText("New Rider Application");
        expect(createRideButton).toBeInTheDocument();
        expect(createRideButton).toHaveAttribute("style", "float: right;");


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        const createRideButton = screen.getByText("New Rider Application");
        expect(createRideButton).toBeInTheDocument();
        expect(createRideButton).toHaveAttribute("style", "float: right;");
    });

    test("renders three rides without crashing for regular user", async () => {
        setupMemberOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeApplications);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4");

    });

    test("renders three rides without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeApplications);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4");

    });

    test("renders empty table when backend unavailable, member only", async () => {
        setupMemberOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    test("what happens when you click cancel and ok, member", async () => {
        setupMemberOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeApplications);
        axiosMock.onPut("/api/riderApplication/cancel").reply(200, "Application with id 4 is deleted");

        // Spy on window.confirm
        const mockConfirm = jest.spyOn(window, "confirm");
        mockConfirm.mockReturnValue(true);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-2-col-id`)).toBeInTheDocument(); });

        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4"); 


        const tdCancelElement = document.querySelector('[data-testid="RiderApplicationTable-cell-row-2-col-Cancel"]');
        const cancelButton = tdCancelElement.querySelector('button');
        expect(cancelButton.classList.contains('btn-danger'));
       
        fireEvent.click(cancelButton);

        expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to cancel this application?\n\nClick 'OK' to confirm or 'Cancel' to keep your application active.");
        
        await waitFor(() => { expect(mockToast).toBeCalledWith("Application with id 4 is deleted") });
    });

    test("what happens when you click cancel and no, member", async () => {
        setupMemberOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/rider").reply(200, riderApplicationFixtures.threeApplications);
        axiosMock.onPut("/api/riderApplication/cancel").reply(200);

        // Spy on window.confirm
        const mockConfirm = jest.spyOn(window, "confirm");
        mockConfirm.mockReturnValue(false);


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-2-col-id`)).toBeInTheDocument(); });

        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4"); 


        const tdCancelElement = document.querySelector('[data-testid="RiderApplicationTable-cell-row-2-col-Cancel"]');
        const cancelButton = tdCancelElement.querySelector('button');
        expect(cancelButton.classList.contains('btn-danger'));
       
        fireEvent.click(cancelButton);

        expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to cancel this application?\n\nClick 'OK' to confirm or 'Cancel' to keep your application active.");
        
        await waitFor( ()=> {
            expect(getByTestId(`${testId}-cell-row-2-col-status`)).toHaveTextContent("pending");
                       })

    });

});