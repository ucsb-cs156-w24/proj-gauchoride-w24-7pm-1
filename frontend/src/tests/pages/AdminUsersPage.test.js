import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import AdminUsersPage from "main/pages/AdminUsersPage";
import usersFixtures from "fixtures/usersFixtures";
import nock from "nock";

describe("AdminUsersPage tests", async () => {


    const queryClient = new QueryClient();
    test("renders without crashing on two users", () => {

        const _expectation = nock('http://localhost')
            .get('/api/admin/users')
            .reply(200, usersFixtures.twoUsers);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    await waitFor(() => expect(getByText("Users")).toBeInTheDocument());
});


