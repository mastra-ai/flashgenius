import { useState, FormEvent, ChangeEvent } from 'react';

interface TopicSelectorProps {
  onTopicSubmit: (data: {
    topic: string;
    difficulty: string;
    cardCount: number;
  }) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onTopicSubmit }) => {
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [cardCount, setCardCount] = useState<number>(10);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (topic.trim()) {
      onTopicSubmit({ topic, difficulty, cardCount });
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Generate Flashcards</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="input"
            placeholder="Enter a topic (e.g., 'JavaScript Promises', 'Photosynthesis')"
            value={topic}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            className="input"
            value={difficulty}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="medium">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="cardCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Cards
          </label>
          <input
            type="number"
            id="cardCount"
            className="input"
            min="5"
            max="20"
            value={cardCount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCardCount(parseInt(e.target.value))}
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-full">
          Generate Flashcards
        </button>
      </form>
    </div>
  );
};

export default TopicSelector;
