import { render, waitFor } from "@testing-library/react";

import HomePage from "main/pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { render, waitFor, screen } from "@testing-library/react";

describe("HomePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();
    
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });
    test("the 'Welcome to' text has the correct CSS", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => screen.getByTestId("welcome-header"));
        const welcomeHeader = screen.getByTestId("welcome-header")
        expect(welcomeHeader).toBeInTheDocument();
        expect(welcomeHeader).toHaveAttribute("style", "padding: 20px;");
    });

    test("the 'UCSB' text has the correct CSS", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => screen.getByTestId("UCSB"));
        const boldUCSBHeader = screen.getByTestId("UCSB");
        expect(boldUCSBHeader).toBeInTheDocument();
        expect(boldUCSBHeader).toHaveStyle({backgroundColor: "#003660", padding: "0px 10px"});
       
        await waitFor(() => screen.getByTestId("white"));
        const white = screen.getByTestId("white");
        expect(white).toHaveStyle({color: "#FFFFF"});

    });

    test("the 'GauchoRide!' text has the correct CSS", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => screen.getByTestId("welcome-header"));
        const websiteName = screen.getByTestId("welcome-header");
        expect(websiteName).toBeInTheDocument();
        expect(websiteName).toHaveStyle({padding: "20px"});
    });

    test("the description text has the correct CSS", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => screen.getByTestId("about-application"));
        const description = screen.getByTestId("about-application");
        expect(description).toBeInTheDocument();
        expect(description).toHaveStyle( {margin: "0px 20px", backgroundColor: "#d6d2d2", padding: "20px"});
    });

    test("contains proper text", async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("About this application")).toBeInTheDocument() );
        expect(getByText("This app is being built by the students of CMPSC 156 at UCSB to assist an effort to provide transportation for UCSB students with mobility issues to be better able to get to and from class.")).toBeInTheDocument();
    });


    test("contains proper text", async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Hey there!")).toBeInTheDocument() );
        expect(getByText("This app is being built by the students of CMPSC 156 at UCSB to assist an effort to provide transportation for UCSB students with mobility issues to be better able to get to and from class.")).toBeInTheDocument();
    });

});


