import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { rideFixtures } from "fixtures/rideFixtures";
import RideTable from "main/components/Ride/RideTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

const mockDeleteMutation = jest.fn();
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => ({
    mutate: mockDeleteMutation,
  }),
}));


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RideTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary rider", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for driver", () => {
    const currentUser = currentUserFixtures.driverOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });


  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['id','Day','Student','Driver', 'Course #', 'Start Time', 'End Time', 'Pick Up', 'Drop Off', 'Room #'];
    const expectedFields = ['id', 'day', 'student', 'driver', 'course', 'start', 'end', 'pickup', 'dropoff','room'];
    const testId = "RideTable";

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

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });



  test("Has the expected column headers and content for ordinary rider", () => {

    const currentUser = currentUserFixtures.userOnly;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['id','Day','Driver', 'Course #', 'Start Time', 'End Time', 'Pick Up', 'Drop Off', 'Room #'];
    const expectedFields = ['id', 'day',  'driver', 'course', 'start', 'end', 'pickup', 'dropoff','room'];
    const testId = "RideTable";

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

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Has the expected column headers and content for ordinary driver", () => {

    const currentUser = currentUserFixtures.driverOnly;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ['id','Day','Student', 'Course #', 'Start Time', 'End Time', 'Pick Up', 'Drop Off', 'Room #'];
    const expectedFields = ['id', 'day', 'student', 'course', 'start', 'end', 'pickup', 'dropoff','room'];
    const testId = "RideTable";

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


    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();

  });

  test("Edit button navigates to the edit page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(getByTestId(`RideTable-cell-row-0-col-id`)).toHaveTextContent("2"); });

    const editButton = getByTestId(`RideTable-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/ride_request/edit/2'));

  });

  test("Edit button navigates to the edit page for ordinary rider", async () => {

    const currentUser = currentUserFixtures.userOnly;

    const {getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(getByTestId(`RideTable-cell-row-0-col-id`)).toHaveTextContent("2"); });

    const editButton = getByTestId(`RideTable-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/ride_request/edit/2'));

  });

  
  test("Delete button calls deleteMutation for rider (which admin is classifed as)", async () => {
    const currentUser = currentUserFixtures.userOnly;
  
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RideTable ride={rideFixtures.threeRidesTable} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  
    await waitFor(() => { expect(getByTestId(`RideTable-cell-row-0-col-id`)).toHaveTextContent("2"); });
  
    const deleteButton = getByTestId(`RideTable-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    
    fireEvent.click(deleteButton);
  
    expect(mockDeleteMutation).toHaveBeenCalled();
  });
  
  
});