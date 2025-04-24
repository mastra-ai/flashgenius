import { useState } from 'react';
import TopicSelector from '../components/TopicSelector';
import FlashcardList from '../components/FlashcardList';
// Import the generateFlashcards function from our Mastra client
import { generateFlashcards } from '../client';
import { Flashcard } from '../types';

interface TopicSubmitParams {
  topic: string;
  difficulty: string;
  cardCount: number;
}

interface EnhancedFlashcard extends Flashcard {
  id: string;
}

const Create: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flashcards, setFlashcards] = useState<EnhancedFlashcard[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Generate flashcards using Mastra Client SDK
  const handleTopicSubmit = async ({ topic, difficulty, cardCount }: TopicSubmitParams): Promise<void> => {
    setIsLoading(true);
    setCurrentTopic(topic);
    setError(null);

    try {
      // Call the Mastra API through the client SDK
      const cards = await generateFlashcards({
        topic,
        difficulty: difficulty.toLowerCase(),
        cardCount
      });

      // Format the cards for our UI
      const generatedCards: EnhancedFlashcard[] = cards.map((card, index) => ({
        id: `card-${index}`,
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty || difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
      }));

      setFlashcards(generatedCards);

      // Fallback to mock data if no cards are returned
      if (!generatedCards.length) {
        console.warn('No flashcards returned from API, using mock data');

        // Generate mock flashcards
        const mockCards: EnhancedFlashcard[] = Array.from({ length: cardCount }, (_, i) => ({
          id: `card-${i}`,
          question: `Sample question ${i + 1} about ${topic}?`,
          answer: `Sample answer ${i + 1} about ${topic}.`,
          difficulty: difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
        }));

        setFlashcards(mockCards);
      }

    } catch (err) {
      console.error('Error generating flashcards:', err);
      setError('Failed to generate flashcards. Please try again.');

      // Fallback to mock data
      const mockCards: EnhancedFlashcard[] = Array.from({ length: cardCount }, (_, i) => ({
        id: `card-${i}`,
        question: `Sample question ${i + 1} about ${topic}?`,
        answer: `Sample answer ${i + 1} about ${topic}.`,
        difficulty: difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
      }));

      setFlashcards(mockCards);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Create Flashcards</h1>

      {!flashcards.length && (
        <TopicSelector onTopicSubmit={handleTopicSubmit} />
      )}

      {error && (
        <div className="text-center py-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Generating your flashcards with AI...</p>
        </div>
      )}

      {!isLoading && flashcards.length > 0 && (
        <div>
          <FlashcardList cards={flashcards} topic={currentTopic} />

          <div className="mt-8 flex justify-center space-x-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFlashcards([]);
                setCurrentTopic('');
                setError(null);
              }}
            >
              Create New Set
            </button>

            <button className="btn btn-primary">
              Save Flashcard Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
