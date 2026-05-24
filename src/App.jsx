import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./components/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Testimonial from "./pages/Testimonial";
import Logout from "./components/Logout";
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Adminproducts from "./admin/pages/Adminproducts";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Contacts from "./admin/pages/Contacts";
import Productdetails from "./pages/Productdetails";
import AdminProductList from "./admin/pages/AdminProductList";
import ProductCategory from "./pages/ProductCategory";
import ScrollTotopbar from "./components/scrollTotopbar";

// ✅ Separate component so useLocation works inside BrowserRouter
function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
        <ScrollTotopbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/productdetails/:id" element={<Productdetails />} />
        <Route path="/productcategory/:id" element={<ProductCategory />} />
        {/* admin routers */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Adminproducts />} />
          <Route path="adminproductlist/:id" element={<AdminProductList />} />

          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;