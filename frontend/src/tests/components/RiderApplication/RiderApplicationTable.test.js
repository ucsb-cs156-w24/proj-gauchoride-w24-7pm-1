import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { riderApplicationFixtures } from "fixtures/riderApplicationFixtures";
import RiderApplicationTable from "main/components/RiderApplication/RiderApplicationTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

const originalConfirm = window.confirm; //To test the Cancel button

const mockCancelMutation = jest.fn();
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => ({
    mutate: mockCancelMutation,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("RiderApplicationTable tests", () => {
  const queryClient = new QueryClient();

  const testId = "RiderApplicationTable";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });


  test("renders without crashing for empty table for ordinary member", () => {
    const currentUser = currentUserFixtures.memberOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });


  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={riderApplicationFixtures.threeRiderApplications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['Application Id', 'Date Applied', 'Date Updated', 'Date Cancelled', 'Status'];
    const expectedFields = ['id', 'created_date', 'updated_date', 'cancelled_date', 'status'];
    const testId = "RiderApplicationTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");

    const reviewButton = getByTestId(`${testId}-cell-row-0-col-Review-button`);
    expect(reviewButton).toBeInTheDocument();
    expect(reviewButton).toHaveClass("btn-primary");
  });


  test("Has the expected column headers and content for ordinary member", () => {

    const currentUser = currentUserFixtures.memberOnly;

    const applications = [ 
      riderApplicationFixtures.threeRiderApplications[0],
      riderApplicationFixtures.threeRiderApplications[1],
      { 
        ...riderApplicationFixtures.threeRiderApplications[2],
        status: "pending"
      }
    ]

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={applications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['Application Id', 'Date Applied', 'Date Updated', 'Date Cancelled', 'Status'];
    const expectedFields = ['id', 'created_date', 'updated_date', 'cancelled_date', 'status'];
    const testId = "RiderApplicationTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");

    const showButton = screen.getByTestId(`${testId}-cell-row-0-col-Show-button`);
    expect(showButton).toBeInTheDocument();
    expect(showButton).toHaveClass("btn-primary");

    const editButton = screen.getByTestId(`${testId}-cell-row-2-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");
    
    const cancelButton = screen.getByTestId(`${testId}-cell-row-2-col-Cancel-button`);
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass("btn-danger");

    expect(screen.queryByTestId(`${testId}-cell-row-0-col-Cancel-button`)).not.toBeInTheDocument();
  
  });


  test("Review button navigates to the review page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={riderApplicationFixtures.threeRiderApplications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });

    const reviewButton = getByTestId(`${testId}-cell-row-0-col-Review-button`);
    expect(reviewButton).toBeInTheDocument();

    fireEvent.click(reviewButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/admin/applications/riders/review/2'));

  });


  test("Show button navigates to the show page for ordinary member", async () => {

    const currentUser = currentUserFixtures.memberOnly;

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={riderApplicationFixtures.threeRiderApplications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });

    const showButton = getByTestId(`${testId}-cell-row-0-col-Show-button`);
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/apply/rider/show/2'));

  });


  test("Edit button navigates to the edit page for ordinary member with a pending application", async () => {

    const currentUser = currentUserFixtures.memberOnly;
    const testId = "RiderApplicationTable";

    const applications = [ 
      riderApplicationFixtures.threeRiderApplications[0],
      riderApplicationFixtures.threeRiderApplications[1],
      { 
        ...riderApplicationFixtures.threeRiderApplications[2],
        status: "pending"
      }
    ]

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={applications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4"); });
    const editButton = screen.getByTestId("RiderApplicationTable-cell-row-2-col-Edit-button");
    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/apply/rider/edit/4'));
  });

  test("Edit button does not show up for ordinary member with a non-pending application", async () => {

    const currentUser = currentUserFixtures.memberOnly;
    const testId = "RiderApplicationTable";

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={riderApplicationFixtures.threeRiderApplications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
    expect(screen.queryByTestId("RiderApplicationTable-cell-row-0-col-Edit-button")).not.toBeInTheDocument();
  });


  test("Cancel button calls cancelMutation for member with a pending application when the member confirms", async () => {
    const currentUser = currentUserFixtures.memberOnly;
    window.confirm = jest.fn(() => true);

    const applications = [ 
      riderApplicationFixtures.threeRiderApplications[0],
      riderApplicationFixtures.threeRiderApplications[1],
      { 
        ...riderApplicationFixtures.threeRiderApplications[2],
        status: "pending"
      }
    ]

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={applications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4"); });
    const cancelButton = screen.getByTestId("RiderApplicationTable-cell-row-2-col-Cancel-button");

    fireEvent.click(cancelButton);

    const prompt = "Are you sure you want to cancel this application?\n\nClick 'OK' to confirm or 'Cancel' to keep your application active.";

    expect(window.confirm).toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalledWith(prompt);
    expect(mockCancelMutation).toHaveBeenCalled();

    // Restore the original window.confirm
    window.confirm = originalConfirm;
  });

  test("Cancel button calls cancelMutation for member with a pending application when the member cancels", async () => {
    const currentUser = currentUserFixtures.memberOnly;
    window.confirm = jest.fn(() => false);

    const applications = [ 
      riderApplicationFixtures.threeRiderApplications[0],
      riderApplicationFixtures.threeRiderApplications[1],
      { 
        ...riderApplicationFixtures.threeRiderApplications[2],
        status: "pending"
      }
    ]

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={applications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`RiderApplicationTable-cell-row-2-col-id`)).toHaveTextContent("4"); });

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4"); });
    const cancelButton = screen.getByTestId("RiderApplicationTable-cell-row-2-col-Cancel-button");

    fireEvent.click(cancelButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockCancelMutation).not.toHaveBeenCalled();

    // Restore the original window.confirm
    window.confirm = originalConfirm;
  });

  test("Cancel button does not show up for member with a non-pending application", async () => {
    const currentUser = currentUserFixtures.memberOnly;

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RiderApplicationTable riderApplications={riderApplicationFixtures.threeRiderApplications} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`RiderApplicationTable-cell-row-0-col-id`)).toHaveTextContent("2"); });

    const tdCancelElement = document.querySelector('[data-testid="RiderApplicationTable-cell-row-0-col-Cancel"]');
    const cancelButton = tdCancelElement.querySelector('button');

    expect(cancelButton == null);
  });

});