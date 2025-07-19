'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, GitBranchPlus, Loader2, Wand2 } from 'lucide-react';
import type { ProjectType } from '../types';
import { readmeFormSchema } from '../form-schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface DetailsFormProps {
  projectType: ProjectType;
  onSubmit: (values: z.infer<typeof readmeFormSchema>) => void;
  onBack: () => void;
  isLoading: boolean;
}

type AppType = 'frontend' | 'backend' | 'fullstack';

const techOptions = {
  frontend: ['React', 'Next.js', 'Vue', 'Svelte', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'jQuery'],
  backend: ['Node.js', 'Python', 'Go', 'Rust', 'Java', 'PHP', 'Ruby', 'Express.js', 'Django', 'Flask', 'Spring Boot'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Jenkins', 'Terraform'],
};

const licenseOptions = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Unlicense', 'Other'];

export function DetailsForm({ projectType, onSubmit, onBack, isLoading }: DetailsFormProps) {
  const [appType, setAppType] = useState<AppType>('fullstack');

  const form = useForm<z.infer<typeof readmeFormSchema>>({
    resolver: zodResolver(readmeFormSchema),
    defaultValues: {
      projectName: '',
      projectDescription: '',
      projectUrl: '',
      installationMethod: 'npm install',
      techStack: [],
      license: 'MIT',
      includeIcons: false,
      challengeDay: projectType === 'challenge' ? 1 : undefined,
      challengeTitle: '',
      challengeLink: '',
      challengeNotes: '',
      appType: 'fullstack',
    },
  });

  const handleAppTypeChange = (value: AppType) => {
    setAppType(value);
    form.setValue('appType', value);
  };
  
  const getTechOptions = () => {
    switch (appType) {
      case 'frontend':
        return { Frontend: techOptions.frontend };
      case 'backend':
        return { Backend: techOptions.backend, Database: techOptions.database, DevOps: techOptions.devops };
      case 'fullstack':
        return { Frontend: techOptions.frontend, Backend: techOptions.backend, Database: techOptions.database, DevOps: techOptions.devops };
      default:
        return {};
    }
  };

  const visibleTechOptions = getTechOptions();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Tell us about your project</h2>
        <p className="text-muted-foreground mt-2">
          The more details you provide, the better your AI-generated README will be.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>The essential details about your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe what your project does, who it's for, and why it's useful." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <GitBranchPlus className="mr-2 h-4 w-4" /> Project URL (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {projectType === 'challenge' && (
            <Card>
              <CardHeader>
                <CardTitle>Challenge Details</CardTitle>
                <CardDescription>Specifics about the coding challenge you completed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="challengeDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day Number</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="42" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="challengeTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., #100DaysOfCode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="challengeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Link (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/challenge" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="challengeNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reflection / Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What did you learn? What were the key challenges?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
              <CardDescription>Specify the technologies and setup for your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <FormField
                control={form.control}
                name="appType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Application Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={handleAppTypeChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="frontend" />
                          </FormControl>
                          <FormLabel className="font-normal">Frontend</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="backend" />
                          </FormControl>
                          <FormLabel className="font-normal">Backend</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fullstack" />
                          </FormControl>
                          <FormLabel className="font-normal">Fullstack</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="techStack"
                render={() => (
                  <FormItem>
                    <FormLabel>Tech Stack</FormLabel>
                    <FormDescription>Select the main technologies used in your project.</FormDescription>
                    <div className="space-y-4">
                      {Object.entries(visibleTechOptions).map(([category, techs]) => (
                        <div key={category}>
                          <h4 className="font-medium mb-2">{category}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {techs.map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="techStack"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item])
                                              : field.onChange(field.value?.filter((value) => value !== item));
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{item}</FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="installationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation Command</FormLabel>
                    <FormControl>
                      <Input placeholder="npm install && npm start" {...field} />
                    </FormControl>
                    <FormDescription>Provide the command(s) to install dependencies and run the project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {licenseOptions.map(license => (
                            <SelectItem key={license} value={license}>{license}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="includeIcons"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2 sm:mt-0">
                      <div className="space-y-0.5">
                        <FormLabel>Include Icons?</FormLabel>
                        <FormDescription>
                          Add 🔗 and 🌐 to links.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-5 w-5" />
              )}
              Generate README
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
