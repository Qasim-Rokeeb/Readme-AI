import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainNav } from '@/components/main-nav';
import { FileText, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="mx-auto bg-blue-600 text-white p-5 rounded-2xl w-fit shadow-lg">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
              Create Beautiful READMEs in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              We are the connection layer that brings ideas, talent, and opportunity together. A global space where creators and contributors collaborate, create value, and build documentation seamlessly with AI.
            </p>
            <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/wizard">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Purpose Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center space-y-4 p-8">
                <div className="mx-auto bg-blue-600 text-white p-4 rounded-2xl w-fit">
                  <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Purpose</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Empowering developers to create professional documentation effortlessly, enabling creative and innovative collaboration powered by AI-driven assistance.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Vision Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center space-y-4 p-8">
                <div className="mx-auto bg-blue-600 text-white p-4 rounded-2xl w-fit">
                  <Zap className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Becoming the go-to platform for README generation, a global network where millions create, collaborate, and publish documentation through intelligent automation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Mission Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center space-y-4 p-8">
                <div className="mx-auto bg-blue-600 text-white p-4 rounded-2xl w-fit">
                  <Shield className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Building the world's most seamless documentation experience that empowers creators to ship faster and contributors to understand projects globally with ease.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Turn your project details into publication-ready documentation. A guided, GitHub-native experience to make docs delightful.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold">Input Details</h3>
                <p className="text-muted-foreground">
                  Provide your project information through our intuitive wizard interface.
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold">AI Generation</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your input and generates professional documentation.
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold">Export & Share</h3>
                <p className="text-muted-foreground">
                  Download your README and share it with the world instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">About README-AI</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Built by developers, for developers. We understand the importance of great documentation and the time it takes to create it. That's why we've built README-AI - to help you focus on building great software while we handle the documentation.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Built with ❤️ by developers, for developers.</p>
        </div>
      </footer>
    </div>
  );
}
