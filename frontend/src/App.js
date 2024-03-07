import AdminUsersPage from "main/pages/AdminUsersPage";
import DriverListPage from "main/pages/DriverListPage";
import HomePage from "main/pages/HomePage";
import PageNotFound from "main/pages/PageNotFound";
import ProfilePage from "main/pages/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatPage from "main/pages/ChatPage";
import RideRequestCreatePage from "main/pages/Ride/RideRequestCreatePage";
import RideRequestEditPage from "main/pages/Ride/RideRequestEditPage";
import RideRequestIndexPage from "main/pages/Ride/RideRequestIndexPage";
import RideRequestAssignPage from "main/pages/Ride/RideRequestAssignPage";
import ShiftPage from "main/pages/ShiftPage";

import DriverAvailabilityCreatePage from "main/pages/Drivers/DriverAvailabilityCreatePage";
import DriverAvailabilityIndexPage from "main/pages/Drivers/DriverAvailabilityIndexPage"

import ShiftCreatePage from "main/pages/Shift/ShiftCreatePage";
import ShiftEditPage from "main/pages/Shift/ShiftEditPage";
import ShiftIndexPage from "main/pages/Shift/ShiftIndexPage";
import ShiftInfoPage from "main/pages/Shift/ShiftInfoPage";

import DriverInfoPage from "main/pages/DriverInfoPage";
import DriverPage from "main/pages/DriverPage";
import DriverDashboardPage from "main/pages/Drivers/DriverDashboardPage";

import RiderApplicationCreatePage from "main/pages/RiderApplication/RiderApplicationCreatePage";
import RiderApplicationEditPageMember from "main/pages/RiderApplication/RiderApplicationEditPageMember";
import RiderApplicationIndexPageMember from "main/pages/RiderApplication/RiderApplicationIndexPageMember";
import RiderApplicationShowPageMember from "main/pages/RiderApplication/RiderApplicationShowPageMember";
import RiderApplicationIndexPageAdmin from "main/pages/RiderApplication/RiderApplicationIndexPageAdmin";
import RiderApplicationEditPageAdmin from "main/pages/RiderApplication/RiderApplicationEditPageAdmin";

import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {
          hasRole(currentUser, "ROLE_DRIVER") && <Route exact path="/driver" element={<DriverPage />} />
        }
        {
          hasRole(currentUser, "ROLE_RIDER") && <Route exact path="/shift/list" element={<ShiftPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && <Route exact path="/profile" element={<ProfilePage />} />
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_RIDER")) && <Route exact path="/ride/" element={<RideRequestIndexPage />} />
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/ride/assigndriver/:id" element={<RideRequestAssignPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_RIDER") || hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/ride/create" element={<RideRequestCreatePage />} />
        }
        {
          (hasRole(currentUser, "ROLE_MEMBER") )&& <Route exact path="/apply/rider/show/:id" element={<RiderApplicationShowPageMember />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_RIDER")) && <Route exact path="/ride/edit/:id" element={<RideRequestEditPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")  || hasRole(currentUser, "ROLE_RIDER") )&& <Route exact path="/driverInfo/:id" element={<DriverInfoPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/chat" element={<ChatPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/availability/" element={<DriverAvailabilityIndexPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/availability/create" element={<DriverAvailabilityCreatePage />} />
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/shift/list" element={<ShiftPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_RIDER")) && <Route exact path="/shift/" element={<ShiftIndexPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/shift/create" element={<ShiftCreatePage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/shift/edit/:id" element={<ShiftEditPage />} />
        }
        { 
          (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_DRIVER") || hasRole(currentUser, "ROLE_RIDER") ) && <Route exact path="/drivers/list" element={<DriverListPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_DRIVER") ) && <Route exact path="/drivershifts" element={<DriverDashboardPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")  || hasRole(currentUser, "ROLE_DRIVER") )&& <Route exact path="/shiftInfo/:id" element={<ShiftInfoPage />} />
        }
        {
          (hasRole(currentUser, "ROLE_MEMBER")) && <Route exact path="/apply/rider" element={<RiderApplicationIndexPageMember />} />
        }
        {
          (hasRole(currentUser, "ROLE_MEMBER")) && <Route exact path="/apply/rider/new" element={<RiderApplicationCreatePage />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/admin/applications/riders" element={<RiderApplicationIndexPageAdmin />} />
        }
        {
          (hasRole(currentUser, "ROLE_ADMIN")) && <Route exact path="/admin/applications/riders/review/:id" element={<RiderApplicationEditPageAdmin />} />
        }
        {
          (hasRole(currentUser, "ROLE_MEMBER")) && <Route exact path="/apply/rider/edit/:id" element={<RiderApplicationEditPageMember />} />
        }
        <Route exact path="/privacy.html" />
        <Route exact path="/*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
