import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
             <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
               <FileText className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
            Create beautiful READMEs in one breath.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Turn your project details into publication-ready documentation. A guided, GitHub-native experience to make docs delightful.
          </p>
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="/wizard">Get Started for Free</Link>
          </Button>
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Built by developers, for developers.</p>
      </footer>
    </div>
  );
}
