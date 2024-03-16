import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: { type: String, required: [true, "Description is required"], trim: true },
        tags: [{ type: String, trim: true, enum: ["travel", "food", "music", "art", "other"] }],
        images: [{ type: String, trim: true }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

const post = mongoose.model("post", postSchema);
export default post;
