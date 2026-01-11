import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Logo />
        </div>
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                How it works
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
