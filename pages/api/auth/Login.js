export default async function handler(req, res) {
    try {
        await connectDb();
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'error to connecting database' });
    }

    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        return res.status(400).json({ status: 'failed', message: 'invalid info' });
    }
}
