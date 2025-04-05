import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [catches, setCatches] = useState([]);
  const [top3Abborre, setTop3Abborre] = useState([]);
  const [top3Gadda, setTop3Gadda] = useState([]);

  // Hämta användarinformation vid laddning av sidan
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token"); // Ta bort token från localStorage
    window.location.href = "/login";
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
