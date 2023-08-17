import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures, currentUserFixtures }  from "fixtures/currentUserFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ProfilePage from "main/pages/ProfilePage";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { useCurrentUser } from "main/utils/currentUser";




const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});



describe("CellPhone tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(screen.getByText("cell phone number: 111-111-1111")).toBeInTheDocument() );
        expect(screen.getByText("Change Cell Phone Number")).toBeInTheDocument()
    });

    test("renders correctly for admin user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText, getByTestId, queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(screen.getByText("cell phone number: N/A")).toBeInTheDocument() );
        expect(screen.getByText("Change Cell Phone Number")).toBeInTheDocument()
    });


    test("renders correctly for driver", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.driverOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(screen.getByText("cell phone number: N/A")).toBeInTheDocument() );
        expect(screen.getByText("Change Cell Phone Number")).toBeInTheDocument()
    });

    test("renders correctly for rider", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.riderOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(screen.getByText("cell phone number: N/A")).toBeInTheDocument() );
        expect(screen.getByText("Change Cell Phone Number")).toBeInTheDocument()
    });


    test("on submit, makes request to backend", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onPut("/api/userprofile/update-cellPhone").reply(config => {
            const { params } = config;
            if (params.cellPhone === "987-654-3210") {
              return [202];
            } else {
              return [404];
            }
          });

        const { getByText, getById, queryByTestId, getByPlaceholderText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(screen.getByText("cell phone number: 111-111-1111")).toBeInTheDocument());

        const changeButton = screen.getByText("Change Cell Phone Number");

        expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
        fireEvent.click(changeButton);
        expect(screen.getByText("Modal heading")).toBeInTheDocument();

        
        const phoneInput = screen.getByPlaceholderText("###-###-####");
        fireEvent.change(phoneInput, { target: { value: '987-654-3210' } });

        const saveButton = screen.getByText("Save Changes");
        fireEvent.click(saveButton);
        
        await waitFor(() => expect(screen.queryByText("Modal heading")).not.toBeInTheDocument());
        await waitFor(() => expect(axiosMock.history.put.length).toBe(1));
        
        //"Required request parameter 'cellPhone' for method parameter type String is not present"
        await waitFor(() => expect(mockToast).toBeCalledWith("Cell Phone number changed 987-654-3210"));
        //await waitFor(() => expect(screen.getByText("987-654-3210")).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("Cell Phone number changed 987-654-3210")).not.toBeInTheDocument());
        
        expect(screen.getByText('cell phone number: 987-654-3210')).toBeInTheDocument();

    });

    test("on cancel", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onPut('/api/userprofile/update-cellPhone').reply(202);
        

        //axiosMock.onPut("/api/userprofile/update-cellPhone?cellPhone=123-456-7890").reply(202);

        const { getByText, getById, queryByTestId, getByPlaceholderText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        const changeButton = screen.getByText("Change Cell Phone Number");

        expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
        fireEvent.click(changeButton);
        expect(screen.getByText("Modal heading")).toBeInTheDocument();

        
        const phoneInput = screen.getByTestId("PhoneInput");
        fireEvent.change(phoneInput, { target: { value: '987-654-3210' } });

        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);
        
        await waitFor(() => expect(screen.queryByText("Cell Phone number changed 987-654-3210")).not.toBeInTheDocument());
        expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
        expect(screen.queryByText("cell phone number: 987-654-3210")).not.toBeInTheDocument();
        fireEvent.click(changeButton);
        const saveButton = screen.getByText("Save Changes");
        fireEvent.click(saveButton);
        await waitFor(() => expect(screen.queryByText("Cell Phone number changed 987-654-3210")).not.toBeInTheDocument());
        expect(screen.queryByText("cell phone number: 987-654-3210")).not.toBeInTheDocument();



    });
    /*
    test("on submit, makes request to backend, but backend returns error", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onPut('/api/userprofile/update-cellPhone').reply(404);
        

        //axiosMock.onPut("/api/userprofile/update-cellPhone?cellPhone=123-456-7890").reply(202);

        const { getByText, getById, queryByTestId, getByPlaceholderText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
      
        const changeButton = screen.getByText("Change Cell Phone Number");

        expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
        fireEvent.click(changeButton);
        expect(screen.getByText("Modal heading")).toBeInTheDocument();

        
        const phoneInput = screen.getByTestId("PhoneInput");
        fireEvent.change(phoneInput, { target: { value: '987-654-3210' } });

        const saveButton = screen.getByText("Save Changes");
        
        act(() => {
            fireEvent.click(saveButton);
          });
        
        await waitFor(() => expect(screen.getByText("Modal heading")).toBeInTheDocument());
        await waitFor(() => expect(axiosMock.history.put.length).toBe(1));
        
        //"Required request parameter 'cellPhone' for method parameter type String is not present"
        await waitFor(() => expect(mockToast).not.toBeCalledWith("Cell Phone number changed 987-654-3210"));
        await waitFor(() => expect(screen.queryByText("987-654-3210")).not.toBeInTheDocument());

    });*/

    //TODO: Create test with custom user that starts with a CellPhone, mutation testing then DONE!!!!!
    
});


