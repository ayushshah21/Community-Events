import { useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getUserDetails() {
      const token = localStorage.getItem("token");
      // List of public routes that don't require authentication
      const publicRoutes = ['/login', '/register'];
      
      // Only redirect to login if we're not already on a public route
      if (!token && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
        return;
      }

      if (token) {
        try {
          const res = await axios.get("http://localhost:3000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.user);
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          if (!publicRoutes.includes(location.pathname)) {
            navigate("/login");
          }
        }
      }
    }
    getUserDetails();
  }, [navigate, location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
