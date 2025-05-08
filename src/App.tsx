
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import NotFound from "./pages/NotFound";

// Dashboard
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AgendaPage from "./pages/dashboard/AgendaPage";
import ClientesPage from "./pages/dashboard/ClientesPage";
import ServicosPage from "./pages/dashboard/ServicosPage";
import ConfiguracoesPage from "./pages/dashboard/ConfiguracoesPage";
import RelatoriosPage from "./pages/dashboard/RelatoriosPage";
import LinkAgendamentoPage from "./pages/dashboard/LinkAgendamentoPage";

// Agendamento Público
import AgendamentoPublicoPage from "./pages/agenda/AgendamentoPublicoPage";

// Protected route component
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OnboardingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Redirect from homepage to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Agendamento público */}
            <Route path="/agenda/agendar/:linkId?" element={<AgendamentoPublicoPage />} />
            <Route path="/agenda/preview" element={<AgendamentoPublicoPage />} />
            
            {/* Protected routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } />
            
            {/* Dashboard routes */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/agenda" element={<AgendaPage />} />
              <Route path="/dashboard/clientes" element={<ClientesPage />} />
              <Route path="/dashboard/servicos" element={<ServicosPage />} />
              <Route path="/dashboard/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/dashboard/relatorios" element={<RelatoriosPage />} />
              <Route path="/dashboard/link-agendamento" element={<LinkAgendamentoPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </OnboardingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
