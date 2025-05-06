
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";
import NavLinks from '@/components/dashboard/NavLinks';
import useMobile from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const isMobile = useMobile();

  return (
    <div className="flex min-h-screen">
      {/* Mobile navigation */}
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex lg:hidden absolute top-4 left-4 z-10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <div className="py-4 px-2">
                <Logo />
              </div>
              <div className="flex-1 overflow-auto py-2">
                <NavLinks />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="hidden lg:flex flex-col border-r w-64 p-4">
          <div className="py-4 px-2">
            <Logo />
          </div>
          <div className="flex-1 py-4">
            <NavLinks />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
