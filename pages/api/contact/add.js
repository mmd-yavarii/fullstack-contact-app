import User from '@/models/User';
import { verifyToken } from '@/utils/Auth';
import connectDb from '@/utils/ConnectDb';

export default async function handler(req, res) {
    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Error connecting to database' });
    }

    const { name, phoneNumber } = req.body;
    if (!name || !phoneNumber) return res.status(400).json({ status: 'failed', message: 'Data is not valid' });

    const token = req.cookies.token;
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ status: 'failed', message: 'Token is not valid' });

    try {
        const updatedUser = await User.findOneAndUpdate(
            { phoneNumber: payload.phoneNumber },
            { $push: { contacts: { name, phoneNumber } } },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ status: 'failed', message: 'User not found' });

        return res.status(200).json({ status: 'success', data: updatedUser });
    } catch (error) {
        console.error('Error adding contact:', error);
        return res.status(500).json({ status: 'failed', message: 'Error adding contact' });
    }
}
