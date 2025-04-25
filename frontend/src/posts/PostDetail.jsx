import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import PostForm from "./PostForm";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setPost(updatedPost);
    setEditMode(false);
  };

  if (loading) return <div className="text-center mt-10">Loading post...</div>;
  if (!post) return <div className="text-center mt-10 text-red-500">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 py-8">
      {editMode ? (
        <PostForm post={post} onSuccess={handlePostUpdate} />
      ) : (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{post.title}</h2>

          {post.image && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${post.image}`}
              alt="Post"
              className="w-full max-h-[400px] object-cover rounded-lg"
            />
          )}

          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>

          <p className="text-sm text-gray-500">
            <span className="font-medium">Author:</span> {post.author.username} ({post.author.email})
          </p>

          {user?.id === post.author.id && (
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
