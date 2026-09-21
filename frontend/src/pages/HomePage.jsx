import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { DASHBOARD, SIGNIN, SIGNUP } from "../utils/route";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function HomePage() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  // Pricing toggle state
  const [isAnnual, setIsAnnual] = useState(true);

  // Interactive FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Interactive hero demo board state
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, title: "Design Landing Page", status: "Done", tag: "Design", color: "emerald" },
    { id: 2, title: "Configure MongoDB & Port 3122", status: "Done", tag: "Backend", color: "blue" },
    { id: 3, title: "Interactive Pricing Table", status: "In Progress", tag: "Frontend", color: "indigo" },
    { id: 4, title: "Sprint Review & Launch", status: "To Do", tag: "Milestone", color: "amber" },
  ]);

  const handleHeroCta = () => {
    if (authData) {
      navigate(DASHBOARD);
    } else {
      navigate(SIGNIN);
    }
  };

  const pricingTiers = [
    {
      name: "Starter",
      badge: "Free Forever",
      priceMonthly: 0,
      priceAnnual: 0,
      description: "Ideal for solo developers, freelancers, and personal project tracking.",
      features: [
        "Up to 3 Active Projects",
        "Unlimited Task Creation",
        "Visual Drag-and-Drop Kanban Board",
        "Basic Search and Filters",
        "Full Dark Mode & Light Mode",
        "Community Support",
      ],
      ctaText: authData ? "Go to Dashboard" : "Get Started Free",
      isPopular: false,
    },
    {
      name: "Professional",
      badge: "Most Popular",
      priceMonthly: 12,
      priceAnnual: 9,
      description: "Supercharge your team's workflow with automated pipelines and unlimited projects.",
      features: [
        "Unlimited Projects & Boards",
        "Advanced Kanban with Instant Reordering",
        "Detailed Task Deadlines & Priority Tags",
        "Custom Filter Presets & Quick Search",
        "Instant State Sync & Error Recovery",
        "Priority Email & Chat Support",
      ],
      ctaText: authData ? "Access Pro Features" : "Start 14-Day Free Trial",
      isPopular: true,
    },
    {
      name: "Enterprise",
      badge: "Scale & Security",
      priceMonthly: 35,
      priceAnnual: 28,
      description: "Built for scaling organizations demanding rigorous security and dedicated support.",
      features: [
        "Everything in Professional",
        "Dedicated Database Clusters",
        "Granular Role-Based Access Controls",
        "Custom Workflow Automations & Webhooks",
        "Audit Logging & Activity Timelines",
        "24/7 Dedicated Account Manager",
      ],
      ctaText: "Contact Enterprise",
      isPopular: false,
    },
  ];

  const faqs = [
    {
      q: "How do I access the Task Manager and Kanban board?",
      a: "Simply click 'Go to Dashboard' or 'Get Started'. If you are logged in, you will be taken directly to your live Kanban workspace. If not, sign in or create an account in seconds.",
    },
    {
      q: "Can I use the Kanban drag-and-drop feature for free?",
      a: "Yes! The Starter plan is 100% free forever and includes the interactive Kanban drag-and-drop workspace, task categorization, and project management.",
    },
    {
      q: "What is the difference between Monthly and Annual billing?",
      a: "Annual billing gives you an instant 20% discount on Professional and Enterprise plans, billed as a single annual payment.",
    },
    {
      q: "Does Task Manager support both Dark and Light themes?",
      a: "Yes. Task Manager includes a built-in theme toggle in the header that seamlessly adapts every component to high-contrast dark or clean light mode.",
    },
    {
      q: "Is my project and task data secure?",
      a: "All data is securely stored with JWT authentication, encrypted cookies, and MongoDB persistence. Your tasks and boards are strictly accessible only by you.",
    },
  ];

  return (
    <div className="bg-(--bg) text-(--text-primary) transition-colors min-h-screen">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[650px] md:h-[650px] bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-6 shadow-sm">
              <AutoAwesomeIcon className="!text-sm animate-pulse" />
              <span>Task Manager 2.0 is Live & Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none">
              Organize Chaos. <br />
              <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Ship Projects With Speed.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-(--text-secondary) leading-relaxed">
              Experience the ultra-responsive Kanban workspace engineered for modern teams.
              Drag, prioritize, and collaborate in real-time with zero friction.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="hero-cta-dashboard"
                onClick={handleHeroCta}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-sky-500 hover:bg-sky-600 text-white hover:shadow-sky-500/25 hover:scale-[1.02]"
              >
                <BoltIcon />
                {authData ? "Go to Dashboard" : "Get Started Free"}
                <ArrowForwardIcon className="!text-lg" />
              </button>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-base border border-(--border) hover:border-sky-500/50 hover:bg-(--bg-secondary) transition-all duration-200 flex items-center justify-center gap-2 text-(--text-primary)"
              >
                View Plans & Pricing
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-(--text-muted)">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="!text-base text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="!text-base text-emerald-500" />
                <span>Instant setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="!text-base text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Preview Board */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-(--border) bg-(--bg-card) p-4 md:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-(--border)">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-(--text-muted)">workspace / sprint-live</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                ● Live Kanban Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {demoTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl border border-(--border) bg-(--bg-secondary) hover:border-sky-500/50 transition-all cursor-pointer hover:shadow-md"
                  onClick={() => {
                    setDemoTasks((prev) =>
                      prev.map((item) =>
                        item.id === t.id
                          ? {
                              ...item,
                              status: item.status === "Done" ? "To Do" : item.status === "To Do" ? "In Progress" : "Done",
                            }
                          : item
                      )
                    );
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
                      {t.tag}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.status === "Done"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : t.status === "In Progress"
                          ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-(--text-primary)">{t.title}</h4>
                  <p className="text-[11px] text-(--text-muted) mt-2 flex items-center gap-1">
                    <span>Click to advance state</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS / SOCIAL PROOF ===================== */}
      <section className="border-y border-(--border) bg-(--bg-secondary)/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-sky-500">99.9%</div>
            <p className="text-sm text-(--text-secondary) mt-1 font-medium">Uptime Reliability</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-500">50K+</div>
            <p className="text-sm text-(--text-secondary) mt-1 font-medium">Tasks Delivered</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-500">4.9/5</div>
            <p className="text-sm text-(--text-secondary) mt-1 font-medium">Developer Rating</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500">&lt; 80ms</div>
            <p className="text-sm text-(--text-secondary) mt-1 font-medium">API Response Time</p>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES SECTION ===================== */}
      <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold tracking-wider uppercase text-sky-500">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">
            Engineered For Frictionless Execution
          </h2>
          <p className="mt-4 text-(--text-secondary)">
            From rapid personal checklists to complex multi-project sprints, everything you need is built right in.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ViewKanbanIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Visual Kanban Workflow</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Organize tasks across customized project columns. Smooth drag-and-drop keeps work flowing without interruption.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <GroupWorkIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Project Hub</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Create isolated workspaces for each client, product milestone, or personal sprint with dedicated permissions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FilterListIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Search & Filtering</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Filter by priority, project, or status in real time. Never lose track of critical sprint blockers again.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <SpeedIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning-Fast REST API</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Powered by Node.js, Express, and MongoDB on dedicated high-performance ports for instantaneous synchronization.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <SecurityIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure JWT & Cookie Auth</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Industrial-grade protection featuring automatic refresh token rotation, encrypted cookies, and protected endpoints.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl border border-(--border) bg-(--bg-card) hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <DarkModeIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">Dynamic Theming</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Tailored high-contrast dark and clean light modes engineered to protect your focus during late-night coding sessions.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== WORKFLOW SECTION ===================== */}
      <section id="workflow" className="py-20 bg-(--bg-secondary)/40 border-y border-(--border)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-bold tracking-wider uppercase text-sky-500">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How It Works in 3 Steps</h2>
            <p className="mt-3 text-(--text-secondary)">
              Go from idea to execution in less than two minutes.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border) relative">
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-lg mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Initialize Project</h3>
              <p className="text-sm text-(--text-secondary)">
                Create a project workspace, set the core objectives, and define milestone boundaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border) relative">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-lg mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Add & Drag Tasks</h3>
              <p className="text-sm text-(--text-secondary)">
                Break tasks down into actionable cards. Move them seamlessly across columns as work progresses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border) relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-lg mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Ship & Celebrate</h3>
              <p className="text-sm text-(--text-secondary)">
                Clear your backlogs, review completed milestones, and deploy with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICING SECTION ===================== */}
      <section id="pricing" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold tracking-wider uppercase text-sky-500">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Simple Plans for Every Stage
          </h2>
          <p className="mt-4 text-(--text-secondary) text-base sm:text-lg">
            Start for free, then upgrade as your team and project volume expand.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full border border-(--border) bg-(--bg-secondary)">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? "bg-sky-500 text-white shadow-md"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? "bg-sky-500 text-white shadow-md"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-400 text-slate-900 font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, idx) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 ${
                  tier.isPopular
                    ? "border-sky-500 bg-(--bg-card) shadow-2xl scale-100 lg:-translate-y-2 ring-2 ring-sky-500/20"
                    : "border-(--border) bg-(--bg-card) hover:shadow-lg"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-500 text-white text-xs font-bold tracking-wider uppercase shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    {!tier.isPopular && (
                      <span className="text-xs px-2.5 py-1 rounded-full border border-(--border) text-(--text-muted)">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-(--text-secondary)">{tier.description}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-(--text-muted)">
                      / month {isAnnual && price > 0 ? "(billed annually)" : ""}
                    </span>
                  </div>

                  <div className="my-8 border-t border-(--border)" />

                  <ul className="space-y-3.5 text-sm">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <CheckCircleIcon className="!text-lg text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-(--text-primary)">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      if (authData) {
                        navigate(DASHBOARD);
                      } else {
                        navigate(SIGNUP);
                      }
                    }}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                      tier.isPopular
                        ? "bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-sky-500/25"
                        : "border border-(--border) hover:border-sky-500 hover:bg-(--bg-secondary) text-(--text-primary)"
                    }`}
                  >
                    {tier.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-20 bg-(--bg-secondary)/30 border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-bold tracking-wider uppercase text-sky-500">Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Loved By Product Teams</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border)">
              <div className="flex text-amber-400 gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="!text-sm" />
                ))}
              </div>
              <p className="text-sm text-(--text-secondary) italic">
                "The drag and drop Kanban feels so fluid and responsive. It cut our weekly sprint planning time in half."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-500 font-bold flex items-center justify-center text-sm">
                  AR
                </div>
                <div>
                  <h4 className="text-sm font-bold">Alex Rivera</h4>
                  <p className="text-xs text-(--text-muted)">Lead Frontend Engineer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border)">
              <div className="flex text-amber-400 gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="!text-sm" />
                ))}
              </div>
              <p className="text-sm text-(--text-secondary) italic">
                "Finally a task manager without unnecessary bloat. Fast loading, clean theme switching, and zero headaches."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-500 font-bold flex items-center justify-center text-sm">
                  SC
                </div>
                <div>
                  <h4 className="text-sm font-bold">Sarah Chen</h4>
                  <p className="text-xs text-(--text-muted)">Engineering Manager</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border)">
              <div className="flex text-amber-400 gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="!text-sm" />
                ))}
              </div>
              <p className="text-sm text-(--text-secondary) italic">
                "Separating projects and being able to quickly edit or reassign tasks on the fly has been a gamechanger for me."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center text-sm">
                  DM
                </div>
                <div>
                  <h4 className="text-sm font-bold">Devon Miller</h4>
                  <p className="text-xs text-(--text-muted)">Full Stack Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ACCORDION ===================== */}
      <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-sm font-bold tracking-wider uppercase text-sky-500">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Frequently Asked Questions</h2>
          <p className="mt-3 text-(--text-secondary)">
            Have questions? We have answers to help you get started quickly.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-(--border) bg-(--bg-card) overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full p-5 text-left flex items-center justify-between font-semibold text-base sm:text-lg cursor-pointer hover:bg-(--bg-secondary)/40 transition"
              >
                <span>{faq.q}</span>
                <ExpandMoreIcon
                  className={`transition-transform duration-200 ${
                    openFaq === i ? "rotate-180 text-sky-500" : "text-(--text-muted)"
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-(--text-secondary) leading-relaxed border-t border-(--border) pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA BANNER ===================== */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-700 text-white shadow-2xl text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Ready to Upgrade Your Productivity?
            </h2>
            <p className="mt-4 text-sky-100 text-base sm:text-lg">
              Join thousands of productive teams already delivering high-impact projects on Task Manager.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleHeroCta}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-white text-slate-900 hover:bg-slate-100 shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                {authData ? "Launch Dashboard" : "Get Started For Free"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
