import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, MousePointerClick, Eye, Send } from "lucide-react";

interface AnalyticsStat {
  label: string;
  value: number;
  icon: React.ReactNode;
  detail?: string;
}

interface TopPage {
  page_path: string;
  count: number;
}

interface TopProject {
  project_slug: string;
  count: number;
}

const useAnalyticsData = () =>
  useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      // Fetch all events from last 30 days
      const { data: events, error } = await supabase
        .from("analytics_events" as any)
        .select("event_type, page_path, project_slug, created_at")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at", { ascending: false });

      if (error) throw error;
      const evts = (events ?? []) as any[];

      const pageViews = evts.filter((e) => e.event_type === "page_view");
      const projectClicks = evts.filter((e) => e.event_type === "project_click");
      const contactSubmits = evts.filter((e) => e.event_type === "contact_form_submit");

      // Top pages
      const pageCounts: Record<string, number> = {};
      pageViews.forEach((e) => {
        const p = e.page_path || "/";
        pageCounts[p] = (pageCounts[p] || 0) + 1;
      });
      const topPages: TopPage[] = Object.entries(pageCounts)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Top projects clicked
      const projCounts: Record<string, number> = {};
      projectClicks.forEach((e) => {
        const s = e.project_slug || "unknown";
        projCounts[s] = (projCounts[s] || 0) + 1;
      });
      const topProjects: TopProject[] = Object.entries(projCounts)
        .map(([project_slug, count]) => ({ project_slug, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        totalPageViews: pageViews.length,
        totalProjectClicks: projectClicks.length,
        totalContactSubmits: contactSubmits.length,
        topPages,
        topProjects,
      };
    },
    refetchInterval: 60_000,
  });

const PAGE_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/trabajo": "Trabajo",
  "/contacto": "Contacto",
  "/admin": "Admin",
};

const AnalyticsSection = () => {
  const { data, isLoading } = useAnalyticsData();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-heading font-medium tracking-tight">Estadísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats: AnalyticsStat[] = [
    {
      label: "Clics en proyectos",
      value: data.totalProjectClicks,
      icon: <MousePointerClick className="h-4 w-4" />,
      detail: "Ver detalle",
    },
    {
      label: "Formularios enviados",
      value: data.totalContactSubmits,
      icon: <Send className="h-4 w-4" />,
      detail: "Contacto",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-heading font-medium tracking-tight">Estadísticas</h2>
        <span className="text-xs text-muted-foreground ml-auto">Últimos 30 días</span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-muted/30 border border-border/50 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              {stat.icon}
              <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-3xl font-heading font-semibold tracking-tighter">{stat.value}</p>
            {stat.detail && (
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AnalyticsSection;
