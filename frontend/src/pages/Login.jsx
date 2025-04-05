// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // om cookies används
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Login success:", data);
//         navigate("/"); // redirect till startsidan
//       } else {
//         const err = await response.json();
//         setError(err.message || "Inloggning misslyckades");
//       }
//     } catch (err) {
//       setError("Något gick fel vid inloggning");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Logga in till Fisketävling 2025</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="E-post"
//           value={username} // Ändra från 'email' till 'username' för att matcha state
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Lösenord"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Logga in</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // om cookies används
        body: JSON.stringify({ email, password }), // skicka rätt data
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data);
        navigate("/"); // redirect till startsidan
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
