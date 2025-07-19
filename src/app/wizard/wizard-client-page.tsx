'use client';

import { useState } from 'react';
import type { z } from 'zod';
import { generateReadme } from '@/ai/flows/generate-readme';
import { regenerateReadmeSection } from '@/ai/flows/regenerate-readme-section';
import { useToast } from '@/hooks/use-toast';
import type { ProjectType } from './types';
import type { readmeFormSchema } from './form-schema';

import { ProjectTypeSelector } from './_components/project-type-selector';
import { DetailsForm } from './_components/details-form';
import { ReadmePreview } from './_components/readme-preview';
import { WizardStepper } from './_components/wizard-stepper';

type WizardStep = 'select_type' | 'details_form' | 'preview';

export default function WizardClientPage() {
  const [step, setStep] = useState<WizardStep>('select_type');
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [readmeContent, setReadmeContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSelectProjectType = (type: ProjectType) => {
    setProjectType(type);
    setStep('details_form');
  };

  const handleFormSubmit = async (values: z.infer<typeof readmeFormSchema>) => {
    setIsLoading(true);
    try {
      const input = {
        projectName: values.projectName,
        projectDescription: values.projectDescription,
        // projectUrl is now part of the form, but not in GenerateReadmeInput yet.
        // I will add it to the prompt later if needed. For now, it's collected.
        techStack: values.techStack,
        installationMethod: values.installationMethod,
        license: values.license,
        template: 'Classic', // Default template
        challengeDay: values.challengeDay,
        challengeTitle: values.challengeTitle,
        challengeLink: values.challengeLink,
        challengeNotes: values.challengeNotes,
      };
      const result = await generateReadme(input);
      setReadmeContent(result.readmeContent);
      setStep('preview');
    } catch (error) {
      console.error('Error generating README:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate README. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateSection = async (sectionHeading: string) => {
    setIsLoading(true);
    try {
      const result = await regenerateReadmeSection({
        readmeContent,
        sectionHeading,
      });
      setReadmeContent(result.updatedReadmeContent);
      toast({
        title: 'Section Regenerated',
        description: `The "${sectionHeading}" section has been updated.`,
      });
    } catch (error) {
      console.error('Error regenerating section:', error);
      toast({
        title: 'Error',
        description: 'Failed to regenerate section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBack = () => {
    if (step === 'preview') {
      setStep('details_form');
    } else if (step === 'details_form') {
      setStep('select_type');
    }
  };


  const currentStepIndex = step === 'select_type' ? 0 : step === 'details_form' ? 1 : 2;

  return (
    <div className="container mx-auto py-8 px-4">
      <WizardStepper currentStep={currentStepIndex} />
      
      {step === 'select_type' && (
        <ProjectTypeSelector onSelect={handleSelectProjectType} />
      )}
      
      {step === 'details_form' && projectType && (
        <DetailsForm
          projectType={projectType}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}

      {step === 'preview' && (
        <ReadmePreview
          readme={readmeContent}
          onReadmeChange={setReadmeContent}
          onRegenerate={handleRegenerateSection}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
