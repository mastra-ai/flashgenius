# FlashGenius: AI-Powered Flashcard Generator

FlashGenius is a modern web application that uses AI to generate educational flashcards on any topic. Perfect for students, lifelong learners, and curious minds who want to enhance their learning experience.

## Features

- **AI-Powered Flashcard Generation**: Generate high-quality flashcards on any topic using OpenAI's GPT-4o
- **Customizable Difficulty Levels**: Choose between beginner, intermediate, and advanced difficulty
- **Interactive Flashcard Interface**: Flip cards with smooth animations to reveal answers
- **Progress Tracking**: Monitor your progress as you work through a set of flashcards
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React with TypeScript, Vite, Tailwind CSS, Framer Motion
- **AI Integration**: Mastra server with OpenAI Model
- **Routing**: React Router
- **Type Safety**: TypeScript with strict mode enabled

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or pnpm
- OpenAI API key

### Installation

1. Clone the repository

   ```bash
   cd flashgenius
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Application

1. Start the Mastra server (for AI functionality)

   ```bash
   npm run mastra:dev
   ```

2. In a separate terminal, start the development server

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Navigate to the "Create" page
2. Enter a topic you want to learn about
3. Select the difficulty level and number of cards
4. Click "Generate Flashcards"
5. Use the flashcard interface to study the generated cards

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally
- `npm run mastra:dev` - Start the Mastra AI server

## License

MIT

## Acknowledgements

- [OpenAI](https://openai.com/) for the GPT-4o model
- [Mastra](https://mastra.ai/) for the AI agent framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for animations
