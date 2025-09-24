import connectDb from '@/utils/ConnectDb';

import User from '@/models/User';
import { generateToken, verifyPassword } from '@/utils/Auth';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'error to connecting database' });
    }

    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        return res.status(400).json({ status: 'failed', message: 'invalid info' });
    }

    try {
        const userExistance = await User.findOne({ phoneNumber });
        if (!userExistance) {
            return res.status(404).json({ status: 'failed', message: 'user not found' });
        }

        const verifyPass = await verifyPassword(password, userExistance.password);
        if (!verifyPass) {
            return res.status(400).json({ status: 'failed', message: 'phone number or password is wrong' });
        }

        const token = generateToken({ name: userExistance.name, phoneNumber, _id: userExistance._id });
        const cookie = serialize('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ status: 'success', message: 'logged in successfully' });
    } catch {
        res.status(500).json({ status: 'failed', message: 'server error' });
    }
}
