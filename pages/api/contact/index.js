import User from '@/models/User';
import connectDb from '@/utils/ConnectDb';
import { verifyToken } from '@/utils/Auth';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ status: 'failed', message: 'Method not allowed' });
    }

    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Error connecting to database' });
    }

    try {
        const token = req.cookies.token;
        const payload = verifyToken(token);

        if (!payload) {
            return res.status(401).json({ status: 'failed', message: 'Token is not valid' });
        }

        const user = await User.findOne({ _id: payload._id });
        const contacts = user?.contacts || [];

        return res.status(200).json({
            status: 'success',
            message: 'Contacts retrieved successfully',
            data: contacts,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'failed', message: 'Error in getting contacts' });
    }
}
