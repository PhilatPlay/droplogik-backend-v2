const Feedback = require('../models/Feedback');
const Post = require('../models/Post');
const User = require('../models/User');

// Add feedback to a post
exports.addFeedback = async (req, res) => {
    const { comment, points } = req.body;
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const newFeedback = new Feedback({
            user: req.user.id,
            post: req.params.postId,
            comment,
            points
        });

        const feedback = await newFeedback.save();

        post.feedbacks.unshift(feedback.id);
        await post.save();

        const feedbackProvider = await User.findById(req.user.id);
        if (feedbackProvider) {
            feedbackProvider.points += 5;
            await feedbackProvider.save();
        }

        res.json(feedback);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all feedbacks for a post
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ post: req.params.postId }).populate('user', ['username']);

        res.json(feedbacks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
    const { comment, points } = req.body;
    try {
        let feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ msg: 'Feedback not found' });
        }

        // Check user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        feedback.comment = comment || feedback.comment;
        feedback.points = points || feedback.points;

        await feedback.save();

        res.json(feedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ msg: 'Feedback not found' });
        }

        // Check user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await feedback.remove();

        res.json({ msg: 'Feedback removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
