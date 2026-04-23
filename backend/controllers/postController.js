import Post from '../models/postModel.js';

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    res.json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name')
  res.json({ posts })
}

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name');
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json({ post })

}


const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  //ownership check
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to update this post' })
  }

  post.title = req.body.title;
  post.content = req.body.content;
  const updatedPost = await post.save();
  res.json({ message: 'Post updated successfully', updatedPost })
}


const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  //ownership check
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to delete this post' })
  }

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted successfully' })
}

export { createPost, getAllPosts, getPostById, updatePost, deletePost }
