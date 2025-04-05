// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
