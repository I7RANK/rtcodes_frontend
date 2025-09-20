import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "rounded-sm px-4 py-1 text-sm transition-colors disabled:opacity-50";

  const variants = {
    primary: "bg-sky-900 text-white active:bg-sky-800",
    secondary: "bg-white text-sky-900 border border-sky-900 active:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
