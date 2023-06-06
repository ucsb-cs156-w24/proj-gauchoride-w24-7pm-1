import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ShiftPage from "main/pages/ShiftPage";
import shiftFixtures from "fixtures/shiftFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import mockConsole from "jest-mock-console";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("ShiftPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "ShiftTable";

    beforeEach( () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing on three users", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/shift").reply(200, shiftFixtures.threeShifts);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Shift")).toBeInTheDocument());


    });

    test("renders empty table when backend unavailable", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/shift").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ShiftPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();

    });

    // WIP will change to driver user
    // test("shifttable toggle admin tests (dont need this when table is fixed)", async ()=>{
    //     setupAdminUser();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
    //     axiosMock.onPost("/api/admin/users/toggleAdmin").reply(200, "User with id 1 has toggled admin status");
    //     const { getByText} = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <ShiftPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );
    //     await waitFor(() => expect(getByText("Shift")).toBeInTheDocument());

    //     const toggleAdminButton = screen.getByTestId(`${testId}-cell-row-0-col-toggle-admin-button`);
    //     expect(toggleAdminButton).toBeInTheDocument();

    //     fireEvent.click(toggleAdminButton);

    //     await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
    //     expect(axiosMock.history.post[0].url).toBe("/api/admin/users/toggleAdmin");
    //     expect(axiosMock.history.post[0].params).toEqual({id:1});
      

    // })

});


