import { render, waitFor } from "@testing-library/react";


import PrivacyPolicy from "main/pages/PrivacyPolicy";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("Privacy Policy tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();
    
    
    

    
    

  


    test("contains proper text", async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PrivacyPolicy />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Go to Privacy Policy")).toBeInTheDocument() );
    });

});


