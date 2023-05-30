import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import PageNotFound from "main/pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe("PageNotFound tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PageNotFound />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });
    test("redirects to /movies on submit", async () => {

       const restoreConsole = mockConsole();

       render(
          <QueryClientProvider client={queryClient}>
              <MemoryRouter>
                  <PageNotFound />
              </MemoryRouter>
          </QueryClientProvider>
       )

       const redirectButton = screen.getByText("Go Back to Home Page");
       expect(redirectButton).toBeInTheDocument();

       await act(async () => {
           fireEvent.click(redirectButton);
       });

       await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));

   });


});


