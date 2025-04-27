import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registreringen misslyckades");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrera användare</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Förnamn"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Efternamn"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-post"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          onChange={handleChange}
          required
        />
        <button type="submit">Registrera</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
