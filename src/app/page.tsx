import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Sparkles className="h-16 w-16 mx-auto text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
            Create a stunning README in 60 seconds.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Powered by AI, designed for developers. Stop wrestling with Markdown and start shipping.
          </p>
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="/wizard">Start Free</Link>
          </Button>
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Built by Firebase Studio.</p>
      </footer>
    </div>
  );
}
