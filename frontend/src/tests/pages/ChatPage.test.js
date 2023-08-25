import { render, screen, waitFor } from "@testing-library/react";
import ChatPage from "main/pages/ChatPage"
import { firstPagedChatFixtures, secondPagedChatFixtures, thirdPagedChatFixtures } from "fixtures/chatMessageFixtures";
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

describe("ChatMessageCreate tests", () => {

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
                    <ChatPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend, and redirects to /requesterEmails", async () => {
        
        const queryClient = new QueryClient();
        const Message = {
            "id": 1,
            "userId": 1,
            "payload": "OneMessage",
            "timestamp": "2023-08-18T08:24:30.661204",
            "dm": false,
            "toUserId": null
        };

        axiosMock.onPost("/api/chat/post").reply(202, Message);
        axiosMock.onGet("/api/chat/get",  { params: { page: 0, size: 10 } }).reply(200, firstPagedChatFixtures);
        axiosMock.onGet("/api/chat/get",  { params: { page: 1, size: 10 } }).reply(200, secondPagedChatFixtures);
        axiosMock.onGet("/api/chat/get",  { params: { page: 2, size: 10 } }).reply(200, thirdPagedChatFixtures);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                   <ChatPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByLabelText("Message Content")).toBeInTheDocument();
        });


    });
});
