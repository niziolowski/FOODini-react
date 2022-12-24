import { createContext, useEffect, useState } from "react";

const URL_SIGNUP = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/auth/signup";
const URL_LOGIN = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/auth/login";

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

      const res = await fetch(URL_SIGNUP, {
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
        if (res.status === "403") console.log(res);
        const error = await res.json();
        setError("Ten adres e-mail jest już zajęty");
        throw new Error(error.message);
      }

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const body = { email, password };

      const res = await fetch(URL_LOGIN, {
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
          name: data.userInfo.name,
          email: data.userInfo.email,
          token: data.authToken,
        };

        saveUserData(user);
        setIsLoggedIn(true);
        return data;
      }

      if (!res.ok) {
        if (res.status === 500) {
          const error = await res.json();
          setError("Podano niepoprawny login lub hasło");
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
