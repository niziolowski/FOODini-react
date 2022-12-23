import { createContext, useState } from "react";

const URL_SIGNUP = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/auth/signup";
const URL_LOGIN = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/auth/login";

const AuthContext = createContext({
  token: null,
  login: (email, password) => {},
  logout: () => {},
  signUp: (name, email, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        const token = await res.json();
        setError(null);
        setToken(token.authToken);
        setIsLoggedIn(true);
        return token;
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
        const token = await res.json();
        setError(null);
        setToken(token.authToken);
        setIsLoggedIn(true);
        return token;
      }

      if (!res.ok) {
        if (res.status === 500) {
          console.log(res);
          const error = await res.json();
          setError("Podano niepoprawny login lub hasło");
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    token,
    loading,
    error,
    isLoggedIn,
    login: handleLogin,
    signUp: handleSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
