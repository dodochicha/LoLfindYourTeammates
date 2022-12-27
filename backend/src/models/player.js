import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lane: [{ type: String }],
    heros: [{ type: String }],
    rank: { type: String, required: true },
  },
  {
    collection: "player",
  }
);

export default mongoose.model("player", playerSchema);
