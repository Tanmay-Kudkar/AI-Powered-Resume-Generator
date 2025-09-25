import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import "./index.css"; 
import { BrowserRouter, Route, Routes } from "react-router"; 
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import { Toaster } from "react-hot-toast"; 

/**
 * main.jsx
 * --------
 * Entry point of the React application.
 * - Sets up React Router for client-side navigation
 * - Wraps everything inside StrictMode (to highlight potential issues)
 * - Includes a global Toaster component for showing notifications
 * 
 * Routes:
 *   "/"                -> Home (Landing page)
 *   "/about"           -> About page
 *   "/services"        -> Services page
 *   "/contact"         -> Contact page
 *   "/generate-resume" -> Resume generator page
 */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter enables SPA (Single Page App) navigation */}
    <BrowserRouter>
      
      {/* Toaster is a global notification system */}
      <Toaster />

      {/* Define all routes in your app */}
      <Routes>
        {/* Root layout (Navbar + Outlet) */}
        <Route path="/" element={<Root />}>
          {/* Nested routes */}
          <Route path="" element={<Home />} /> {/* Landing page */}
          <Route path="about" element={<About />} /> {/* About page */}
          <Route path="services" element={<Services />} /> {/* Services page */}
          <Route path="contact" element={<Contact />} /> {/* Contact page */}
          <Route path="generate-resume" element={<GenerateResume />} /> {/* Resume generator */}
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
