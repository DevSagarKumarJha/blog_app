import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <>
        <div>Please Login</div>
      </>
    );

  return (
    <div className="flex flex-col justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 items-center h-screen">
      <h1 className="text-3xl text-white font-serif font-bold">Profile</h1>

      <div className="min-w-sm p-6 text-center  h-fit rounded-md bg-gray-200">
        <p className="my-4 text-xl">
          Welcome, <span className="font-bold">{user.name}</span>
        </p>
        <p>
          <a
            href="/posts"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-500/80 text-lg font-semibold"
          >
            My Posts
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
