import { z } from 'zod';

export const readmeFormSchema = z.object({
  projectName: z.string().min(2, {
    message: 'Project name must be at least 2 characters.',
  }),
  projectDescription: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  techStack: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  installationMethod: z.string().min(3, {
    message: 'Installation method must be at least 3 characters.',
  }),
  license: z.string(),
  challengeDay: z.number().optional(),
  challengeTitle: z.string().optional(),
  challengeLink: z.string().url().optional().or(z.literal('')),
  challengeNotes: z.string().optional(),
});
