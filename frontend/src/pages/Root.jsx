import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="footer bg-neutral text-neutral-content py-8 mt-8 border-t border-neutral-focus">
        <div className="container mx-auto flex flex-col items-start px-4">
          {/* Branding */}
          <div>
            <h1 className="text-xl font-bold mb-1">
              AI Powered Resume Generator
            </h1>
            <p className="text-sm opacity-75 mb-2">
              Build a professional resume in minutes with AI-powered tools.
            </p>
            <p className="text-sm mb-2">
              &copy; 2025 &mdash; Team AI Powered Resume Generator
            </p>
          </div>
          {/* Team Members */}
          <div className="mb-4">
            <ul className="space-y-1 mt-2">
              <li>
                <span className="font-bold text-blue-400">
                  Tanmay Vijay Kudkar
                </span>
              </li>
              <li>
                <span className="font-bold text-blue-400">
                  Ritikesh Arun Nayak
                </span>
              </li>
              <li>
                <span className="font-bold text-blue-400">
                  Atharva Mangesh Raut
                </span>
              </li>
              <li>
                <span className="font-bold text-blue-400">
                  Pravin Suresh Rathod
                </span>
              </li>
            </ul>
          </div>
          {/* Copyright & Credits */}
          <div className="mt-2">
            <p className="text-xs opacity-75">
              All Rights Reserved. | Crafted with{" "}
              <span className="text-pink-400">❤️</span> &amp; React
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Root;
