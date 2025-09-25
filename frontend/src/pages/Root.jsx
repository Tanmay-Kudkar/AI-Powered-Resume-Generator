import React from "react";
import { Outlet } from "react-router-dom"; // ✅ Correct import for routing
import Navbar from "../components/Navbar";

/**
 * Root Layout Component
 * ---------------------
 * This is the top-level layout component that wraps the entire app.
 * It contains:
 *  - A persistent Navbar (always visible at the top)
 *  - The main page content rendered via <Outlet>
 *  - A footer with branding, copyright, and credits
 */

function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* ============================
          NAVBAR SECTION
          Always stays at the top
      ============================ */}
      <Navbar />

      {/* ============================
          MAIN CONTENT AREA
          The <Outlet> renders whichever page
          matches the current route
      ============================ */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ============================
          FOOTER SECTION
          Professional footer with branding,
          copyright, and credits
      ============================ */}
      <footer className="footer bg-neutral text-neutral-content py-6 mt-8 border-t border-neutral-focus">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          
          {/* --- BRANDING --- */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-lg font-bold">AI Resume Maker</h1>
            <p className="text-sm opacity-75">
              Build a professional resume in minutes with AI-powered tools.
            </p>
          </div>

          {/* --- COPYRIGHT & CREDITS --- */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-primary">Tanmay Vijay Kudkar</span>
            </p>
            <p className="text-xs opacity-75">
              All Rights Reserved. | Crafted with ❤️ & React
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Root;
