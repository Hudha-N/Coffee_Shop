import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Espresso from "./pages/Espresso";
import Latte from "./pages/Latte";
import Cappuccino from "./pages/Cappuccino";
import IcedCoffee from "./pages/IcedCoffee";
import Mocha from "./pages/Mocha";
import Americano from "./pages/Americano";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Whishlist from "./pages/Whishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";




function AppShell() {
  const location = useLocation();
  const bannerPaths = ["/about", "/contact", "/product", "/Espresso", "/Latte", "/Cappuccino", "/IcedCoffee", "/Mocha", "/Americano"];
  const isBanner = bannerPaths.some(p => location.pathname === p || (p === '/product' && location.pathname.startsWith('/product/')));

  return (
    <div style={{ fontFamily: "poppins, sans-serif", background: "#c9beba", minHeight: "100vh" }}>
 <Navbar transparent={isBanner} />     
      <div style={{ padding: "1rem 3rem" }}>
        
        <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/Espresso" element={<Espresso />} />
            <Route path="/Latte" element={<Latte />} />
            <Route path="/Cappuccino" element={<Cappuccino />} />
            <Route path="/IcedCoffee" element={<IcedCoffee />} />
            <Route path="/Mocha" element={<Mocha />} />
            <Route path="/Americano" element={<Americano />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile customerId={1} />} />
            <Route path="/whishlist" element={<Whishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}