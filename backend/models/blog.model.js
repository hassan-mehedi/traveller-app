import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Title is required"], trim: true },
        content: { type: String, required: [true, "Description is required"], trim: true },
        tags: [{ type: String, trim: true, enum: ["travel", "food", "music", "art", "other"] }],
        images: [{ type: String, trim: true }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true, sparse: true }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

const blog = mongoose.model("blog", blogSchema);
export default blog;
