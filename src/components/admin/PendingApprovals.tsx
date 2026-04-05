import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationRequest {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  status: string;
  created_at: string;
}

const PendingApprovals = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["registration-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registration_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as RegistrationRequest[];
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (request: RegistrationRequest) => {
      // Add admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: request.user_id, role: "admin" });
      if (roleError) throw roleError;

      // Update request status
      const { error: updateError } = await supabase
        .from("registration_requests")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", request.id);
      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration-requests"] });
      toast({ title: "Usuario aprobado", description: "El usuario ahora tiene acceso de administrador." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo aprobar al usuario.", variant: "destructive" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from("registration_requests")
        .update({ status: "rejected", reviewed_at: new Date().toISOString() })
        .eq("id", requestId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration-requests"] });
      toast({ title: "Solicitud rechazada" });
    },
  });

  const pending = requests?.filter((r) => r.status === "pending") || [];
  const processed = requests?.filter((r) => r.status !== "pending") || [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
          <Users className="h-4 w-4 text-foreground/60" />
        </div>
        <h2 className="text-lg font-heading font-medium tracking-tight">Solicitudes de acceso</h2>
        {pending.length > 0 && (
          <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
            {pending.length} pendiente{pending.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {pending.length === 0 && processed.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">No hay solicitudes de acceso</p>
      ) : (
        <div className="space-y-2">
          {pending.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100"
            >
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{req.full_name || "Sin nombre"}</p>
                <p className="text-xs text-muted-foreground truncate">{req.email}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  onClick={() => approveMutation.mutate(req)}
                  disabled={approveMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => rejectMutation.mutate(req.id)}
                  disabled={rejectMutation.isPending}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {processed.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                req.status === "approved" ? "bg-emerald-50" : "bg-destructive/10"
              }`}>
                {req.status === "approved" ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{req.full_name || "Sin nombre"}</p>
                <p className="text-xs text-muted-foreground truncate">{req.email}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                req.status === "approved"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-destructive/10 text-destructive"
              }`}>
                {req.status === "approved" ? "Aprobado" : "Rechazado"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
