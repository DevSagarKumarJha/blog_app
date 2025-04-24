import { db } from "../libs/db.js";

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file?.filename || null;

  if (!title || !content) {
    return res.status(400).json({ errMsg: "Title and content are required" });
  }

  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        image,
        authorId: req.user.id,
      },
    });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.log("Post Error: ", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, email: true } },
      },
    });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file?.filename;

  try {
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing || existing.authorId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed to update this post" });
    }

    const updated = await db.post.update({
      where: { id },
      data: {
        title: title || existing.title,
        content: content || existing.content,
        image: image || existing.image,
      },
    });

    res.status(200).json({ message: "Post updated", post: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
};
export { createPost, getAllPosts, getPostById, updatePost };
