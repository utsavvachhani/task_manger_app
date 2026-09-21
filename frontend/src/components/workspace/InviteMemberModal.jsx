import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import UserAvatar from "../common/UserAvatar";
import toast from "../../utils/Toast";
import { projectsPresenters } from "../../presenters/projectsPresnters";

function InviteMemberModal({ project, onClose, setProjects, currentUserId }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const isOwner =
    (project.userId?._id || project.userId)?.toString() === currentUserId?.toString();

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    const res = await projectsPresenters.inviteMember(
      project._id,
      { email: email.trim(), role },
      setProjects
    );
    setLoading(false);
    if (res.success) {
      setEmail("");
    }
  };

  const handleRemoveMember = async (memberUserId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      await projectsPresenters.removeMember(project._id, memberUserId, setProjects);
    }
  };

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}/dashboard?project=${project._id}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success("Workspace link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const membersList = project.members || [];
  const invitationsList = project.invitations || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-(--bg-card) border border-(--border) shadow-2xl overflow-hidden transition-all">
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-(--border)">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <PersonAddAlt1Icon className="!text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-(--text-primary)">
                Share & Invite
              </h3>
              <p className="text-xs text-(--text-secondary)">
                Project: <span className="font-semibold text-(--text-primary)">{project.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition cursor-pointer"
          >
            <CloseIcon className="!text-lg" />
          </button>
        </div>

        {/* INVITE FORM */}
        <div className="p-5 border-b border-(--border)">
          <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-(--border) bg-(--bg-secondary) text-(--text-primary) placeholder:text-(--text-muted) outline-none focus:border-sky-500 transition"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-xl border border-(--border) bg-(--bg-secondary) text-(--text-primary) outline-none cursor-pointer"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "Inviting..." : "Invite"}
            </button>
          </form>

          {/* QUICK COPY LINK */}
          <div className="mt-3 flex items-center justify-between text-xs text-(--text-muted)">
            <span>Share workspace direct link</span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 font-semibold text-sky-500 hover:underline cursor-pointer"
            >
              {copied ? <CheckIcon className="!text-xs text-emerald-500" /> : <ContentCopyIcon className="!text-xs" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>

        {/* MEMBERS LIST */}
        <div className="p-5 max-h-64 overflow-y-auto space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">
            Project Members ({membersList.length + 1})
          </h4>

          {/* OWNER */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-(--bg-secondary)/50 border border-(--border)">
            <div className="flex items-center gap-3">
              <UserAvatar user={project.userId} size="md" role="owner" />
              <div>
                <p className="text-sm font-semibold text-(--text-primary)">
                  {project.userId?.firstName
                    ? `${project.userId.firstName} ${project.userId.lastName || ""}`
                    : "Owner"}
                </p>
                <p className="text-xs text-(--text-muted)">{project.userId?.email}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Owner
            </span>
          </div>

          {/* MEMBERS */}
          {membersList.map((m) => {
            const memberUser = m.user;
            if (!memberUser || memberUser._id === (project.userId?._id || project.userId))
              return null;

            return (
              <div
                key={memberUser._id || m._id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-(--bg-secondary)/30 border border-(--border)"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar user={memberUser} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-(--text-primary)">
                      {memberUser.firstName
                        ? `${memberUser.firstName} ${memberUser.lastName || ""}`
                        : memberUser.email}
                    </p>
                    <p className="text-xs text-(--text-muted)">{memberUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 capitalize">
                    {m.role || "Member"}
                  </span>
                  {isOwner && (
                    <button
                      onClick={() => handleRemoveMember(memberUser._id)}
                      title="Remove member"
                      className="p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <DeleteOutlineIcon className="!text-sm" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* PENDING INVITATIONS */}
          {invitationsList.length > 0 && (
            <div className="pt-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-(--text-muted) mb-2">
                Pending Invites ({invitationsList.filter(i => i.status === "pending").length})
              </h5>
              <div className="space-y-2">
                {invitationsList.map((inv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-(--bg-secondary)/20 text-xs border border-dashed border-(--border)"
                  >
                    <span className="font-mono text-(--text-secondary)">{inv.email}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-(--border) flex justify-end bg-(--bg-secondary)/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-(--border) hover:bg-(--bg-secondary) transition cursor-pointer text-(--text-primary)"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteMemberModal;
