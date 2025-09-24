import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

async function hashPassword(password) {
    const result = await hash(password, 10);
    return result;
}

async function verifyPassword(password, hashedPassword) {
    const result = await compare(password, hashedPassword);
    return result;
}

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

export { hashPassword, verifyPassword, generateToken };
