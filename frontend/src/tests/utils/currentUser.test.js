import { QueryClient, QueryClientProvider } from "react-query";
import { useCurrentUser, useLogout } from "main/utils/currentUser";
import { renderHook } from '@testing-library/react-hooks'
import { apiCurrentUserFixtures, currentUserFixtures } from "fixtures/currentUserFixtures";
import nock from "nock";
import mockConsole from "jest-mock-console";
import { act } from 'react-dom/test-utils';


jest.mock('react-router-dom');
import { useNavigate } from "react-router-dom"
const { MemoryRouter } = jest.requireActual('react-router-dom');


describe("utils/currentUser tests", () => {
    describe("useCurrentUser tests", () => {

        test("test useCurrentUser retrieves initial data ", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const expectation = nock('http://localhost')
                .get('/api/currentUser')
                .reply(403);

            const { result, waitFor } = renderHook(() => useCurrentUser(), { wrapper });

            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual({ loggedIn: false, root: null });

        });

        test("test useCurrentUser retrieves data from API ", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const expectation = nock('http://localhost')
                .get('/api/currentUser')
                .reply(200, apiCurrentUserFixtures.userOnly);

            const restoreConsole = mockConsole();
            const { result, waitFor } = renderHook(() => useCurrentUser(), { wrapper });

            await waitFor(() => result.current.isFetched);
            expect(console.error).toHaveBeenCalled();
            restoreConsole();

            expect(result.current.data).toEqual(currentUserFixtures.userOnly);

        });

        test("test useCurrentUser handles missing roles correctly ", async () => {

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const apiResult = apiCurrentUserFixtures.missingRolesToTestErrorHandling;
            const expectation = nock('http://localhost')
                .get('/api/currentUser')
                .reply(200, apiResult);

            const restoreConsole = mockConsole();
            const { result, waitFor } = renderHook(() => useCurrentUser(), { wrapper });

            await waitFor(() => result.current.isFetched);
            expect(console.error).toHaveBeenCalled();
            restoreConsole();

            let expectedResult = { loggedIn: true, root: { ...apiResult, rolesList: ["ERROR_GETTING_ROLES"] } };
            expect(result.current.data).toEqual(expectedResult);

        });

    });
    describe("useLogout tests", () => {
        test("useLogout  ", async () => {
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        {children}
                    </MemoryRouter>
                </QueryClientProvider>
            );

            const nockExpectation = nock('http://localhost')
                .post('/logout')
                .reply(200);

            const navigateSpy = jest.fn();
            useNavigate.mockImplementation(() => navigateSpy);
            const { result, waitFor } = renderHook(() => useLogout(), { wrapper });
           
            act(() => {
                expect(useNavigate).toHaveBeenCalled();
                result.current.mutate();
            });
            await waitFor( () => expect(navigateSpy).toHaveBeenCalledWith("/") );
        });
    });
});
