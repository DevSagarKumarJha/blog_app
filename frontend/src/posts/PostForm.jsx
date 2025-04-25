import { useState, useEffect } from "react";
import api from "../api/axios";

const PostForm = ({ post = null, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        image: null, // image won't prefill
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      let res;
      if (post) {
        res = await api.put(`/posts/${post.id}`, formData);
      } else {
        res = await api.post("/posts", formData);
      }
      onSuccess?.(res.data.post);
      if (!post) {
        setForm({ title: "", content: "", image: null });
      }
    } catch (err) {
      console.error("Failed to submit post:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        {post ? "Edit Post" : "Create Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-900 dark:text-white"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
          rows={5}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-900 dark:text-white"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
