import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl text-gray-800 dark:text-white mb-4">Please Login</h1>
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4">
      <h1 className="text-4xl font-bold text-white font-serif mb-8">Profile</h1>

      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <p className="text-xl text-gray-800 dark:text-white mb-4">
          Welcome, <span className="font-bold">{user.name}</span>
        </p>
        <Link
          to="/posts"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg font-semibold transition"
        >
          My Posts
        </Link>
      </div>
    </div>
  );
};

export default Home;
