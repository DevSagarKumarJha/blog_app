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

export { createPost, getAllPosts};
