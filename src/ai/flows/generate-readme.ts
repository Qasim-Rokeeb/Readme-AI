'use server';

/**
 * @fileOverview Generates a README.md file based on project details provided by the user.
 *
 * - generateReadme - A function that generates the README content.
 * - GenerateReadmeInput - The input type for the generateReadme function.
 * - GenerateReadmeOutput - The return type for the generateReadme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReadmeInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A detailed description of the project.'),
  techStack: z.array(z.string()).describe('An array of technologies used in the project.'),
  installationMethod: z.string().describe('The installation method for the project (e.g., npm, pip, docker).'),
  license: z.string().describe('The license under which the project is distributed.'),
  challengeDay: z.number().optional().describe('The day number of the coding challenge, if applicable.'),
  challengeTitle: z.string().optional().describe('The title of the coding challenge, if applicable.'),
  challengeLink: z.string().optional().describe('A link to the coding challenge, if applicable.'),
  challengeNotes: z.string().optional().describe('Any notes or reflections on the coding challenge.'),
  template: z.string().describe('The template to use for generating the README.'),
});

export type GenerateReadmeInput = z.infer<typeof GenerateReadmeInputSchema>;

const GenerateReadmeOutputSchema = z.object({
  readmeContent: z.string().describe('The generated README.md content in Markdown format.'),
});

export type GenerateReadmeOutput = z.infer<typeof GenerateReadmeOutputSchema>;

export async function generateReadme(input: GenerateReadmeInput): Promise<GenerateReadmeOutput> {
  return generateReadmeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReadmePrompt',
  input: {schema: GenerateReadmeInputSchema},
  output: {schema: GenerateReadmeOutputSchema},
  prompt: `You are a documentation expert. Generate a comprehensive README.md file for a project, using the provided information and template. The README should include sections for project description, installation, usage, license, and any specific details related to challenges, if applicable.

Project Name: {{{projectName}}}
Description: {{{projectDescription}}}
Tech Stack: {{#each techStack}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Installation: {{{installationMethod}}}
License: {{{license}}}

{{#if challengeDay}}
Challenge Day: {{{challengeDay}}}
Challenge Title: {{{challengeTitle}}}
Challenge Link: {{{challengeLink}}}
Challenge Notes: {{{challengeNotes}}}
{{/if}}

Template: {{{template}}}
`,
});

const generateReadmeFlow = ai.defineFlow(
  {
    name: 'generateReadmeFlow',
    inputSchema: GenerateReadmeInputSchema,
    outputSchema: GenerateReadmeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
