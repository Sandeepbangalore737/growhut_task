"use client";

import * as React from 'react';

export function Sheet({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, { isOpen, setIsOpen })
      )}
    </div>
  );
}

export function SheetTrigger({ children, asChild, setIsOpen }: { children: React.ReactNode; asChild?: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return <div onClick={() => setIsOpen(true)}>{children}</div>;
}

export function SheetContent({ children, isOpen, setIsOpen }: { children: React.ReactNode; isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-80 shadow-lg p-4`}
    >
      <button onClick={() => setIsOpen(false)} className="text-right text-gray-500 hover:text-gray-900">
        Close
      </button>
      {children}
    </div>
  );
}
