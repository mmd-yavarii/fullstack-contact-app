import { verifyToken } from '@/utils/Auth';
import connectDb from '@/utils/ConnectDb';

export default async function handler(req, res) {
    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'error to connecting database' });
    }

    const token = req.cookies.token;
    const payload = verifyToken(token);

    if (!payload) return res.status(401).json({ status: 'failed', message: 'Token is not valid' });
}
