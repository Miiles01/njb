import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const useContactSubmissions = () =>
  useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as any[];
    },
    refetchInterval: 30_000,
  });

const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora";
  if (mins < 60) return `Hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
};

const ContactSubmissions = () => {
  const { data: submissions, isLoading } = useContactSubmissions();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Mail className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-heading font-medium tracking-tight flex-1">
          Mensajes de contacto
        </h2>
        <span className="text-xs text-muted-foreground">
          {submissions?.length ?? 0} mensajes
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : !submissions?.length ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No hay mensajes aún
            </p>
          ) : (
            <div className="space-y-2">
              {submissions.map((sub: any) => (
                <div
                  key={sub.id}
                  className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium truncate">{sub.email}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(sub.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {sub.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactSubmissions;
