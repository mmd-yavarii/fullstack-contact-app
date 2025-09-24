import User from '@/models/User';
import { generateToken, hashPassword } from '@/utils/Auth';
import connectDb from '@/utils/ConnectDb';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'error to connecting database' });
    }

    const { name, phoneNumber, password } = req.body;

    if (!name || !phoneNumber || !password) {
        return res.status(400).json({ status: 'failed', message: 'invalid info' });
    }

    try {
        const existance = await User.findOne({ phoneNumber });
        if (existance) {
            return res.status(400).json({ status: 'failed', message: 'user already exists' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'server is not available' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, phoneNumber, password: hashedPassword });

    const token = generateToken({ name, phoneNumber, _id: user._id });
    const cookie = serialize('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(201).json({ status: 'success', message: 'data created successfully', data: user });
}
