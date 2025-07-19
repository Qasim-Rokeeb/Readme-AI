'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, Library, Package, Trophy } from 'lucide-react';
import type { ProjectType } from '../types';

interface ProjectTypeSelectorProps {
  onSelect: (type: ProjectType) => void;
}

const projectTypes = [
  { type: 'standard' as ProjectType, title: 'Standard Project', icon: Package },
  { type: 'challenge' as ProjectType, title: 'Challenge / Daily Project', icon: Trophy },
  { type: 'library' as ProjectType, title: 'Library / Package', icon: Library },
  { type: 'devops' as ProjectType, title: 'DevOps / Script', icon: Container },
];

export function ProjectTypeSelector({ onSelect }: ProjectTypeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Select your project type</h2>
        <p className="text-muted-foreground mt-2">
          This helps us tailor the perfect README for your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectTypes.map(({ type, title, icon: Icon }) => (
          <Card
            key={type}
            onClick={() => onSelect(type)}
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(type)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Icon className="w-8 h-8 text-primary" />
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {type === 'standard' && 'For general-purpose applications and websites.'}
                {type === 'challenge' && 'For #100DaysOfCode, LeetCode solutions, and daily coding challenges.'}
                {type === 'library' && 'For reusable libraries, packages, or frameworks.'}
                {type === 'devops' && 'For infrastructure as code, CI/CD scripts, and automation tools.'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
