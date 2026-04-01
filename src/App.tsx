import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Trabajo from "./pages/Trabajo.tsx";
import Contacto from "./pages/Contacto.tsx";
import Proyecto from "./pages/Proyecto.tsx";
import NotFound from "./pages/NotFound.tsx";
import { SmoothScroll } from "./components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <SmoothScroll>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/trabajo" element={<Trabajo />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/proyecto/:slug" element={<Proyecto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SmoothScroll>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
