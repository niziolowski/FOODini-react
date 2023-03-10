import { createContext, useEffect, useState } from "react";
import { resetAccount } from "../utils/demo/api";

const SIGNUP_URL = process.env.REACT_APP_API_SIGNUP_URL;
const LOGIN_URL = process.env.REACT_APP_API_LOGIN_URL;

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user;
  };

  const saveUserData = (user) => {
    setToken(user.token);
    setName(user.name);
    setEmail(user.email);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserData = () => {
    setToken(null);
    setName(null);
    setEmail(null);
    localStorage.removeItem("user");
  };

  const handleSignUp = async (name, email, password) => {
    try {
      setLoading(true);

      const body = { name, email, password };

      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setLoading(false);

      if (res.ok) {
        const data = await res.json();
        setError(null);

        const user = {
          id: data.userInfo.id,
          name: data.userInfo.name,
          email: data.userInfo.email,
          token: data.authToken,
        };

        // Save user data in context and localStorage
        saveUserData(user);
        setIsLoggedIn(true);
        return data;
      }

      if (!res.ok) {
        const error = await res.json();
        if (res.status === "403") {
          setError("Ten adres e-mail jest już zajęty");
        } else {
          setError("Coś poszło nie tak");
        }
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const body = { email, password };

      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setLoading(false);

      if (res.ok) {
        const data = await res.json();
        setError(null);

        const user = {
          id: data.userInfo.id,
          name: data.userInfo.name,
          email: data.userInfo.email,
          token: data.authToken,
        };

        saveUserData(user);

        setIsLoggedIn(true);
        return data;
      }

      if (!res.ok) {
        const error = await res.json();
        if (res.status === 500) {
          setError("Podano niepoprawny login lub hasło");
        } else {
          setError("Coś poszło nie tak");
        }
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    // If DEMO user, refill database with some fake data
    if (email === "demo@demo.com" && true) resetAccount(token);

    // Remove user data from localStorage
    removeUserData();
  };

  // Check if user already logged in
  useEffect(() => {
    const user = loadUserData();

    if (user) {
      saveUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  const value = {
    name,
    email,
    token,
    loading,
    error,
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
    signUp: handleSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
