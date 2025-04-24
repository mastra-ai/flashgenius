import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">FlashGenius</span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/create" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Create
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
