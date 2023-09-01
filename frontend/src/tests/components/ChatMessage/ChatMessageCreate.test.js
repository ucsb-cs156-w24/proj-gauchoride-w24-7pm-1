import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatMessageCreate from "main/components/ChatMessage/ChatMessageCreate";
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
                    <ChatMessageCreate />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend", async () => {

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

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                   <ChatMessageCreate />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByLabelText("Message Content")).toBeInTheDocument();
        });

        const contentInput = screen.getByLabelText("Message Content");
        expect(contentInput).toBeInTheDocument();

        const sendButton = screen.getByTestId("ChatMessageForm-submit");
        expect(sendButton).toBeInTheDocument();

        fireEvent.change(contentInput, { target: { value: 'OneMessage' } })
        fireEvent.click(sendButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            "content": "OneMessage"
        });

        // assert - check that the toast was called with the expected message
        expect(mockToast).toBeCalledWith("Message sent");

    });
});


