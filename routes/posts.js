const express = require('express');
const router = express.Router();
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post('/', createPost);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get('/', getPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', getPostById);

// @route    PUT api/posts/:id
// @desc     Update post
// @access   Private
router.put('/:id', updatePost);

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private
router.delete('/:id', deletePost);

module.exports = router;
