import mongoose, { Schema } from "mongoose"

const userModel = new Schema({

    username: {
        type: String,
        required: [true, "username is required!!"]
    },
    email: {
        type: String,
        required: [true, "Please provide a Email to proceed!"],
        unique: [true, "This Email is already taken!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password to proceed!"],
        min: [8, "The Minimum length is 8 characters!"]
    },

    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    createdLinks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Link"
        }
    ],

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date
}, {
    timestamps: true,
})

const User = mongoose.models.user || mongoose.model("user", userModel)

export default User