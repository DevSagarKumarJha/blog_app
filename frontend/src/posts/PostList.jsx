import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import PostForm from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col mt-20 px-4 py-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">All Posts</h1>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          {open ? "Close" : "New Post"}
        </button>
      </div>

      {open && (
        <div className="mb-10">
          <PostForm onSuccess={handlePostCreated} />
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg cursor-pointer overflow-hidden border dark:border-gray-700 transition"
            >
              {post.image && (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full min-h-[300px]">
          <h2 className="text-gray-400 text-2xl text-center">No Posts Found</h2>
        </div>
      )}
    </div>
  );
};

export default PostList;
