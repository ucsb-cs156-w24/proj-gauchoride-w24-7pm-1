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

    test('renders correctly when passing in initialContents with notes and accepted', async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <RiderApplicationShowForm
                initialContents={{ id: 1,
                    userId: 'user123',
                    status: 'accepted',
                    email: 'test@example.com',
                    created_date: '2024-03-06',
                    updated_date: '2024-03-06',
                    cancelled_date: null,
                    notes: 'This is a note.',
                    perm_number: '1234567',
                    description: 'This is a test description.', }}
                submitAction={mockSubmitAction}
                email="test@example.com"
            />
        );
    
        expect(await screen.findByText(/Back/)).toBeInTheDocument();
    
        // Check if navigate is called with the correct argument
        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });

    test('renders correctly when passing in initialContents with notes and declined', async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <RiderApplicationShowForm
                initialContents={{ id: 1,
                    userId: 'user123',
                    status: 'declined',
                    email: 'test@example.com',
                    created_date: '2024-03-06',
                    updated_date: '2024-03-06',
                    cancelled_date: null,
                    notes: '13',
                    perm_number: '1234567',
                    description: 'This is a test description.', }}
                submitAction={mockSubmitAction}
                email="test@example.com"
            />
        );
    
        expect(await screen.findByText(/Back/)).toBeInTheDocument();
    
        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });

    test('renders correctly when passing in initialContents with notes and pending', async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <RiderApplicationShowForm
                initialContents={{ id: 1,
                    userId: 'user123',
                    status: 'pending',
                    email: 'test@example.com',
                    created_date: '2024-03-06',
                    updated_date: '2024-03-06',
                    cancelled_date: null,
                    notes: '13',
                    perm_number: '1234567',
                    description: 'This is a test description.', }}
                submitAction={mockSubmitAction}
                email="test@example.com"
            />
        );
    
        expect(await screen.findByText(/Back/)).toBeInTheDocument();
    
        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });

    test('renders correctly when passing in initialContents with cancelled', async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <RiderApplicationShowForm
                initialContents={{ id: 1,
                    userId: 'user123',
                    status: 'cancelled',
                    email: 'test@example.com',
                    created_date: '2024-03-06',
                    updated_date: '2024-03-06',
                    cancelled_date: null,
                    notes: '',
                    perm_number: '1234567',
                    description: 'This is a test description.', }}
                submitAction={mockSubmitAction}
                email="test@example.com"
            />
        );
    
        expect(await screen.findByText(/Back/)).toBeInTheDocument();
    
        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });
    
    test('renders correctly when passing in initialContents with expired', async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <RiderApplicationShowForm
                initialContents={{ id: 1,
                    userId: 'user123',
                    status: 'expired',
                    email: 'test@example.com',
                    created_date: '2024-03-06',
                    updated_date: '2024-03-06',
                    cancelled_date: null,
                    notes: '',
                    perm_number: '1234567',
                    description: 'This is a test description.', }}
                submitAction={mockSubmitAction}
                email="test@example.com"
            />
        );
    
        expect(await screen.findByText(/Back/)).toBeInTheDocument();
    
        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });

});