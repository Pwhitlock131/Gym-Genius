// Importing the express module
const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


const { requireSignin, adminMiddleware } = authController;
const { readController, updateController } = userController;

// Routes
router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, updateController);
router.put('/admin/update', requireSignin, adminMiddleware, updateController);


module.exports = router;
