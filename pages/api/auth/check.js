import { verifyToken } from '@/utils/Auth';
import connectDb from '@/utils/ConnectDb';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;

    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Error connecting to database' });
    }

    const token = req.cookies.token;
    const payload = verifyToken(token);

    if (payload) {
        res.status(200).json({ status: 'success', message: 'Token validated successfully', user: payload });
    } else {
        res.status(401).json({ status: 'failed', message: 'Token is not valid' });
    }
}
