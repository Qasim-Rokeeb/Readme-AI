import { FileText } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <FileText className="w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold tracking-tight font-headline">README-AI</h1>
    </Link>
  );
}
