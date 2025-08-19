import * as React from 'react'
import loginImage from '@/assets/loginimage.png'
import signupImage from '@/assets/signupimage.png'
import { cn } from '@/lib/utils'

export const RightImage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const src = type === 'login' ? loginImage : signupImage
  return (
    <div className={cn(
      'w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden ring-1 ring-white/10 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_35px_70px_rgba(0,0,0,0.5)] transition-all duration-500 hover:ring-white/20'
    )}>
      <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
    </div>
  )
}

export default RightImage
