import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import ProgressSection from "../components/ProgressSection";
import Top3Section from "../components/Top3Section";
import HistorySection from "../components/HistorySection";
import Logo from "../assets/img/fishing-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // 👈 lägg till
  const [catches, setCatches] = useState([]);
  const [top3Abborre, setTop3Abborre] = useState([]);
  const [top3Gadda, setTop3Gadda] = useState([]);

  useEffect(() => {
    const fetchCatches = async () => {
      try {
        const response = await fetch("/api/catches", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setCatches(data);
        } else {
          console.error("Misslyckades med att hämta fångster");
        }
      } catch (error) {
        console.error("Fel vid hämtning av fångster:", error);
      }
    };
    const fetchTop3 = async () => {
      try {
        const response = await fetch("/api/catches", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const top3Abborre = data
            .filter((catchItem) => catchItem.fish === "Abborre")
            .sort((a, b) => b.length - a.length)
            .slice(0, 3);
          const top3Gadda = data
            .filter((catchItem) => catchItem.fish === "Gädda")
            .sort((a, b) => b.length - a.length)
            .slice(0, 3);
          setTop3Abborre(top3Abborre);
          setTop3Gadda(top3Gadda);
        } else {
          console.error("Misslyckades med att hämta topp 3 fångster");
        }
      } catch (error) {
        console.error("Fel vid hämtning av topp 3 fångster:", error);
      }
    };

    fetchCatches();
    fetchTop3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data);

        // 👇 Hämta användarinfo direkt
        const userInfoRes = await fetch("/api/user/info", {
          method: "GET",
          credentials: "include",
        });

        if (userInfoRes.ok) {
          const userData = await userInfoRes.json();
          setUser(userData.user); // uppdatera context
        }

        navigate("/");
      } else {
        const err = await response.json();
        setError(err.message || "Inloggning misslyckades");
      }
    } catch (err) {
      setError("Något gick fel vid inloggning");
      console.error(err);
    }
  };

  return (
    <>
      <header className="login-header">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Fisketävling 2025</h1>
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Logga in</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <div className="login-links">
            <Link to="/register">Registrera dig</Link>
            <Link to="/reset-password">Glömt lösenord?</Link>
          </div>
        </div>
      </header>
      <main className="login-page">
        <div className="public-stats">
          <ProgressSection catches={catches} />
          <Top3Section top3Abborre={top3Abborre} top3Gadda={top3Gadda} />
          <HistorySection catches={catches} />
        </div>
      </main>
    </>
  );
}
