import { render } from "@testing-library/react";
import RiderApplicationShowPageMember from "main/pages/RiderApplication/RiderApplicationShowPageMember";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

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
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("RiderApplicationShowPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.memberOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/riderApplication", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {queryByTestId, findByText} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await findByText("Show Rider Application");
            expect(queryByTestId("RiderApplicationShowForm-status")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/riderApplication", { params: { id: 17 } }).reply(200, {
                id: 17,
                perm_number: "1234567",
                status: "pending",
                email: "random@example.org",
                created_date: "2023-04-17",
                updated_date: "2023-04-17",
                cancelled_date: "",
                description: "",
                notes: ""
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RiderApplicationShowForm-status");

            const statusField =getByTestId("RiderApplicationShowForm-status");
            const permNumberField = getByTestId("RiderApplicationShowForm-perm_number");
            const emailField =getByTestId("RiderApplicationShowForm-email");
            const createdDateField =getByTestId("RiderApplicationShowForm-created_date");
            const descriptionField = getByTestId("RiderApplicationShowForm-description");

            expect(statusField).toHaveValue("pending");
            expect(permNumberField).toHaveValue("1234567");
            expect(emailField).toHaveValue("random@example.org");
            expect(createdDateField).toHaveValue("2023-04-17");
            expect(descriptionField).toHaveValue("");
            
        });


        test("Rider application is approved", async () => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/riderApplication", { params: { id: 17 } }).reply(200, {
                id: 17,
                perm_number: "1234567",
                status: "approved",
                email: "random@example.org",
                created_date: "2023-04-17",
                updated_date: "2023-04-17",
                cancelled_date: "",
                approved_date: "2023-04-18",
                description: "",
                notes: "ok"
            });

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RiderApplicationShowForm-status");

            const statusField =getByTestId("RiderApplicationShowForm-status");
            const permNumberField = getByTestId("RiderApplicationShowForm-perm_number");
            const emailField =getByTestId("RiderApplicationShowForm-email");
            const createdDateField =getByTestId("RiderApplicationShowForm-created_date");
            const approvedDateField =getByTestId("RiderApplicationShowForm-approved_date");
            const notesField = getByTestId("RiderApplicationShowForm-notes");
            const descriptionField = getByTestId("RiderApplicationShowForm-description");
      

            if (statusField.value === "approved") {
                expect(statusField).toHaveValue("approved");
                expect(permNumberField).toHaveValue("1234567");
                expect(emailField).toHaveValue("random@example.org");
                expect(createdDateField).toHaveValue("2023-04-17");
                expect(approvedDateField).toHaveValue("2023-04-18");
                expect(notesField).toHaveValue("ok");
                expect(descriptionField).toHaveValue("");
            }
        });


        test("Rider application is declined", async () => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/riderApplication", { params: { id: 17 } }).reply(200, {
                id: 17,
                perm_number: "1234567",
                status: "declined",
                email: "random@example.org",
                created_date: "2023-04-17",
                updated_date: "2023-04-17",
                cancelled_date: "",
                declined_date: "2023-04-18",
                description: "",
                notes: "no"
            });

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RiderApplicationShowForm-status");

            const statusField =getByTestId("RiderApplicationShowForm-status");
            const permNumberField = getByTestId("RiderApplicationShowForm-perm_number");
            const emailField =getByTestId("RiderApplicationShowForm-email");
            const createdDateField =getByTestId("RiderApplicationShowForm-created_date");
            const declinedDateField =getByTestId("RiderApplicationShowForm-declined_date");
            const notesField = getByTestId("RiderApplicationShowForm-notes");
            const descriptionField = getByTestId("RiderApplicationShowForm-description");
      
            if (statusField.value === "declined") {
                expect(statusField).toHaveValue("declined");
                expect(permNumberField).toHaveValue("1234567");
                expect(emailField).toHaveValue("random@example.org");
                expect(createdDateField).toHaveValue("2023-04-17");
                expect(declinedDateField).toHaveValue("2023-04-18");
                expect(notesField).toHaveValue("no");
                expect(descriptionField).toHaveValue("");
            }
        });

        test("Rider application is cancelled", async () => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/riderApplication", { params: { id: 17 } }).reply(200, {
                id: 17,
                perm_number: "1234567",
                status: "cancelled",
                email: "random@example.org",
                created_date: "2023-04-17",
                updated_date: "2023-04-17",
                cancelled_date: "",
                declined_date: "2023-04-18",
                description: "",
                notes: ""
            });

            const { getByTestId, findByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RiderApplicationShowPageMember />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await findByTestId("RiderApplicationShowForm-status");

            const statusField =getByTestId("RiderApplicationShowForm-status");
            const permNumberField = getByTestId("RiderApplicationShowForm-perm_number");
            const emailField =getByTestId("RiderApplicationShowForm-email");
            const createdDateField =getByTestId("RiderApplicationShowForm-created_date");
            const cancelledDateField =getByTestId("RiderApplicationShowForm-cancelled_date");
            const descriptionField = getByTestId("RiderApplicationShowForm-description");
      
            if (statusField.value === "cancelled") {
                expect(statusField).toHaveValue("cancelled");
                expect(permNumberField).toHaveValue("1234567");
                expect(emailField).toHaveValue("random@example.org");
                expect(createdDateField).toHaveValue("2023-04-17");
                expect(cancelledDateField ).toHaveValue("2023-04-18");
                expect(descriptionField).toHaveValue("");
            }
        });
       
    });
});
