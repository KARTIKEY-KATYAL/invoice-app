import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, requiredMark, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-sm mb-2 font-medium tracking-tight text-neutral-200", className)}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {requiredMark && <span className="text-red-400 ml-1">*</span>}
      </span>
    </label>
  )
)
Label.displayName = "Label"

export default Label
