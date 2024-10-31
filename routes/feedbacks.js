const express = require('express');
const router = express.Router();
const {
    addFeedback,
    getFeedbacks,
    updateFeedback,
    deleteFeedback
} = require('../controllers/feedbackController');

// @route    POST api/feedbacks/:postId
// @desc     Add feedback to a post
// @access   Private
router.post('/:postId', addFeedback);

// @route    GET api/feedbacks/:postId
// @desc     Get all feedbacks for a post
// @access   Public
router.get('/:postId', getFeedbacks);

// @route    PUT api/feedbacks/:id
// @desc     Update feedback
// @access   Private
router.put('/:id', updateFeedback);

// @route    DELETE api/feedbacks/:id
// @desc     Delete feedback
// @access   Private
router.delete('/:id', deleteFeedback);

module.exports = router;
