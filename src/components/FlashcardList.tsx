import { useState } from 'react';
import FlashcardItem from './FlashcardItem';
import { Flashcard } from '../types';

interface FlashcardListProps {
  cards: Flashcard[];
  topic?: string;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ cards, topic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = (): void => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No flashcards available. Generate some cards first!</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {topic ? `Flashcards: ${topic}` : 'Your Flashcards'}
      </h2>
      
      <FlashcardItem 
        key={`card-${currentIndex}`}
        card={cards[currentIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={currentIndex}
        totalCards={cards.length}
      />
      
      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Progress: {Math.round(((currentIndex + 1) / cards.length) * 100)}%
        </p>
      </div>
    </div>
  );
};

export default FlashcardList;
