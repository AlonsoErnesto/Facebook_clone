const Post = require('../models/Post');

exports.createPost = async (req,res) => {
   try {
      const post  = await new Post(req.body).save();
      res.json(post);
   } catch (err) {
      return res.status(500).json({message:err.message});
   }
}

exports.getAllPosts = async (req,res) => {
   try {
      const posts = await Post.find();
      res.json(posts);
   } catch (err) {
      return res.status(500).json({message:err.message});
   }
}