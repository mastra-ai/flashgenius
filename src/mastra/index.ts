import { Mastra } from '@mastra/core';

import { flashcardAgent } from './agents/flashcardAgent';
import { generateFlashcardsWorkflow } from './workflow';

export const mastra = new Mastra({
  agents: { flashcardAgent },
  workflows: {
    generateFlashcardsWorkflow,
  },
});
