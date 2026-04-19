import Post from '../models/postModel.js';

const createPost=async(req,res)=>{
 const post=await Post.create({
  title:req.body.title,
  content:req.body.content,
  author:req.user.id
 })
 res.json({message:'Post created successfully',post})
}

const getAllPosts=async(req,res) =>{
  const posts=await Post.find().populate('author','name') 
  res.json({posts})
}

const getPostById=async(req,res) =>{
  const post=await Post.findById(req.params.id).populate('author','name');
  if(!post){
    return res.status(404).json({message:'Post not found'})
  }
  res.json({post})

}


const updatePost=async(req,res) =>{
  const post=await Post.findById(req.params.id);
  if(!post){
    return res.status(404).json({message:'Post not found'})
  }
  post.title=req.body.title;
  post.content=req.body.content;
  const updatedPost=await post.save();
  res.json({message:'Post updated successfully',updatedPost})
}


const deletePost=async(req,res) =>{
  const post=await Post.findById(req.params.id);
  if(!post){
    return res.status(404).json({message:'Post not found'})
  }
  await post.remove();
  res.json({message:'Post deleted successfully'})
}

export {createPost, getAllPosts, getPostById, updatePost, deletePost}
