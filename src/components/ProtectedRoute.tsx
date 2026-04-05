import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-medium tracking-tighter">
              Pendiente de aprobación
            </h1>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Tu cuenta está registrada pero aún no ha sido aprobada por un administrador. 
              Vuelve a intentar más tarde.
            </p>
          </div>
          <Button variant="outline" className="rounded-full px-6 h-11 text-sm" onClick={signOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
