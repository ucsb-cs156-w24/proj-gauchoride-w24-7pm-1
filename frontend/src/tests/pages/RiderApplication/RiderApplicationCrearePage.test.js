import { render, screen } from "@testing-library/react";
import RiderApplicationCraetePage from "main/pages/RiderApplication/RiderApplicationCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("RiderApplicationCraetePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const queryClient = new QueryClient();
    test("Renders expected content", () => {
        // arrange

        setupUserOnly();
       
        // act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RiderApplicationCraetePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        // assert
        expect(screen.getByText("Create page not yet implemented")).toBeInTheDocument();
    });

});