
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Scissors, 
  MessageSquare, 
  BarChart, 
  Settings,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart className="h-5 w-5" />
  },
  {
    title: "Agenda",
    href: "/dashboard/agenda",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Serviços",
    href: "/dashboard/servicos",
    icon: <Scissors className="h-5 w-5" />
  },
  {
    title: "Mensagens",
    href: "/dashboard/mensagens",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: "Relatórios",
    href: "/dashboard/relatorios",
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "Link de Agendamento",
    href: "/dashboard/link-agendamento",
    icon: <LinkIcon className="h-5 w-5" />
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: <Settings className="h-5 w-5" />
  }
];

export const NavLinks = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            location.pathname === item.href || 
            (item.href !== "/dashboard" && location.pathname.startsWith(item.href))
              ? "bg-brand-100 text-brand-600 hover:bg-brand-200" 
              : "text-gray-600 hover:bg-brand-50 hover:text-brand-600"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
