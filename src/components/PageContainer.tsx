
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main className={cn("container mx-auto px-4 py-8 max-w-7xl", className)}>
      {children}
    </main>
  );
};

export default PageContainer;
