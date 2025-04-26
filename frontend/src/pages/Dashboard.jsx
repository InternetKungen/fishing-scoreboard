import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ProgressSection from "../components/ProgressSection";
import Top3Section from "../components/Top3Section";
import HistorySection from "../components/HistorySection";
import CompetitionInfo from "../components/CompetitionInfo";
import MyCatchList from "../components/MyCatchList";
import Logo from "../assets/img/fishing-logo.png";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [myCatches, setMyCatches] = useState([]);
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
          setUserInfo(data.user);
        } else {
          console.error("Misslyckades med att hämta användardata");
        }
      } catch (error) {
        console.error("Fel vid hämtning av användardata:", error);
      }
    };

    const fetchCatches = async () => {
      try {
        const response = await fetch("/api/catches/", {
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

    const fetchMyCatches = async () => {
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
          setMyCatches(data);
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
    fetchMyCatches();
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
    const form = e.target;
    const fish = form.fish.value;
    const length = parseInt(form.length.value);
    const imageFile = form.imageFile.files[0];

    let imageFilename = null;

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("imageFile", imageFile);

      try {
        const uploadRes = await fetch("/api/upload/image", {
          method: "POST",
          body: uploadData,
          credentials: "include",
        });

        if (uploadRes.ok) {
          const result = await uploadRes.json();
          imageFilename = result.filename;
        } else {
          console.error("Misslyckades med att ladda upp bild");
        }
      } catch (err) {
        console.error("Fel vid bilduppladdning:", err);
      }
    }

    try {
      const catchRes = await fetch("/api/catches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fish,
          length,
          image: imageFilename,
        }),
      });

      if (catchRes.ok) {
        const newCatch = await catchRes.json();
        setCatches((prev) => [...prev, newCatch]);
        setMyCatches((prev) => [...prev, newCatch]);
        form.reset();
      } else {
        console.error("Misslyckades med att registrera fångst");
      }
    } catch (err) {
      console.error("Fel vid registrering:", err);
    }
  };

  const handleDeleteCatch = async (id) => {
    try {
      const response = await fetch(`/api/catches/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCatches((prev) => prev.filter((c) => c._id !== id));
        setMyCatches((prev) => prev.filter((c) => c._id !== id));
      } else {
        console.error("Misslyckades med att ta bort fångst");
      }
    } catch (error) {
      console.error("Fel vid borttagning av fångst:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <header className="login-header">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Fisketävling 2025</h1>
        <div className="login-container">
          <button onClick={handleLogout} className="logout-button">
            Logga ut
          </button>
        </div>
      </header>

      <main>
        <div className="user-info-section">
          <h2>Välkommen till Fisketävlingen, {userInfo?.firstName}!</h2>
          {/* <p>
            Här är din dashboard med information om tävlingen och dina resultat.
          </p> */}
          <p>Din registrerade e-post: {userInfo?.email}</p>
        </div>
        <div className="form-container">
          <h3>Registrera Fångst</h3>
          <form onSubmit={handleCatchSubmit} className="catch-form">
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

            <input type="file" name="imageFile" accept="image/*" />

            <button type="submit">Registrera Fångst</button>
          </form>
        </div>
        <div className="my-catches-section">
          <MyCatchList catches={myCatches} onDelete={handleDeleteCatch} />
        </div>

        <ProgressSection catches={catches} />
        <Top3Section top3Abborre={top3Abborre} top3Gadda={top3Gadda} />
        <HistorySection catches={catches} />
        <CompetitionInfo />
      </main>
    </div>
  );
}
