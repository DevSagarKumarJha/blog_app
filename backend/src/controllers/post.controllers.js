import { db } from "../libs/db.js";

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Title and content are required
 *       500:
 *         description: Error creating post
 */
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file?.filename || null;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
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
    res.status(500).json({ error: "Error creating post" });
  }
};

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of blog posts
 *       500:
 *         description: Error fetching posts
 */
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

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching post
 */
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

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Not allowed to update this post
 *       500:
 *         description: Error updating post
 */
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

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Not allowed to delete this post
 *       500:
 *         description: Error deleting post
 */
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing || existing.authorId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed to delete this post" });
    }

    await db.post.delete({ where: { id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
