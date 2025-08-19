import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const AuthLayout: React.FC<{children: React.ReactNode, right?: React.ReactNode, action?: React.ReactNode}> = ({children, right, action}) => {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 flex flex-col">
      <header className="h-14 flex items-center justify-between px-8 border-b border-white/10">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="bg-white text-black w-8 h-8 rounded inline-flex items-center justify-center font-bold">⟪⟫</span>
          <div className="leading-tight">
            <div>levitation</div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-400">infotech</div>
          </div>
        </div>
        {action}
      </header>
      <main className="flex-1 flex flex-col lg:flex-row px-8 py-8 gap-10 max-w-[1400px] mx-auto w-full">
        <div className="flex-1 flex flex-col max-w-xl">
          {children}
        </div>
        {right && <div className="flex-1 flex items-center justify-center">{right}</div>}
      </main>
      <footer className="text-center text-xs py-4 text-neutral-500">© {new Date().getFullYear()} Levitation Infotech</footer>
    </div>
  )
}

export const TopLoginButton = () => (
  <Button asChild className="bg-lime-300 text-black hover:bg-lime-300/90 h-8 px-6 text-xs font-medium rounded-sm">
    <Link to="/login">Login</Link>
  </Button>
)

export const TopLogoutButton: React.FC<{onClick: () => void}> = ({onClick}) => (
  <Button onClick={onClick} className="bg-lime-300 text-black hover:bg-lime-300/90 h-8 px-6 text-xs font-medium rounded-sm">Logout</Button>
)
