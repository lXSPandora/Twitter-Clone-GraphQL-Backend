import mongoose, { Schema } from "mongoose";

const TweetSchema = new Schema(
  {
    user: String,
    text: String,
    likes: Number
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);
