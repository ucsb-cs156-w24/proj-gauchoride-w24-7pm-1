import { screen, render, waitFor} from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

import AppNavbar from "main/components/Nav/AppNavbar";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("AppNavbar tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText,  queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        
        const rideMenu = queryByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).not.toBeInTheDocument();

        const adminMenu = queryByTestId("appnavbar-admin-dropdown");
        expect(adminMenu).not.toBeInTheDocument();

        const driverMenu = queryByTestId("appnavbar-driver-dropdown");
        expect(driverMenu).not.toBeInTheDocument();
    });

    test("renders correctly for regular logged in rider", async () => {

        const currentUser = currentUserFixtures.riderOnly;
        const doLogin = jest.fn();

        const { getByText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());    
        const driverMenu = screen.queryByTestId("appnavbar-driver-dropdown");
        expect(driverMenu).not.toBeInTheDocument();    

    });

    test("renders correctly for regular logged in driver", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const driverMenu = getByTestId("appnavbar-driver-dropdown");
        expect(driverMenu).toBeInTheDocument();
    });

    test("renders correctly for admin user", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const doLogin = jest.fn();

        const { getByText , getByTestId} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        const adminMenu = getByTestId("appnavbar-admin-dropdown");
        expect(adminMenu).toBeInTheDocument();        
    });

    test("renders H2Console and Swagger links correctly", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const { getByText  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("H2Console")).toBeInTheDocument());
        const swaggerMenu = getByText("Swagger");
        expect(swaggerMenu).toBeInTheDocument();        
    });

    test("renders shift table links correctly for admin user", async () => {

        const currentUser = currentUserFixtures.adminOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                    </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        const shiftMenu = getByTestId("appnavbar-shift-dropdown");
        expect(shiftMenu).toBeInTheDocument();        
    });

    test("renders shift table links correctly for driver", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const shiftMenu = getByTestId("appnavbar-shift-dropdown");
        expect(shiftMenu).toBeInTheDocument();        
    });

    test("renders driver page link for driver", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText(/Drivers/)).toBeInTheDocument());
    });

    test("does NOT render driver page link for rider", async () => {

        const currentUser = currentUserFixtures.riderOnly;
        const doLogin = jest.fn();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(screen.queryByText(/^Drivers$/)).not.toBeInTheDocument());
    });

    test("renders shift table links correctly for rider", async () => {

        const currentUser = currentUserFixtures.riderOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const shiftMenu = getByTestId("appnavbar-shift-dropdown");
        expect(shiftMenu).toBeInTheDocument();        
    });

    test("not render shift table links for regular user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const shiftMenu = screen.queryByTestId("appnavbar-shift-dropdown");
        expect(shiftMenu).not.toBeInTheDocument();        
    });

    // test taken from https://github.com/ucsb-cs156/proj-courses repo
    test("renders image correctly", async () => {
        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByTestId("gauchoride-nav-logo")).toHaveAttribute('style', 'width: 80px; height: 80px; margin-right: 15px;');     
    });



    test("renders the AppNavbarLocalhost when on http://localhost:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());

    });

    test("does NOT render the AppNavbarLocalhost when on localhost:8080", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:8080')

        const {getByTestId, queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbar")).toBeInTheDocument());
        expect(queryByTestId(/AppNavbarLocalhost/i)).toBeNull();
    });

    test("renders image correctly", async () => {
        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                    </MemoryRouter>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId("gauchoride-nav-logo")).toHaveAttribute('style', 'width: 80px; height: 80px; margin-right: 15px;');
    });
                    
    test("background of AppNavbar is UCSB's navy color", async () => {

        const currentUser = currentUserFixtures;
        const doLogin = jest.fn();


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
     
        await waitFor(() => expect(getByTestId(`AppNavbar`)).toHaveStyle(`backgroundColor: #003660`));
    });


      test("Navbar has UCSB-blue background color, admin user", () => {
        
        const currentUser = currentUserFixtures.adminUser;
        const doLogin = jest.fn();

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
       
        const navbar = getByTestId("AppNavbar");
        expect(navbar).toHaveStyle("background-color: #003660");
      });

      test("renders ride links correctly for admin user", async () => {

        const currentUser = currentUserFixtures.adminOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId, findByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                    </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        
        const rideMenu = getByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).toBeInTheDocument(); 

        await findByTestId("appnavbar-ride-dropdown");
        const dropdown = getByTestId("appnavbar-ride-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await findByTestId(/appnavbar-ride-create-dropdown/);
                
    });

    test("renders ride links correctly for admin NO user", async () => {

        const currentUser = currentUserFixtures.adminOnlyNoUser;
        const doLogin = jest.fn();

        const { getByText , getByTestId, findByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                    </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        
        const rideMenu = getByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).toBeInTheDocument(); 

        await findByTestId("appnavbar-ride-dropdown");
        const dropdown = getByTestId("appnavbar-ride-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await findByTestId(/appnavbar-ride-create-dropdown/);
                
    });

    test("renders ride links correctly for driver", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const rideMenu = getByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).toBeInTheDocument();        
    });

    test("renders ride links correctly for rider", async () => {

        const currentUser = currentUserFixtures.riderOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId, findByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        
        const rideMenu = getByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).toBeInTheDocument(); 

        await findByTestId("appnavbar-ride-dropdown");
        const dropdown = getByTestId("appnavbar-ride-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await findByTestId(/appnavbar-ride-create-dropdown/);   
        
        const rideCreate = screen.queryByTestId("appnavbar-ride-create-dropdown");
        expect(rideCreate).toBeInTheDocument();        

    });

    test("renders ride links correctly for admin", async () => {

        const currentUser = currentUserFixtures.adminOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId, findByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        
        const rideMenu = getByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).toBeInTheDocument(); 

        await findByTestId("appnavbar-ride-dropdown");
        const dropdown = getByTestId("appnavbar-ride-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await findByTestId(/appnavbar-ride-create-dropdown/);   
        
        const rideCreate = screen.queryByTestId("appnavbar-ride-create-dropdown");
        expect(rideCreate).toBeInTheDocument();        

    });

    test("not render ride links for regular user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const rideMenu = screen.queryByTestId("appnavbar-ride-dropdown");
        expect(rideMenu).not.toBeInTheDocument();        
    });

    test("Create ride should not be available for user that is neither Admin nor Rider", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const rideMenu = screen.queryByTestId("appnavbar-ride-create-dropdown");
        expect(rideMenu).not.toBeInTheDocument(); 
    });

    test("Create ride should not be available for user that is a Driver and neither Admin nor Rider", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByTestId, findByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await findByTestId("appnavbar-ride-dropdown");
        const dropdown = getByTestId("appnavbar-ride-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        
        const rides = screen.queryByTestId("appnavbar-ride-dropdown-rides");
        expect(rides).toBeInTheDocument();

        const rideCreate = screen.queryByTestId("appnavbar-ride-create-dropdown");
        expect(rideCreate).not.toBeInTheDocument(); 
        
        const NOrideCreate = screen.queryByTestId("NO-appnavbar-ride-create-dropdown");
        expect(NOrideCreate).toBeInTheDocument();  

    });

    test("Driver page link should appear for a user that is not a driver", async () => {
        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const driverLink = screen.queryByTestId("appnavbar-driver");
        expect(driverLink).toBeInTheDocument();      
    });
        
    test("renders RiderApplicationMember links correctly for member", async () => {

        const currentUser = currentUserFixtures.memberOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        await waitFor(() => expect(getByText("Apply to be a Rider")).toBeInTheDocument());        
    });

    test("renders chat link correctly for driver", async () => {

        const currentUser = currentUserFixtures.driverOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Log Out")).toBeInTheDocument());
        const chatMenu = getByTestId("appnavbar-chat-dropdown");
        expect(chatMenu).toBeInTheDocument();        
    });


    test("renders shift table links correctly for adminOnly", async () => {

        const currentUser = currentUserFixtures.adminOnly;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                    </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phill Conrad")).toBeInTheDocument());
        const chatMenu = getByTestId("appnavbar-chat-dropdown");
        expect(chatMenu).toBeInTheDocument();        
    });


    test("not render RiderApplicationMember links for regular user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const chatMenu = screen.queryByTestId("appnavbar-chat-dropdown");
        expect(chatMenu).not.toBeInTheDocument();        
    });

    test("Driver page link should not appear for a user that is not a participant", async () => {
        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const driverLink = screen.queryByTestId("appnavbar-driver-link");
        expect(driverLink).not.toBeInTheDocument();          
    });

    test("Apply to be a rider should not appear for rider users", async () => {
        const currentUser = currentUserFixtures.riderOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => expect(getByText("Welcome, Phillip Conrad")).toBeInTheDocument());
        const applyLink = screen.queryByTestId("appnavbar-applytoberider");
        expect(applyLink).not.toBeInTheDocument();
    });

});

