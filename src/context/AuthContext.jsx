import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "",
  );
  // for user authentication
  const [service, setservice] = useState([]);
  const [user, setuser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setloading] = useState(false);
  // storing token
  const storeToken = (token, userName) => {
    setToken(token);
    setUserName(userName);

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
  };
  const logout = () => {
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };
  // to get authentication from backedn user
  const userAuthentication = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ← sends token
        },
      });
      const data = await response.json();
      if (response.ok) {
        setuser(data.userData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //  to get all the service backend data
  const getservice = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/data/services`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
    setservice(data.services);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log(service);
  
useEffect(()=>{
if(token){
  userAuthentication()
}
getservice()
},[])

  const AuthorizationToken = `Bearer ${token}`;
  const isloggedIn = !!token;
  return (
    <Authcontext.Provider
      value={{
        isloggedIn,
        userName,
        storeToken,
        loading,
        token,
        logout,
        user,
        AuthorizationToken,
        service,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
