import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventType = "page_view" | "project_click" | "contact_form_submit";

export const useAnalytics = () => {
  const track = useCallback(
    async (
      eventType: EventType,
      data?: { pagePath?: string; projectSlug?: string; metadata?: Record<string, any> }
    ) => {
      try {
        await supabase.from("analytics_events" as any).insert({
          event_type: eventType,
          page_path: data?.pagePath ?? window.location.pathname,
          project_slug: data?.projectSlug ?? null,
          metadata: data?.metadata ?? {},
        });
      } catch {
        // Silent fail — analytics should never break UX
      }
    },
    []
  );

  return { track };
};
