import { createContext, useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({
  user: null,
  setUser: () => null, // No-op
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    console.log("Cookies:", cookies);
    if (cookies.token) {
      fetch("/api/user/info", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            console.log("User data:", data.user);
          } else if (data.error) {
            console.log("Error:", data.error);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [cookies.token]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
