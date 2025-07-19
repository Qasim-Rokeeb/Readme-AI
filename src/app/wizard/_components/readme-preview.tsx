
'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Copy, Download, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadmePreviewProps {
  readme: string;
  onReadmeChange: (newReadme: string) => void;
  onRegenerate: (sectionHeading: string) => void;
  onRegenerateAll: () => void;
  onBack: () => void;
  isLoading: boolean;
  isRegeneratingAll: boolean;
}

export function ReadmePreview({ readme, onReadmeChange, onRegenerate, onRegenerateAll, onBack, isLoading, isRegeneratingAll }: ReadmePreviewProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    toast({
      title: 'Copied to clipboard!',
      description: 'The README content is ready to be pasted.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sections = useMemo(() => {
    const headingRegex = /^(## .*)$/gm;
    return readme.match(headingRegex) || [];
  }, [readme]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Your AI-Generated README is Ready!</h2>
        <p className="text-muted-foreground mt-2">
          Fine-tune the content in the editor. The preview on the right will update live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Editor</CardTitle>
                    <CardDescription>Live Markdown Editor</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={readme}
                onChange={(e) => onReadmeChange(e.target.value)}
                className="h-[60vh] font-code text-sm"
                placeholder="Your README.md content..."
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>Rendered output</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="prose dark:prose-invert max-w-none bg-muted rounded-md p-4 h-[40vh] overflow-y-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {readme}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>AI Actions</CardTitle>
                    <CardDescription>Improve sections with AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {sections.length > 0 ? sections.map((section, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-accent-foreground hover:text-accent-foreground"
                            onClick={() => onRegenerate(section.substring(3))}
                            disabled={isLoading || isRegeneratingAll}
                        >
                            {(isLoading && !isRegeneratingAll) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                            Regenerate "{section.substring(3)}"
                        </Button>
                    )) : <p className="text-sm text-muted-foreground">No sections found to regenerate.</p>}
                     <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={onRegenerateAll}
                        disabled={isRegeneratingAll || isLoading}
                    >
                        {isRegeneratingAll ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                        Regenerate All
                    </Button>
                </CardContent>
            </Card>
        </div>

      </div>

      <div className="mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Form
        </Button>
      </div>
    </div>
  );
}
