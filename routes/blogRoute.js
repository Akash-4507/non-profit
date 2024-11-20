const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); 


router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email'); 
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});


router.get('/one/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});


router.post('/add', async (req, res) => {
  const { title, content, author, tags } = req.body;

  
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      tags,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});


router.put('/edit/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } 
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    updatedBlog.updatedAt = Date.now(); 
    await updatedBlog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});

module.exports = router;
