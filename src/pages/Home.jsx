import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          FlashGenius
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Generate smart flashcards on any topic instantly. Perfect for students, lifelong learners, and curious minds.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/create"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Choose a Topic</h3>
            <p className="text-gray-500">
              Enter any subject you want to learn about - from quantum physics to ancient history.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Generate Cards</h3>
            <p className="text-gray-500">
              Our AI creates high-quality flashcards with questions and answers tailored to your topic.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Study & Learn</h3>
            <p className="text-gray-500">
              Review your flashcards with our interactive study mode to boost your knowledge retention.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to boost your learning?</h2>
        <Link
          to="/create"
          className="btn btn-primary"
        >
          Create Flashcards Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
