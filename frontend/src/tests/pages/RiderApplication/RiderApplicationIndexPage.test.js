import { render, screen } from "@testing-library/react";
import RiderApplicationIndexPage from "main/pages/RiderApplication/RiderApplicationIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


describe("RiderApplicationIndexPage tests", () => {

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
                    <RiderApplicationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        // assert
        expect(screen.getByText("Index page not yet implemented")).toBeInTheDocument();
        expect(screen.getByText("Create")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Show")).toBeInTheDocument();
    });

});