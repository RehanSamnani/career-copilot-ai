const express=require('express');

const authRouter=express.Router();
const authController=require('../controllers/auth.controller.js')
const blacklistModel = require('../models/blacklist.model.js')
const authMiddleware=require('../middleware/auth.middleware.js')

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/api/auth/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/api/auth/login', authController.loginUserController);


/**
 * @route GET /api/auth/logout
 * @desc clear the token from the client and add it to blacklistf
 * @access Public
 */
authRouter.post('/Logout',authController.LogoutUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Get the Current logged on user details
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUserMiddleware,authController.getMeController);


module.exports=authRouter;
