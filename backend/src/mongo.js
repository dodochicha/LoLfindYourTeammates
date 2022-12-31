import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

mongoose.set("strictQuery", true);

async function connect() {
  dotenv.config();
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
  }
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("mongo db connection created");
    });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
}

export default { connect };
