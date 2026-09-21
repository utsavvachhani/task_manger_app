import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { HOME, DASHBOARD, SIGNIN, SIGNUP } from "../utils/route";

function Footer() {
  return (
    <footer
      className="w-full border-t border-(--border) bg-(--bg-card) text-(--text-primary) transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link
              to={HOME}
              className="inline-flex items-center gap-2.5 font-bold text-xl text-(--text-primary) hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white">
                <CalendarTodayIcon className="!text-base" />
              </div>
              <span>Task Manager</span>
            </Link>
            <p className="mt-3 text-sm text-(--text-secondary) max-w-sm leading-relaxed">
              The high-performance Kanban and project management platform built to streamline team workflows, sprint planning, and task execution.
            </p>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-(--text-primary) mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-(--text-secondary)">
              <li>
                <Link to={DASHBOARD} className="hover:text-sky-500 transition-colors">
                  Kanban Dashboard
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-sky-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#workflow" className="hover:text-sky-500 transition-colors">
                  Workflow
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-sky-500 transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* ACCOUNT & SUPPORT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-(--text-primary) mb-4">
              Account & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-(--text-secondary)">
              <li>
                <Link to={SIGNIN} className="hover:text-sky-500 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to={SIGNUP} className="hover:text-sky-500 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-sky-500 transition-colors">
                  FAQ & Support
                </a>
              </li>
              <li>
                <span className="text-(--text-muted) text-xs">
                  Port: 5122 (Front) / 3122 (Back)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--text-muted)">
          <p>© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with React 19 & Tailwind</span>
            <span>•</span>
            <span>REST API on Port 3122</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;