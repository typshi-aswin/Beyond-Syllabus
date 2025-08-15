import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
// import { genkit } from 'genkit';
// import { anthropic, claude35Sonnet } from 'genkitx-anthropic';

// export const ai = genkit({ 
//   plugins: [anthropic()],
//  model: claude35Sonnet

//  });
// import { genkit } from 'genkit';
// import { deepSeek } from '@genkit-ai/compat-oai/deepseek';

// export const ai = genkit({ plugins: [deepSeek()],model: deepSeek.model('deepseek-chat'), });


  

