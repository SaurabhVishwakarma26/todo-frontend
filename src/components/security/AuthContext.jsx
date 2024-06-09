import { createContext, useContext, useState } from "react";
import { apiClient } from "../../api/ApiClient";
import {
  basicAuthServiceApi,
  jwtAuthServiceApi,
} from "../../api/AuthenticationApiService";

// Create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // const login = async (username, password) => {
  //   const token = "Basic " + window.btoa(username + ":" + password);

  //   try {
  //     const response = await basicAuthServiceApi(token);

  //     if (response.status == 200) {
  //       setIsAuthenticated(true);
  //       setUsername(username);
  //       setToken(token);

  //       // setting up token for every api call
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("Intercepting and adding a token");
  //         config.headers.Authorization = token;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     logout();
  //     return false;
  //   }
  // };

  const login = async (username, password) => {
    try {
      // const response = await basicAuthServiceApi(token);
      const response = await jwtAuthServiceApi(username, password);

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        // setting up token for every api call
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
