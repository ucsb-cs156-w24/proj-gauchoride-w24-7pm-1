import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChatDisplay from "main/components/ChatMessage/ChatDisplay";
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

describe("chatDisplay tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };


    const queryClient = new QueryClient();

    test("Renders correctly for empty", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/chat/get").reply(200, {
          content: [], totalPages: 0
          });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ChatDisplay />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
        });
        const nextButton = screen.getByTestId("ChatDisplay-next-button");
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        const previousButton = screen.getByTestId("ChatDisplay-previous-button");
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeDisabled();
    });

    test("renders correctly for 1 page", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/chat/get",  { params: { page: 0, size: 10 } }).reply(200, firstPagedChatFixtures);
        axiosMock.onGet("/api/chat/get",  { params: { page: 1, size: 10 } }).reply(200, secondPagedChatFixtures);
        axiosMock.onGet("/api/chat/get",  { params: { page: 2, size: 10 } }).reply(200, thirdPagedChatFixtures);
  
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                  <ChatDisplay />
                </MemoryRouter>
            </QueryClientProvider>
        );

      await waitFor(() => {
        expect(axiosMock.history.get.length).toBe(1);
      });
      expect(axiosMock.history.get[0].url).toBe("/api/chat/get");
      expect(axiosMock.history.get[0].params).toEqual({ page: 0, size: 10 });
      

      const nextButton = screen.getByTestId("ChatDisplay-next-button");
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();

      const previousButton = screen.getByTestId("ChatDisplay-previous-button");
      expect(previousButton).toBeInTheDocument();
      expect(previousButton).toBeDisabled();

      for (let i = 1; i < 16; i++){
        if(i < 11){
          expect(screen.getByText(`Message${i}`)).toBeInTheDocument();
        }else{
          expect(screen.queryByText(`Message${i}`)).not.toBeInTheDocument();
        }
      }
      
      expect(screen.getByText(`Page: 1`)).toBeInTheDocument();
      fireEvent.click(nextButton);

      await waitFor(() => {expect(screen.getByText(`Page: 2`)).toBeInTheDocument();});
      expect(previousButton).toBeEnabled();
      expect(nextButton).toBeEnabled();

      fireEvent.click(previousButton);
      await waitFor(() => { expect(screen.getByText(`Page: 1`)).toBeInTheDocument();});
      expect(previousButton).toBeDisabled();
      expect(nextButton).toBeEnabled();

      fireEvent.click(nextButton);
      await waitFor(() => { expect(screen.getByText(`Page: 2`)).toBeInTheDocument();});

      fireEvent.click(nextButton);
      await waitFor(() => { expect(screen.getByText(`Page: 3`)).toBeInTheDocument();});

      expect(previousButton).toBeEnabled();
      expect(nextButton).toBeDisabled();
      
    });

    



});


