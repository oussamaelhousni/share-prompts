import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("already connected to db");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://oussama:oussama@cluster0.u7yw4fr.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "promptopia",
      }
    );

    isConnected = true;
    console.log("mongoDb connected");
  } catch (e) {
    console.log("error in connection", e);
  }
};
