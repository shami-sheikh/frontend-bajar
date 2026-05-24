import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTotopbar() {
   const { pathname } = useLocation();

   useEffect(() => {
      // Triggers every time the URL pathname changes
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, [pathname]);

   return null;
}