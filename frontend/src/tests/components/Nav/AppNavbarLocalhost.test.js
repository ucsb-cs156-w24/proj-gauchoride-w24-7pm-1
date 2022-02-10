import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("AppNavbarLocalhost tests", () => {

    test("renders correctly ", async () => {
        const { getByText } = render(
            <AppNavbarLocalhost />
        );

        await waitFor(() => expect(getByText(/Running on /)).toBeInTheDocument());
    });

});


