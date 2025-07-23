import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Not using the signup feature for now
const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Can add checks with validator later to ensure email valid / password strong
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists'});

        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create and save new user
        const newUser = new User({email, password: hashed});
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ email, token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields must be filled out'});
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ email, token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {loginUser, signupUser};