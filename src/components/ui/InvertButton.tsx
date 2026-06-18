"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type InvertButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const InvertButton = forwardRef<HTMLButtonElement, InvertButtonProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`group relative inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-tight font-medium text-[#1E3A8A] border border-[#1E3A8A]/25 rounded-full overflow-hidden transition-colors duration-300 hover:text-white disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...rest}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[#1E3A8A] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
        <span className="relative">{children}</span>
      </button>
    );
  }
);

InvertButton.displayName = "InvertButton";
export default InvertButton;
