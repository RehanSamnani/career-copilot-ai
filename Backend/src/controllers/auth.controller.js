const userModel=require('../models/user.model');
const blacklistModel = require('../models/blacklist.model.js')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


/**
 * 
 * @name registerUserController
 * @description Controller to handle user registration
 * @access Public 
 */
async function registerUserController(req,res){
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await userModel.create({ username, email, password: hashedPassword });

        const token=jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token);


        res.status(201).json({ message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name loginUsercontroller
 * @description
 * @access public
 */
async function loginUserController(req,res){
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token);

        res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name logoutUserController
 * @description Controller to handle user logout
 * @access Public
 */
async function LogoutUserController(req,res){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"No token provided"})
        }
        await blacklistModel.create({token})
        res.clearCookie("token");
        res.status(200).json({message:"Logout successful"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

async function getMeController(req,res){
    try{
            const user=await userModel.findById(req.user.userId)

            res.status(200).json({
                message:"User details fetched successfully",
                user:{id:user._id,
                    username:user.username,
                    email:user.email
                }
            }
    )}
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}


    module.exports = {
    registerUserController,
    loginUserController,
    LogoutUserController,
    getMeController
};

