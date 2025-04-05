import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
