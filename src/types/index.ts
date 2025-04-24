export interface Flashcard {
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface FlashcardResponse {
  flashcards: Flashcard[];
}
