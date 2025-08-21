import React from 'react'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  withText?: boolean
  size?: number
  className?: string
  textClassName?: string
}

/**
 * BrandLogo renders the company logo (from /public/logo.png) optionally with the two-line text lockup.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ withText = true, size = 40, className, textClassName }) => {
  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <img
        src="/logo.png"
        width={size}
        height={size}
        alt="Levitation Infotech logo"
        className={cn('object-contain', `w-[${size}px] h-[${size}px]`)}
        style={{ width: size, height: size }}
        draggable={false}
      />
      {withText && (
        <div className={cn('leading-tight', textClassName)}>
          <div className="text-lg font-semibold tracking-wide">levitation</div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 -mt-0.5">infotech</div>
        </div>
      )}
    </div>
  )
}

export default BrandLogo
