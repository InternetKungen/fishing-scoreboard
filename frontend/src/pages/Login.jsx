import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // 👈 lägg till

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
    <div className="login-container">
      <h1>Logga in till Fisketävling 2025</h1>
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
    </div>
  );
}
