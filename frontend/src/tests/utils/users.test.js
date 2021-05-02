import { QueryClient, QueryClientProvider } from "react-query";
import { useUsers } from "main/utils/users";
import { renderHook } from '@testing-library/react-hooks'
import { apiCurrentUserFixtures, currentUserFixtures } from "fixtures/currentUserFixtures";
import nock from "nock";
import mockConsole from "jest-mock-console";
import { act } from 'react-dom/test-utils';


jest.mock('react-router-dom');
import { useNavigate } from "react-router-dom"
import usersFixtures from "fixtures/usersFixtures";
const { MemoryRouter } = jest.requireActual('react-router-dom');


describe("utils/users tests", () => {
    describe("useUsers tests", () => {
        test("test useUsers initially retrieves initial data on 403", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const expectation = nock('http://localhost')
                .get('/api/admin/users')
                .reply(403);

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });

            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual([]);

        });
    });

    describe("useUsers tests", () => {
        test("test useUsers hits error logic on 404", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const expectation = nock('http://localhost')
                .get('/api/admin/users')
                .reply(404);

            const restoreConsole = mockConsole();

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });
            await waitFor(() => result.current.isFetched);           
            expect(console.error).toHaveBeenCalled();
            restoreConsole();
           
            expect(result.current.data).toEqual([]);

        });
    });

    describe("useUsers tests", () => {
        test("test useUsers returns correct data when api is mocked", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const expectation = nock('http://localhost')
                .get('/api/admin/users')
                .reply(200, usersFixtures.twoUsers);

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });
            await waitFor(() => result.current.isFetched);                      
            expect(result.current.data).toEqual(usersFixtures.twoUsers);

        });
    });

});