import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={cn("relative", error && "has-[input]:[&>div]:border-destructive")}>
        <div className={cn(
          "flex items-center gap-2 rounded-lg border bg-neutral-900/80 border-neutral-700 focus-within:border-lime-300/50 focus-within:ring-1 focus-within:ring-lime-300/20 transition-all duration-200 backdrop-blur-sm",
          error && "border-destructive/70 focus-within:border-destructive focus-within:ring-destructive/20",
          (startIcon || endIcon) && "pl-3 pr-2",
          !startIcon && "pl-0",
          className
        )}>
          {startIcon && <span className="text-neutral-400 size-4 flex items-center justify-center">{startIcon}</span>}
          <input
            type={type}
            className={cn(
              "w-full bg-transparent h-12 px-4 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-100",
              startIcon && "pl-0",
              endIcon && "pr-0"
            )}
            ref={ref}
            {...props}
          />
          {endIcon && <span className="text-neutral-400 size-4 flex items-center justify-center">{endIcon}</span>}
        </div>
        {error && typeof error === 'string' && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export default Input
