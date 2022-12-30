import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: [true, 'Username field is required.'] },
        password: { type: String, required: [true, 'Password field is required.'] },
    },
    {
        collection: "user",
    }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;