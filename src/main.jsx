import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartcontextProvider } from "./context/Cartcontext";
import "./index.css";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
   
      {/* ✅ wrap App */}
      <CartcontextProvider>
        <App />
      </CartcontextProvider>
      <Toaster position="top-right" />
    </AuthProvider>
  
);
