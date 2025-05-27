import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateFlashcards, mastraClient } from '../client';

const mockAgent = {
  generate: vi.fn(),
};

beforeEach(() => {
  vi.resetAllMocks();
  // @ts-ignore
  mastraClient.getAgent = vi.fn().mockReturnValue(mockAgent);
});

describe('generateFlashcards', () => {
  it('parses flashcards from valid JSON response', async () => {
    mockAgent.generate.mockResolvedValue({
      text: '{"flashcards": [{"question":"Q1","answer":"A1"}]}'
    });

    const cards = await generateFlashcards({
      topic: 'test',
      difficulty: 'beginner',
      cardCount: 1,
    });

    expect(cards).toEqual([
      { question: 'Q1', answer: 'A1', difficulty: 'beginner' },
    ]);
  });

  it('falls back to regex extraction when JSON parsing fails', async () => {
    mockAgent.generate.mockResolvedValue({
      text: "question: 'Q2' answer: 'A2'"
    });

    const cards = await generateFlashcards({
      topic: 'test',
      difficulty: 'beginner',
      cardCount: 1,
    });

    expect(cards).toEqual([
      { question: 'Q2', answer: 'A2', difficulty: 'beginner' },
    ]);
  });
});
