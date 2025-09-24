import { models, model, Schema } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        contacts: [
            {
                name: { type: String, required: true },
                phoneNumber: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

const User = models.User || model('User', schema);
export default User;
