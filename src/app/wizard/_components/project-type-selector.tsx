'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, Library, Package, Trophy } from 'lucide-react';
import type { ProjectType } from '../types';

interface ProjectTypeSelectorProps {
  onSelect: (type: ProjectType) => void;
}

const projectTypes = [
  { type: 'standard' as ProjectType, title: 'Standard Project', icon: Package, description: 'For general-purpose applications and websites.' },
  { type: 'challenge' as ProjectType, title: 'Challenge / Daily Project', icon: Trophy, description: 'For #100DaysOfCode, LeetCode, and daily coding challenges.' },
  { type: 'library' as ProjectType, title: 'Library / Package', icon: Library, description: 'For reusable libraries, packages, or frameworks.' },
  { type: 'devops' as ProjectType, title: 'DevOps / Script', icon: Container, description: 'For infrastructure, CI/CD scripts, and automation tools.' },
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
        {projectTypes.map(({ type, title, icon: Icon, description }) => (
          <Card
            key={type}
            onClick={() => onSelect(type)}
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(type)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
