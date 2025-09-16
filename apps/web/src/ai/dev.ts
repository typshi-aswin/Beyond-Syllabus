import { config } from 'dotenv';
config();

import { ai } from './ai'; // Adjust the path if needed
import '@/ai/flows/summarize-syllabus.ts';
import '@/ai/flows/suggest-resources.ts';
import '@/ai/flows/generate-module-tasks.ts';
import '@/ai/flows/chat-with-syllabus.ts';

async function testAi() {
  const chatCompletion = await ai.chat.completions.create({
    messages: [
      { role: 'user', content: 'Write a short poem about open source software.' }
    ],
    model: 'gemma2-9b-it',
    temperature: 0.6,
    max_completion_tokens: 4096,
    top_p: 0.95,
    stream: false, // for testing, set to false
    reasoning_effort: 'default'
  });

  console.log(chatCompletion.choices[0].message.content);
}

testAi();
