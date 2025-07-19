'use server';
/**
 * @fileOverview A flow to regenerate a specific section of a README file using AI.
 *
 * - regenerateReadmeSection - A function that regenerates a section of a README file.
 * - RegenerateReadmeSectionInput - The input type for the regenerateReadmeSection function.
 * - RegenerateReadmeSectionOutput - The return type for the regenerateReadmeSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateReadmeSectionInputSchema = z.object({
  readmeContent: z.string().describe('The complete content of the README file.'),
  sectionHeading: z.string().describe('The heading of the section to regenerate.'),
});
export type RegenerateReadmeSectionInput = z.infer<
  typeof RegenerateReadmeSectionInputSchema
>;

const RegenerateReadmeSectionOutputSchema = z.object({
  regeneratedSection: z.string().describe('The AI-regenerated content for the specified section.'),
  updatedReadmeContent: z
    .string()
    .describe('The complete content of the README file with the updated section.'),
});
export type RegenerateReadmeSectionOutput = z.infer<
  typeof RegenerateReadmeSectionOutputSchema
>;

export async function regenerateReadmeSection(
  input: RegenerateReadmeSectionInput
): Promise<RegenerateReadmeSectionOutput> {
  return regenerateReadmeSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateReadmeSectionPrompt',
  input: {schema: RegenerateReadmeSectionInputSchema},
  output: {schema: RegenerateReadmeSectionOutputSchema},
  prompt: `You are an AI assistant specializing in generating README files.

You will be given the content of a README file and a specific section heading.
Your task is to regenerate the content of that section, improving its clarity,
readability, and overall quality while maintaining the original purpose and style.

Here is the complete README content:
{{readmeContent}}

The section to regenerate is: {{sectionHeading}}

Please provide the regenerated content for the section and ensure it seamlessly
integrates with the rest of the README.

Ensure that the outputted "updatedReadmeContent" contains the "regeneratedSection" at the correct heading, and that the heading name is the same as the sectionHeading parameter.
`,
});

const regenerateReadmeSectionFlow = ai.defineFlow(
  {
    name: 'regenerateReadmeSectionFlow',
    inputSchema: RegenerateReadmeSectionInputSchema,
    outputSchema: RegenerateReadmeSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
