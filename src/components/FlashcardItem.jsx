import { useState } from 'react';

const FlashcardItem = ({ card, onNext, onPrevious, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Card {currentIndex + 1} of {totalCards}</span>
        <div className="flex space-x-2">
          <button 
            onClick={onPrevious} 
            disabled={currentIndex === 0}
            className={`btn btn-secondary ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button 
            onClick={onNext} 
            disabled={currentIndex === totalCards - 1}
            className={`btn btn-secondary ${currentIndex === totalCards - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 cursor-pointer">
        {/* Front of card (Question) */}
        <div 
          className={`absolute w-full h-full transition-all duration-500 ${isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          onClick={handleFlip}
        >
          <div className="card h-full flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-center">{card.question}</h3>
            <p className="text-sm text-gray-500 mt-4">Click to reveal answer</p>
          </div>
        </div>
        
        {/* Back of card (Answer) */}
        <div 
          className={`absolute w-full h-full transition-all duration-500 ${isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={handleFlip}
        >
          <div className="card h-full flex flex-col justify-center items-center bg-blue-50">
            <p className="text-lg text-center">{card.answer}</p>
            <p className="text-sm text-gray-500 mt-4">Click to see question</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary" onClick={handleFlip}>
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
      </div>
    </div>
  );
};

export default FlashcardItem;
