import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: [true, 'Username field is required.'] },
        password: { type: String, required: [true, 'Password field is required.'] },
        player: { 
            type: mongoose.Types.ObjectId,
            ref: 'Player'
        }
    },
);

const UserModel = mongoose.model('User', UserSchema);


export default UserModel;