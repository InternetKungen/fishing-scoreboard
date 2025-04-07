import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/Reset";

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
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/reset-password"
          element={user ? <Navigate to="/" /> : <ResetPasswordPage />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
