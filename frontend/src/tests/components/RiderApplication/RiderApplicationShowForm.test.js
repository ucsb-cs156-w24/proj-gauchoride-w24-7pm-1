import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { riderApplicationFixtures } from "fixtures/riderApplicationFixtures";
import RiderApplicationShowForm from "main/components/RiderApplication/RiderApplicationShowForm";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RiderApplicationShowForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["Email", "Perm Number", "Description"];
    const testId = "RiderApplicationShowForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RiderApplicationShowForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Back/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
          });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RiderApplicationShowForm initialContents={riderApplicationFixtures.oneRiderApplication} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Back/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RiderApplicationShowForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

});