import { Workflow } from '@mastra/core/workflows';
import { Step } from '@mastra/core/workflows';
import { z } from 'zod';

// Define the schema for flashcard data
const flashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
});

const flashcardsArraySchema = z.array(flashcardSchema);

// Step to generate flashcards using the agent
const generateFlashcardsStep = new Step({
  id: 'generateFlashcards',
  outputSchema: z.object({
    flashcards: flashcardsArraySchema,
  }),
  execute: async (context: any) => {
    const mastra = context.mastra;
    const { topic, difficulty, count } = context.trigger;
    
    // Get the flashcard agent
    const agent = mastra.getAgent('flashcardAgent');
    
    // Generate flashcards using the agent
    const result = await agent.generate(
      `Generate ${count} flashcards about "${topic}" at ${difficulty} level. 
       Format your response as a valid JSON array of objects, each with 'question' and 'answer' properties.`,
      {
        output: z.object({
          flashcards: flashcardsArraySchema,
        }),
      }
    );
    
    // Extract and return the flashcards
    return {
      flashcards: result.object.flashcards,
    };
  },
});

// Create the workflow
export const generateFlashcardsWorkflow = new Workflow({
  name: 'generate-flashcards-workflow',
  triggerSchema: z.object({
    topic: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    count: z.number().min(1).max(20),
  }),
});

// Add the step to the workflow
generateFlashcardsWorkflow.step(generateFlashcardsStep).commit();
