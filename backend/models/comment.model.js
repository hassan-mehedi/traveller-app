import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: { type: String, required: [true, "Description is required"], trim: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);
