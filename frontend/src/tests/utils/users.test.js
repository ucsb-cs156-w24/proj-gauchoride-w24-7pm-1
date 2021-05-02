import { QueryClient, QueryClientProvider } from "react-query";
import { useUsers } from "main/utils/users";
import { renderHook } from '@testing-library/react-hooks'
import nock from "nock";
import mockConsole from "jest-mock-console";
import usersFixtures from "fixtures/usersFixtures";

jest.mock('react-router-dom');

describe("utils/users tests", () => {
    describe("useUsers tests", () => {
        test("test useUsers initially retrieves initial data on 403", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const _expectation = nock('http://localhost')
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

            const _expectation = nock('http://localhost')
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

            const _expectation = nock('http://localhost')
                .get('/api/admin/users')
                .reply(200, usersFixtures.twoUsers);

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });
            await waitFor(() => result.current.isFetched);                      
            expect(result.current.data).toEqual(usersFixtures.twoUsers);

        });
    });

});