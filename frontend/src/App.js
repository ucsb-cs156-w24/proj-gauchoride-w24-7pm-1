import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage/HomePage";
import ProfilePage from "main/pages/ProfilePage";

import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
