const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserOTP } = require('../models'); 
const { sendOTP } = require('../utils/email'); 
//for commiting
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  
        );

        res.cookie('token', token, {
            httpOnly: true,         
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000,        
            sameSite: 'strict',      
        });

       
        res.status(201).json({ 
            message: 'User registered successfully',
            token   
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const otp = generateOTP();
        await UserOTP.create({ email: user.email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
        await sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent to your email. Verify to complete login.' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const userOTP = await UserOTP.findOne({ where: { email, otp } });
        if (!userOTP || userOTP.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        await userOTP.destroy();
        const user = await User.findOne({ where: { email } });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

const generateOTP = () => (Math.floor(100000 + Math.random() * 900000)).toString();

module.exports = { registerUser, loginUser, verifyOTP };
