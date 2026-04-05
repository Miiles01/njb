import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowLeft, UserPlus } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: requestError } = await supabase
        .from("registration_requests")
        .insert({
          user_id: data.user.id,
          email,
          full_name: fullName,
          status: "pending",
        });

      if (requestError) {
        setError("Error al enviar solicitud. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      // Sign out immediately — they need approval first
      await supabase.auth.signOut();
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-medium tracking-tighter">
              Solicitud enviada
            </h1>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Tu registro está pendiente de aprobación por un administrador.
              Recibirás acceso una vez que sea aprobado.
            </p>
          </div>
          <Link to="/login">
            <Button variant="outline" className="rounded-full px-6 h-11 text-sm gap-2 mt-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
            <UserPlus className="h-5 w-5 text-foreground/70" />
          </div>
          <h1 className="text-3xl font-heading font-medium tracking-tighter">
            Crear cuenta
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Solicita acceso al panel de administración
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <Input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-1"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-1"
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-1"
          />
          {error && (
            <p className="text-sm text-destructive px-1">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-sm font-medium"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Solicitar acceso"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
