"use client";


import * as React from 'react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => 
        React.cloneElement(child as React.ReactElement, { isOpen, toggleDropdown, closeDropdown })
      )}
    </div>
  );
}

export function DropdownMenuTrigger({
  children,
  toggleDropdown,
  asChild,
}: {
  children: React.ReactNode;
  toggleDropdown: () => void;
  asChild?: boolean;
}) {
  return <div onClick={toggleDropdown}>{children}</div>;
}

export function DropdownMenuContent({
  children,
  isOpen,
  closeDropdown,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  closeDropdown: () => void;
}) {
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target || !(event.target as HTMLElement).closest('.relative')) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, closeDropdown]);

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onSelect,
  closeDropdown,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  closeDropdown: () => void;
}) {
  const handleSelect = () => {
    if (onSelect) onSelect();
    closeDropdown();
  };

  return (
    <button
      onClick={handleSelect}
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-2 text-sm font-medium text-gray-500">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-200"></div>;
}
