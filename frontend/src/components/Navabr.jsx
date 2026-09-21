import React, { useContext, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../presenters/authPresenters";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SIGNIN, SIGNUP, HOME, DASHBOARD } from "../utils/route";
import Button from "./Button";
import { buttonVariants } from "../utils/schema";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { authData, setAuthData } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout({ setAuthData, navigate });
  };

  const isDashboard = location.pathname === DASHBOARD;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-(--bg-card)/90 border-b border-(--border) transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* BRAND LOGO */}
        <div className="flex items-center gap-6">
          <Link
            to={HOME}
            className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-(--text-primary) hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <CalendarTodayIcon className="!text-lg" />
            </div>
            <span>Task Manager</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--text-secondary)">
            <Link
              to={HOME}
              className="hover:text-(--text-primary) transition-colors"
            >
              Home
            </Link>
            <a
              href="/#features"
              className="hover:text-(--text-primary) transition-colors"
            >
              Features
            </a>
            <a
              href="/#workflow"
              className="hover:text-(--text-primary) transition-colors"
            >
              Workflow
            </a>
            <a
              href="/#pricing"
              className="hover:text-(--text-primary) transition-colors"
            >
              Pricing
            </a>
            <a
              href="/#faq"
              className="hover:text-(--text-primary) transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
            className="p-2 rounded-lg border border-(--border) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-all cursor-pointer"
          >
            {darkMode ? <LightModeIcon className="!text-lg" /> : <DarkModeIcon className="!text-lg" />}
          </button>

          {authData ? (
            <>
              {!isDashboard && (
                <button
                  onClick={() => navigate(DASHBOARD)}
                  className="px-4 py-2 rounded-lg font-medium text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <DashboardCustomizeIcon className="!text-base" />
                  <span>Dashboard</span>
                </button>
              )}

              <span className="text-xs md:text-sm font-medium text-(--text-secondary) px-1">
                Hi, {authData.firstName}
              </span>

              <Button
                variant={buttonVariants.OUTLINE}
                onClick={handleLogout}
                className="!text-xs !py-1.5"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate(SIGNIN)}
                variant={buttonVariants.OUTLINE}
                className="!text-xs md:!text-sm"
              >
                Sign In
              </Button>

              <button
                onClick={() => navigate(DASHBOARD)}
                className="px-4 py-2 rounded-lg font-semibold text-xs md:text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON & THEME */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-(--border) text-(--text-secondary)"
          >
            {darkMode ? <LightModeIcon className="!text-base" /> : <DarkModeIcon className="!text-base" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-(--border) text-(--text-primary)"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-(--border) bg-(--bg-card) px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-(--text-secondary)">
            <Link
              to={HOME}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-(--text-primary)"
            >
              Home
            </Link>
            <a
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-(--text-primary)"
            >
              Features
            </a>
            <a
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-(--text-primary)"
            >
              Pricing
            </a>
            <a
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-(--text-primary)"
            >
              FAQ
            </a>
          </div>

          <div className="pt-3 border-t border-(--border) flex flex-col gap-2">
            {authData ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(DASHBOARD);
                  }}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm bg-sky-500 text-white"
                >
                  Open Dashboard
                </button>
                <Button
                  variant={buttonVariants.OUTLINE}
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout ({authData.firstName})
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(DASHBOARD);
                  }}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm bg-sky-500 text-white"
                >
                  Go to Dashboard
                </button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(SIGNIN);
                  }}
                  variant={buttonVariants.OUTLINE}
                  className="w-full"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
