import React from "react";

const AVATAR_COLORS = [
  "from-sky-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-red-600",
  "from-cyan-500 to-blue-600",
];

function stringToColor(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(user) {
  if (!user) return "?";
  if (typeof user === "string") return user.slice(0, 2).toUpperCase();
  const first = user.firstName || "";
  const last = user.lastName || "";
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
  if (first) return first.slice(0, 2).toUpperCase();
  if (user.email) return user.email.slice(0, 2).toUpperCase();
  return "U";
}

function UserAvatar({
  user,
  size = "md",
  className = "",
  showTooltip = true,
  role = null,
}) {
  const initials = getInitials(user);
  const name =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "User";

  const sizeClasses = {
    xs: "w-5 h-5 text-[10px]",
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-xs font-semibold",
    lg: "w-10 h-10 text-sm font-bold",
    xl: "w-12 h-12 text-base font-bold",
  };

  const bgGradient = stringToColor(user?.email || name);

  return (
    <div
      title={showTooltip ? `${name}${role ? ` (${role})` : ""}` : undefined}
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr ${bgGradient} text-white shadow-sm shrink-0 select-none ${sizeClasses[size]} ${className}`}
    >
      <span>{initials}</span>
      {role === "owner" && (
        <span
          title="Project Owner"
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 border-2 border-white dark:border-slate-900 rounded-full"
        />
      )}
    </div>
  );
}

export default UserAvatar;
