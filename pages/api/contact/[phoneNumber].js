import User from '@/models/User';
import { verifyToken } from '@/utils/Auth';
import connectDb from '@/utils/ConnectDb';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;

    const { phoneNumber } = req.query;
    if (!phoneNumber) {
        return res.status(400).json({ status: 'failed', message: 'phoneNumber is required' });
    }

    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'error to connecting database' });
    }

    try {
        const token = req.cookies.token;
        const payload = verifyToken(token);

        if (!payload) {
            return res.status(401).json({ status: 'failed', message: 'Token is not valid' });
        }

        const user = await User.findOne({ _id: payload._id, 'contacts.phoneNumber': phoneNumber }, { 'contacts.$': 1 });

        if (!user) {
            return res.status(404).json({ status: 'failed', message: 'Contact not found' });
        }
        const contact = user?.contacts?.[0];

        return res.status(200).json({
            status: 'success',
            message: 'Contact retrieved successfully',
            data: contact,
            userNumber: user.phoneNumber,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'failed', message: 'Error in getting contact' });
    }
}
