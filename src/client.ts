import { MastraClient } from "@mastra/client-js";
import { Flashcard } from "./types";

// Get the Mastra server URL from environment variables or use default
const MASTRA_SERVER_URL = import.meta.env.VITE_MASTRA_SERVER_URL || "http://localhost:4111";

// Initialize the Mastra client
export const mastraClient = new MastraClient({
  // Using our local Mastra server that's running
  baseUrl: MASTRA_SERVER_URL,

  // Optional configurations
  retries: 3,
  backoffMs: 300,
  maxBackoffMs: 5000,
});

interface FlashcardGenerationParams {
  topic: string;
  difficulty: string;
  cardCount: number;
}

interface MastraResponse {
  text?: string;
  object?: {
    flashcards?: Flashcard[];
    [key: string]: any;
  };
  [key: string]: any;
}

// Helper function to generate flashcards
export const generateFlashcards = async ({
  topic,
  difficulty,
  cardCount
}: FlashcardGenerationParams): Promise<Flashcard[]> => {
  try {
    console.log(
      `Generating ${cardCount} flashcards about "${topic}" at ${difficulty} level...`
    );

    // Get a reference to the flashcard agent
    const agent = mastraClient.getAgent("flashcardAgent");

    // Generate flashcards using the agent
    const response = await agent.generate({
      messages: [
        {
          role: "user",
          content: `Generate ${cardCount} flashcards about "${topic}" at ${difficulty} level.`,
        },
      ],
    }) as MastraResponse;

    console.log("Received response from Mastra:", response);

    // Parse the response to extract flashcards
    try {
      // First try to parse it directly from the response object
      if (response.object && response.object.flashcards) {
        console.log("Found flashcards in response object");
        return response.object.flashcards;
      }

      // If not available as an object, try to parse from the text
      console.log("Attempting to parse flashcards from response text");
      const responseText = response.text || "";

      // Look for JSON in the response text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : responseText;

      try {
        const parsedData = JSON.parse(jsonString);
        const flashcards = Array.isArray(parsedData)
          ? parsedData
          : parsedData.flashcards || [];
        console.log(`Successfully parsed ${flashcards.length} flashcards`);
        return flashcards;
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);

        // As a fallback, try to extract content using regex
        const cards: Flashcard[] = [];
        const questionMatches = responseText.matchAll(
          /question["']?\s*:\s*["']([^"']+)["']/gi
        );
        const answerMatches = responseText.matchAll(
          /answer["']?\s*:\s*["']([^"']+)["']/gi
        );

        const questions = Array.from(questionMatches).map((m) => m[1]);
        const answers = Array.from(answerMatches).map((m) => m[1]);

        for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
          cards.push({
            question: questions[i],
            answer: answers[i],
            difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
          });
        }

        if (cards.length > 0) {
          console.log(`Extracted ${cards.length} flashcards using regex`);
          return cards;
        }

        throw new Error("Failed to extract flashcard data from the response");
      }
    } catch (parseError) {
      console.error("Error parsing flashcard data:", parseError);
      throw new Error("Failed to parse flashcard data from the response");
    }
  } catch (error) {
    console.error("Error calling Mastra API:", error);
    throw error;
  }
};
