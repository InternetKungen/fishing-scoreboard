import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [catches, setCatches] = useState([]);
  const [top3Abborre, setTop3Abborre] = useState([]);
  const [top3Gadda, setTop3Gadda] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Hämta användarinformation vid laddning av sidan
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Misslyckades med att hämta användardata");
        }
      } catch (error) {
        console.error("Fel vid hämtning av användardata:", error);
      }
    };

    const fetchCatches = async () => {
      try {
        const response = await fetch("/api/catches/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

    fetchUserInfo();
    fetchCatches();
    fetchTop3();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // viktigt för att skicka med cookies
      });

      if (res.ok) {
        setUser(null); // töm användaren i context
        navigate("/login"); // navigera till login
      } else {
        console.error("Logout misslyckades");
      }
    } catch (error) {
      console.error("Fel vid logout:", error);
    }
  };

  const handleCatchSubmit = async (e) => {
    e.preventDefault();

    const fish = e.target.fish.value;
    const length = parseInt(e.target.length.value);

    try {
      const response = await fetch("/api/catches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fish, length }),
      });

      if (response.ok) {
        const newCatch = await response.json();
        setCatches([...catches, newCatch]);
      } else {
        console.error("Misslyckades med att registrera fångst");
      }
    } catch (error) {
      console.error("Fel vid registrering av fångst:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Välkommen till Fisketävlingen, {userInfo?.firstName}!</h2>
      <p>
        Här är din dashboard med information om tävlingen och dina resultat.
      </p>

      <div className="competition-container">
        <h3>Top 3 Fångster</h3>
        <div>
          <h4>Top 3 Största Abborre</h4>
          <ul>
            {top3Abborre.map((catchItem, index) => (
              <li key={index}>
                {catchItem.fisherman}: {catchItem.length} cm
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Top 3 Största Gädda</h4>
          <ul>
            {top3Gadda.map((catchItem, index) => (
              <li key={index}>
                {catchItem.fisherman}: {catchItem.length} cm
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="catch-form-container">
        <h3>Registrera Fångst</h3>
        <form onSubmit={handleCatchSubmit}>
          <select name="fish" required>
            <option value="">Välj Fisk</option>
            <option value="Abborre">Abborre</option>
            <option value="Gädda">Gädda</option>
          </select>
          <input
            type="number"
            name="length"
            placeholder="Längd i cm"
            required
          />
          <button type="submit">Registrera Fångst</button>
        </form>
      </div>

      <div className="catch-history-container">
        <h3>Din Fångsthistorik</h3>
        <ul>
          {catches.map((catchItem, index) => (
            <li key={index}>
              {catchItem.fish}: {catchItem.length} cm
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
}
