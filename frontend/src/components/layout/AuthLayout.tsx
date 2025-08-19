import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// reverse: puts the `right` slot BEFORE the children on large screens (used for Login page to match design)
export const AuthLayout: React.FC<{children: React.ReactNode, right?: React.ReactNode, action?: React.ReactNode, reverse?: boolean}> = ({children, right, action, reverse}) => {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 flex flex-col relative overflow-hidden">
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/10 backdrop-blur-sm bg-neutral-950/80 sticky top-0 z-10">
        <div className="flex items-center gap-3 font-semibold text-lg">
          <span className="bg-white text-black w-10 h-10 rounded-lg inline-flex items-center justify-center font-bold text-lg shadow-lg">⟪⟫</span>
          <div className="leading-tight">
            <div className="text-lg">levitation</div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-400 -mt-1">infotech</div>
          </div>
        </div>
        {action}
      </header>
      <main className={"flex-1 flex flex-col " + (reverse ? 'lg:flex-row-reverse' : 'lg:flex-row') + " px-4 sm:px-8 py-8 sm:py-10 gap-8 sm:gap-12 max-w-[1400px] mx-auto w-full"}>
        {/* Decorative gradient glows (reduced on mobile) */}
        <div aria-hidden className="absolute left-4 sm:left-12 top-40 sm:top-28 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-gradient-to-br from-lime-500/10 via-lime-600/5 to-transparent blur-[70px] sm:blur-[60px] opacity-60 pointer-events-none -z-10" />
        <div aria-hidden className="absolute right-4 sm:right-12 bottom-24 sm:bottom-28 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] rounded-full bg-gradient-to-tl from-blue-500/10 via-purple-600/5 to-transparent blur-[60px] sm:blur-[40px] opacity-40 pointer-events-none -z-10" />

        <div className="flex-1 flex flex-col max-w-2xl order-2 lg:order-none">
          {children}
        </div>
        {right && <div className="flex-1 flex items-center justify-center lg:justify-end order-1 lg:order-none mb-10 lg:mb-0">{right}</div>}
      </main>
      <footer className="mt-auto text-center text-[10px] sm:text-xs py-4 sm:py-6 text-neutral-500 border-t border-white/5 px-4">
        © {new Date().getFullYear()} Levitation Infotech. All rights reserved.
      </footer>
    </div>
  )
}

export const TopLoginButton = () => (
  <Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-9 px-6 text-sm font-medium rounded-lg transition-all hover:shadow-lg">
    <Link to="/login">Login</Link>
  </Button>
)

export const TopLogoutButton: React.FC<{onClick: () => void}> = ({onClick}) => (
  <Button onClick={onClick} className="bg-lime-300 text-black hover:bg-lime-300/90 h-9 px-6 text-sm font-medium rounded-lg transition-all hover:shadow-lg">
    Logout
  </Button>
)
