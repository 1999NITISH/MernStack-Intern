"use client";
import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function PasswordInput({ label, error, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1 relative">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        type={show ? "text" : "password"}
        className={cn(
          "w-full rounded-xl border px-4 py-2 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
