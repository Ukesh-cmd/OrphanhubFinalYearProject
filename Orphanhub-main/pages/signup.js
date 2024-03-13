// pages/signup.js



// Example: User model/schema
// Replace this with your actual user schema/model
import User from '../../models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            await connectDB();

            const { username, email, password } = req.body;

            // Check if the username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username or email already exists' });
            }

            const newUser = new User({ username, email, password });

            await newUser.save();


            res.status(200).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}