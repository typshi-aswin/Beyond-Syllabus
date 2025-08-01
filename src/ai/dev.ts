import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-syllabus.ts';
import '@/ai/flows/suggest-resources.ts';
import '@/ai/flows/generate-module-tasks.ts';
import '@/ai/flows/chat-with-syllabus.ts';
