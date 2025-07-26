import mongoose, { Schema } from 'mongoose'

const linkSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    originalUrl: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        minLength: [3, "the title must be the grater than 3!"],
        trim: true
    },
    totalClicks: {
        type: Number,
        required: true,
        default: 0
    },
    lastVisited: {
        type: Date,
    },
    locations: [
        {
            info: {
                type: Object
            },

            count: {
                type: Number,
                default: 0
            }
        }
    ],
    devices: [
        {
            name: {
                type: String,
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],

    scanQR: {
        type: String,
        // required: true
    }
}, {
    timestamps: true
})

const CustomLink = mongoose.models.customLink || mongoose.model("customLink", linkSchema)

export default CustomLink