
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Settings, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Bell,
  ChartBar,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsedSidebar: boolean;
}

const NavItem = ({ href, icon, label, isActive, collapsedSidebar }: NavItemProps) => {
  return (
    <Link to={href}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsedSidebar ? "justify-center px-2" : "px-4",
                isActive
                  ? "bg-brand-100 text-brand-600 hover:bg-brand-200 hover:text-brand-600"
                  : "text-gray-600 hover:text-brand-600 hover:bg-brand-50"
              )}
            >
              {icon}
              {!collapsedSidebar && <span className="ml-2">{label}</span>}
            </Button>
          </TooltipTrigger>
          {collapsedSidebar && (
            <TooltipContent side="right">
              {label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

const DashboardLayout = () => {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigation = [
    { href: '/dashboard', icon: <ChartBar className="h-5 w-5" />, label: 'Visão Geral' },
    { href: '/dashboard/agenda', icon: <Calendar className="h-5 w-5" />, label: 'Agenda' },
    { href: '/dashboard/clientes', icon: <Users className="h-5 w-5" />, label: 'Clientes' },
    { href: '/dashboard/servicos', icon: <Clock className="h-5 w-5" />, label: 'Serviços' },
    { href: '/dashboard/mensagens', icon: <MessageSquare className="h-5 w-5" />, label: 'Mensagens' },
    { href: '/dashboard/configuracoes', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
  ];

  const toggleSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
          collapsedSidebar ? "w-16" : "w-64",
          isMobile ? "hidden" : "block"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            {!collapsedSidebar && <Logo size="sm" />}
            <button
              onClick={toggleSidebar}
              className={cn(
                "p-1.5 rounded-lg text-gray-500 hover:bg-gray-100",
                collapsedSidebar && "mx-auto"
              )}
            >
              {collapsedSidebar ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto py-4 px-2">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href}
                  collapsedSidebar={collapsedSidebar}
                />
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-200">
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className={cn(
                        "w-full text-gray-600 hover:text-red-600 hover:bg-red-50",
                        collapsedSidebar ? "justify-center px-2" : "justify-start px-4"
                      )}
                    >
                      <LogOut className="h-5 w-5" />
                      {!collapsedSidebar && <span className="ml-2">Sair</span>}
                    </Button>
                  </TooltipTrigger>
                  {collapsedSidebar && (
                    <TooltipContent side="right">
                      Sair
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : (collapsedSidebar ? "ml-16" : "ml-64")
        )}
      >
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4">
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-4"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-bold">
              {navigation.find((item) => item.href === pathname)?.label || "Visão Geral"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {currentUser?.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="font-medium text-sm">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">Professional</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white">
              <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                <Logo size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          pathname === item.href
                            ? "bg-brand-100 text-brand-600 hover:bg-brand-200 hover:text-brand-600"
                            : "text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                        )}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-2">Sair</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
