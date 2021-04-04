import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
