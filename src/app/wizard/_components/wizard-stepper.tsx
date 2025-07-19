'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface WizardStepperProps {
  currentStep: number;
}

const steps = ['Select Type', 'Project Details', 'Preview & Edit'];

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <div className="mb-12">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step} className={cn('relative', stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '')}>
              {stepIdx < currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-primary" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{step}</span>
                  </div>
                </>
              ) : stepIdx === currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-border" />
                  </div>
                  <div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                    aria-current="step"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  </div>
                  <span className="absolute top-10 w-max -translate-x-1/2 text-center text-sm font-medium text-primary">{step}</span>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-border" />
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background">
                     <span className="sr-only">{step}</span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
