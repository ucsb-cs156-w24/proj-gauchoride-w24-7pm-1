import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from '@testing-library/react-hooks'
import mockConsole from "jest-mock-console";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useBackend } from "main/utils/useBackend";


jest.mock('react-router-dom');

describe("utils/useBackend tests", () => {

    test("test useBackend handles 404 error correctly", async () => {
  
        // See: https://react-query.tanstack.com/guides/testing#turn-off-retries
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    // ✅ turns retries off
                    retry: false,
                },
            },
        })
        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const axiosMock =new AxiosMockAdapter(axios);

        axiosMock.onGet("/api/admin/users").reply(404, {});

        const restoreConsole = mockConsole();

        const { result, waitFor } = renderHook(() => useBackend(
            ["/api/admin/users"],
            { method: "GET", url: "/api/admin/users" },
            ["initialData"]
        ), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.data).toEqual(["initialData"]);
        await waitFor(() => expect(console.error).toHaveBeenCalled());
        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/admin/users");
        restoreConsole();

    });
});