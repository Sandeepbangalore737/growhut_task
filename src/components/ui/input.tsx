import * as React from 'react';

export function Input({ id, placeholder, className }: { id?: string; placeholder?: string; className?: string }) {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
