import * as React from "react"
import { cn } from "@/lib/utils"

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn("w-full caption-bottom text-sm border-collapse", className)} {...props} />
))
Table.displayName = "Table"

export const THead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
))
THead.displayName = "THead"

export const TBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
))
TBody.displayName = "TBody"

export const TRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("", className)} {...props} />
))
TRow.displayName = "TRow"

export const THeadCell = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("text-left font-semibold px-4 py-3 text-sm bg-white text-neutral-900", className)} {...props} />
))
THeadCell.displayName = "THeadCell"

export const TCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-4 py-3 text-sm", className)} {...props} />
))
TCell.displayName = "TCell"
