"use client";


import * as React from 'react';
import clsx from 'clsx';

export function Tabs({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, { activeTab, handleTabClick })
      )}
    </div>
  );
}

export function TabsList({
  children,
  className,
  activeTab,
  handleTabClick,
}: {
  children: React.ReactNode;
  className?: string;
  activeTab: string;
  handleTabClick: (value: string) => void;
}) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  className,
  activeTab,
  handleTabClick,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab: string;
  handleTabClick: (value: string) => void;
}) {
  const isActive = value === activeTab;

  return (
    <button
      onClick={() => handleTabClick(value)}
      className={clsx(className, {
        'bg-blue-500 text-gray-900': isActive,
        'bg-gray-100 text-gray-400': !isActive,
      })}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  children,
  className,
  value,
  activeTab,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
  activeTab: string;
}) {
  if (value !== activeTab) return null; // Render content only for active tab

  return <div className={className}>{children}</div>;
}
