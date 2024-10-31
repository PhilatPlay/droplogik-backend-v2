const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', createUser);

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', getUsers);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id', getUserById);

// @route    PUT api/users/:id
// @desc     Update user
// @access   Private
router.put('/:id', updateUser);

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private
router.delete('/:id', deleteUser);

module.exports = router;
