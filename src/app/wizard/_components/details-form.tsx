
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

const techOptions: Record<string, {name: string, icon: React.ReactNode}[]> = {
  frontend: [
    { name: 'React', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>React</title><path d="M31.441 15.659c.27.479.27 1.069 0 1.548l-4.185 7.425a1.196 1.196 0 01-1.04.598h-8.37l-2.09 3.708a1.196 1.196 0 01-1.04.598h-8.37c-.42 0-.81-.22-1.04-.598L.559 24.03a1.196 1.196 0 010-1.548L4.744 15.06a1.196 1.196 0 011.04-.598h8.37l2.09-3.708a1.196 1.196 0 011.04-.598h8.37c.42 0 .81.22 1.04.598l4.185 8.425zM22.99 15.659c0-4.08-3.3-7.38-7.38-7.38S8.23 11.58 8.23 15.66c0 4.08 3.3 7.38 7.38 7.38s7.38-3.3 7.38-7.38zM15.61 3.52c-6.84 0-12.42 5.58-12.42 12.42s5.58 12.42 12.42 12.42 12.42-5.58 12.42-12.42S22.45 3.52 15.61 3.52zm0 22.08c-5.34 0-9.66-4.32-9.66-9.66s4.32-9.66 9.66-9.66 9.66 4.32 9.66 9.66-4.32 9.66-9.66 9.66z" fill="#61DAFB"/></svg> },
    { name: 'Next.js', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path d="M15.408.064h1.184l9.016 15.664-9.016 15.648h-1.184L24.424.064zM2.392 31.376h1.184L22.4 1.488V.064h-1.12L2.392 31.376z" fill="#000000"/></svg> },
    { name: 'Vue', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Vue.js</title><path d="M19.199 4.8l-3.199 5.523-3.199-5.523h-12.8l16 27.2 16-27.2h-12.8zM.001 4.8l16 27.2 16-27.2h-6.4l-9.6 16.606-9.6-16.606h-6.4z" fill="#4FC08D"/></svg> },
    { name: 'Svelte', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Svelte</title><path d="M22.848 3.125c-.244-.02-.49-.03-.736-.03-2.616 0-4.996 1.109-6.613 2.87-2.32 2.53-3.69 5.922-3.69 9.638 0 .54.045 1.07.13 1.587l-7.394 4.143c-.708-.948-1.298-2.02-1.745-3.178-.718-1.859-1.09-3.87-1.09-5.962C1.72 5.57 6.131 1.157 12.396 1.157c.54 0 1.07.045 1.587.13L9.84 8.682c-.948-.708-2.02-1.298-3.178-1.745-1.859-.718-3.87-1.09-5.962-1.09-6.524 0-11.817 5.293-11.817 11.817s5.293 11.817 11.817 11.817c2.616 0 4.996-1.109 6.613-2.87 2.32-2.53 3.69-5.922 3.69-9.638 0-.54-.045-1.07-.13-1.587l7.394-4.143c.708.948 1.298 2.02 1.745 3.178.718 1.859 1.09 3.87 1.09 5.962 0 6.524-5.293 11.817-11.817 11.817s-11.817-5.293-11.817-11.817c0-.54.045-1.07.13-1.587l4.143-7.394c.948.708 2.02 1.298 3.178 1.745 1.859.718 3.87 1.09 5.962 1.09 6.524 0 11.817-5.293 11.817-11.817S25.337 3.125 22.848 3.125z" fill="#FF3E00"/></svg> },
    { name: 'Angular', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Angular</title><path d="M15.91 4.4l10.33 2.1L28 20.6l-12.09 7-12.09-7L2.24 6.5l10.33-2.1L16 2.3zm0 2.2L6.33 8.35l1.93 10.5L16 24.18l7.74-5.33 1.93-10.5L16.09 6.6h-.18zm-.6 4.3h1.2l3.43 9.3h-1.3l-.86-2.4H13.6l-.86 2.4h-1.3l3.43-9.3zm.6 1.2l-1.3 3.6h2.6l-1.3-3.6z" fill="#DD0031"/></svg> },
    { name: 'HTML5', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>HTML5</title><path d="M4.64 27.7l-2.016-22.56h26.752l-2.016 22.56-11.36 3.14-11.36-3.14zM24.8 8.6H9.4l.32 3.6h14.76l-.4 4.4H9.9l.4 4.4h9.16l-.4 4.4-4.52 1.2-4.52-1.2-.32-3.6H5.28l.56 6.24L16 28.5l10.16-2.82.56-6.24h-4.4l.4 4.4z" fill="#E34F26"/></svg> },
    { name: 'CSS3', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>CSS3</title><path d="M4.64 27.7l-2.016-22.56h26.752l-2.016 22.56-11.36 3.14-11.36-3.14zM24.8 8.6H9.4l.32 3.6h14.76l-.4 4.4H9.9l.4 4.4h9.16l-.4 4.4-4.52 1.2-4.52-1.2-.32-3.6H5.28l.56 6.24L16 28.5l10.16-2.82.56-6.24h-4.4l.4 4.4z" fill="#1572B6"/></svg> },
    { name: 'JavaScript', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h32v32H0z" fill="#F7DF1E"/><path d="M9.42 24.87c.84 1.41 2.37 2.37 4.19 2.37 1.63 0 2.89-.66 2.89-1.57 0-1.03-.89-1.45-2.2-2.05l-.94-.42c-2.48-1.1-4.14-2.58-4.14-5.26 0-2.37 1.74-4.24 4.6-4.24 2.1 0 3.59.84 4.65 2.58l-2.2 1.4c-.65-1-1.46-1.45-2.45-1.45-1.03 0-1.63.5-1.63 1.23 0 .94.6 1.3 1.85 1.85l.94.42c2.9 1.32 4.48 2.74 4.48 5.5 0 2.84-2.15 4.54-5.2 4.54-2.84 0-4.65-1.74-5.49-3.2L9.42 24.87zm9.95 2.52c.6 1.08 1.62 1.76 2.92 1.76 1.4 0 2.21-.6 2.21-2.47V15.4h3.3v10.16c0 4.08-2.32 5.86-5.69 5.86-2.88 0-4.72-1.68-5.5-3.35l2.76-1.6z"/></svg> },
    { name: 'TypeScript', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>TypeScript</title><path d="M0 0h32v32H0z" fill="#3178C6"/><path d="M11.02 24.31v-1.7l1.7-1.42c2.04-1.7 2.8-2.46 2.8-3.71 0-1.07-.63-1.7-1.9-1.7-1.43 0-2.07.66-2.22 1.95H8.69c.12-2.58 2.2-4.19 5-4.19 2.92 0 4.75 1.51 4.75 3.88 0 2.07-.94 3.44-2.57 4.88l-1.36 1.2v.06h3.69v2.58h-7.23zM18.91 24.5h2.7v-2.3h-2.7v2.3zm0-4.6h2.7v-2.3h-2.7v2.3zm0-4.6h2.7v-2.3h-2.7v2.3z" fill="#FFFFFF"/></svg> },
    { name: 'Tailwind CSS', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Tailwind CSS</title><path d="M9.525 15.999c0 2.475 2.025 4.5 4.5 4.5s4.5-2.025 4.5-4.5-2.025-4.5-4.5-4.5-4.5 2.025-4.5 4.5zm-4.5 0c0 4.95 4.05 9 9 9s9-4.05 9-9-4.05-9-9-9-9 4.05-9 9z" fill="#38BDF8"/></svg> },
    { name: 'Bootstrap', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Bootstrap</title><path d="M25.75 4.25H6.25a2 2 0 00-2 2v19.5a2 2 0 002 2h19.5a2 2 0 002-2V6.25a2 2 0 00-2-2zM12.5 13.5h-2v5h2a2.5 2.5 0 000-5zm8 0h-5v5h5v2h-5a2 2 0 01-2-2v-5a2 2 0 012-2h5v2zm-8 2a.5.5 0 010-1h-2v1h2z" fill="#7952B3"/></svg> },
    { name: 'jQuery', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>jQuery</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm4.27 21.328c-.34.34-.78.51-1.32.51-1.02 0-1.74-.63-2.16-1.89l-2.07-6.21h-.12l-1.92 6.21c-.42 1.26-1.14 1.89-2.16 1.89-.54 0-.98-.17-1.32-.51-.34-.34-.51-.78-.51-1.32 0-1.02.63-1.74 1.89-2.16l6.21-2.07V16h-6.21c-1.26 0-1.89-.63-1.89-1.89s.63-1.89 1.89-1.89h12.42c1.26 0 1.89.63 1.89 1.89s-.63 1.89-1.89 1.89h-4.23v.12l6.21 2.07c1.26.42 1.89 1.14 1.89 2.16 0 .54-.17.98-.51 1.32z" fill="#0769AD"/></svg> },
  ],
  backend: [
    { name: 'Node.js', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Node.js</title><path d="M15.48 0L.93 8.37v16.92l14.55 8.37 14.55-8.37V8.37L15.48 0zm-1.8 2.57l10.95 6.33-4.14 2.4-10.95-6.33 4.14-2.4zm1.8 19.3l-10.95-6.33 4.14-2.4 10.95 6.33-4.14 2.4zM2.73 10.94l4.14 2.4-4.14 2.4V10.94zm13.11 11.7l-4.14-2.4 4.14-2.4v4.8zm4.5-2.57l-4.14 2.4V11.2l4.14-2.4v11.7z" fill="#339933"/></svg> },
    { name: 'Python', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Python</title><path d="M16 2.6c-4.4 0-8 3.6-8 8v2.6H5.4C2.4 13.2 0 15.8 0 18.8c0 3 2.4 5.4 5.4 5.4h2.6V16c0-4.4 3.6-8 8-8s8 3.6 8 8v8.2c0 3-2.4 5.4-5.4 5.4H16v-2.6c4.4 0 8-3.6 8-8v-2.6h2.6c3 0 5.4-2.4 5.4-5.4s-2.4-5.4-5.4-5.4H24V8c0-4.4-3.6-8-8-8z" fill="#3776AB"/></svg> },
    { name: 'Go', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Go</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM8.5 14.5h15v3h-15v-3zm0 5h15v3h-15v-3zm0-10h15v3h-15v-3z" fill="#00ADD8"/></svg> },
    { name: 'Rust', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Rust</title><path d="M2.5 16L16 2.5 29.5 16 16 29.5 2.5 16zm2.5 0L16 27l11-11L16 5 5 16zM16 8v16l8-8-8-8z" fill="#000000"/></svg> },
    { name: 'Java', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Java</title><path d="M21.1 11.2c-1.2-1.2-2.8-1.8-4.5-1.8s-3.3.6-4.5 1.8-1.8 2.8-1.8 4.5.6 3.3 1.8 4.5 2.8 1.8 4.5 1.8 3.3-.6 4.5-1.8 1.8-2.8 1.8-4.5-.6-3.3-1.8-4.5zM16 29.6c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14z" fill="#007396"/></svg> },
    { name: 'PHP', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>PHP</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zM12.5 11h-3v10h3v-4h1.5a3.5 3.5 0 000-7H12.5v1zm6 0h-3v10h3v-4h1.5a3.5 3.5 0 000-7H18.5v1z" fill="#777BB4"/></svg> },
    { name: 'Ruby', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Ruby</title><path d="M21.1 1.4L16 15.9 10.9 1.4 1.4 10.9l14.5 14.5 14.5-14.5L21.1 1.4z" fill="#CC342D"/></svg> },
    { name: 'Express.js', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Express.js</title><path d="M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16s7.163 16 16 16 16-7.163 16-16zM7.5 16l4-7h9l-4 7h4l-4 7h-9l4-7H7.5z" fill="#000000"/></svg> },
    { name: 'Django', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Django</title><path d="M2 30h28v-3H2v3zm0-6h28v-3H2v3zm0-6h28v-3H2v3zm0-6h28v-3H2v3zm0-6h28V3H2v3z" fill="#092E20"/></svg> },
    { name: 'Flask', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Flask</title><path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm-5 8h10v16H11V8z" fill="#000000"/></svg> },
    { name: 'Spring Boot', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Spring</title><path d="M24.75 9.4c-2-2-4.7-3.1-7.5-3.1-5.5 0-10 4.5-10 10 0 2.8.9 5.3 2.5 7.2L5 29l5.3-4.3c1.7.7 3.6 1.1 5.7 1.1 5.5 0 10-4.5 10-10 0-2.8-.9-5.3-2.5-7.2l4.7-5.1-5.3-4.3z" fill="#6DB33F"/></svg> },
  ],
  database: [
    { name: 'MongoDB', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>MongoDB</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm-2 24V8h4v16h-4z" fill="#47A248"/></svg> },
    { name: 'PostgreSQL', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM11 11h10v10H11v-10z" fill="#4169E1"/></svg> },
    { name: 'MySQL', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>MySQL</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zM11 21V11l5 5-5 5z" fill="#4479A1"/></svg> },
    { name: 'SQLite', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>SQLite</title><path d="M2 30h28V2H2v28zM16 6l-6 6h12l-6-6zm0 20l6-6H10l6 6z" fill="#003B57"/></svg> },
    { name: 'Redis', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Redis</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28c-6.627 0-12-5.373-12-12S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#DC382D"/></svg> },
    { name: 'Firebase', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Firebase</title><path d="M4.6 28.5L16 2.3l11.4 26.2H4.6zm11.4-9.3L25.3 4.8 16 2.3 6.7 4.8l9.3 14.4z" fill="#FFCA28"/></svg> },
  ],
  devops: [
    { name: 'Docker', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Docker</title><path d="M29.5 16c0-1.9-1.5-3.4-3.4-3.4H24v-2.1c0-1.9-1.5-3.4-3.4-3.4h-9.2c-1.9 0-3.4 1.5-3.4 3.4v2.1H5.9c-1.9 0-3.4 1.5-3.4 3.4v9.2c0 1.9 1.5 3.4 3.4 3.4h2.1v2.1c0 1.9 1.5 3.4 3.4 3.4h9.2c1.9 0 3.4-1.5 3.4-3.4v-2.1h2.1c1.9 0 3.4-1.5 3.4-3.4v-9.2zM24 10.5h2.1v2.1H24v-2.1z" fill="#2496ED"/></svg> },
    { name: 'Kubernetes', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Kubernetes</title><path d="M16 2.5L2.5 9.5v13L16 29.5l13.5-7V9.5L16 2.5zM16 5l11 5.5-11 5.5L5 10.5 16 5zm-11 8l11 5.5v11l-11-5.5V13zm22 0v11l-11 5.5V18.5L27 13z" fill="#326CE5"/></svg> },
    { name: 'AWS', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Amazon AWS</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zM12.5 24h-3L16 8l6.5 16h-3L16 19l-3.5 5z" fill="#232F3E"/></svg> },
    { name: 'GCP', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Google Cloud</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM11 11h10v10H11V11z" fill="#4285F4"/></svg> },
    { name: 'Azure', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Microsoft Azure</title><path d="M16 0L2.5 16 16 32 29.5 16 16 0z" fill="#0089D6"/></svg> },
    { name: 'Jenkins', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Jenkins</title><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 4a12 12 0 110 24 12 12 0 010-24z" fill="#D24939"/></svg> },
    { name: 'Terraform', icon: <svg role="img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Terraform</title><path d="M2 2v28h28V2H2zm12 4h4v8h-4V6zm-6 6h4v8h-4v-8zm12 0h4v8h-4v-8zm-6 10h4v8h-4v-8z" fill="#7B42BC"/></svg> },
  ],
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
                                key={item.name}
                                control={form.control}
                                name="techStack"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={item.name} className="flex flex-row items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.name)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item.name])
                                              : field.onChange(field.value?.filter((value) => value !== item.name));
                                          }}
                                        />
                                      </FormControl>
                                       <FormLabel className="font-normal flex items-center gap-2">
                                        <div className="w-4 h-4">{item.icon}</div>
                                        {item.name}
                                      </FormLabel>
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
