import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Bell,
  FolderPlus,
  Trash2,
  Globe,
  Settings,
  type LucideIcon,
} from "lucide-react";

type ActivityType =
  | "check_up"
  | "check_down"
  | "notification"
  | "project_created"
  | "project_deleted"
  | "domain"
  | "settings";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  project?: string;
  timestamp: string; // ISO
}

const TYPE_META: Record<ActivityType, { icon: LucideIcon; color: string; bg: string }> = {
  check_up: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  check_down: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  notification: { icon: Bell, color: "text-blue-600", bg: "bg-blue-50" },
  project_created: { icon: FolderPlus, color: "text-gray-700", bg: "bg-gray-100" },
  project_deleted: { icon: Trash2, color: "text-gray-700", bg: "bg-gray-100" },
  domain: { icon: Globe, color: "text-amber-600", bg: "bg-amber-50" },
  settings: { icon: Settings, color: "text-gray-700", bg: "bg-gray-100" },
};

const FILTERS: { id: string; label: string; types?: ActivityType[] }[] = [
  { id: "all", label: "All" },
  { id: "checks", label: "Health checks", types: ["check_up", "check_down"] },
  { id: "notifications", label: "Notifications", types: ["notification"] },
  { id: "projects", label: "Projects", types: ["project_created", "project_deleted"] },
  { id: "domains", label: "Domains", types: ["domain"] },
];

const ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    type: "check_down",
    title: "Health check failed",
    detail: "3 consecutive failed pings — response timed out after 5s.",
    project: "api-gateway-service",
    timestamp: "2026-08-20T09:42:00Z",
  },
  {
    id: "2",
    type: "notification",
    title: "Alert sent via Email",
    detail: "Notified you@example.com after 3 consecutive failures.",
    project: "api-gateway-service",
    timestamp: "2026-08-20T09:42:10Z",
  },
  {
    id: "3",
    type: "check_up",
    title: "Service recovered",
    detail: "Responding normally again — 214ms response time.",
    project: "api-gateway-service",
    timestamp: "2026-08-20T09:51:00Z",
  },
  {
    id: "4",
    type: "notification",
    title: "Recovery notice sent via SMS",
    detail: "Sent to +92 300 1234567.",
    project: "api-gateway-service",
    timestamp: "2026-08-20T09:51:05Z",
  },
  {
    id: "5",
    type: "domain",
    title: "Domain expiring soon",
    detail: "vigil-status.dev expires in 27 days.",
    timestamp: "2026-08-20T06:00:00Z",
  },
  {
    id: "6",
    type: "project_created",
    title: "Project created",
    detail: "New project added to monitoring.",
    project: "auth-service",
    timestamp: "2026-08-19T18:12:00Z",
  },
  {
    id: "7",
    type: "settings",
    title: "Check interval updated",
    detail: "Changed from 5 min to 1 min.",
    project: "auth-service",
    timestamp: "2026-08-19T18:14:00Z",
  },
  {
    id: "8",
    type: "check_up",
    title: "Health check passed",
    detail: "Response time 98ms.",
    project: "dashboard-frontend",
    timestamp: "2026-08-19T12:00:00Z",
  },
  {
    id: "9",
    type: "project_deleted",
    title: "Project removed",
    detail: "Monitoring stopped for staging-worker.",
    timestamp: "2026-08-18T15:30:00Z",
  },
];

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = ACTIVITY.filter((item) => {
    const filter = FILTERS.find((f) => f.id === activeFilter);
    if (!filter || !filter.types) return true;
    return filter.types.includes(item.type);
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900">Activity</h1>
        <p className="mt-2 text-gray-500">
          A record of every check, alert, and change across your projects.
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-gray-200 py-16 text-center">
              <p className="text-gray-500">No activity in this category yet.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-200" />
              <ul className="flex flex-col gap-1">
                {filtered.map((item) => {
                  const meta = TYPE_META[item.type];
                  const Icon = meta.icon;
                  return (
                    <li key={item.id} className="relative flex gap-4 py-3">
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.bg}`}
                      >
                        <Icon size={17} className={meta.color} />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <span className="shrink-0 text-xs text-gray-400 font-mono">
                            {relativeTime(item.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{item.detail}</p>
                        {item.project && (
                          <span className="inline-block mt-1.5 rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">
                            {item.project}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}