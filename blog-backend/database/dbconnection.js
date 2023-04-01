import mongoose from "mongoose";

const ConnectToDatabase = async (username, password) => {
  try {
    let url = `mongodb+srv://${username}:${password}@cluster0.ehjho.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected To Datebase Successfully")
  } catch (e) {
    console.log(e);
  }
};

export default ConnectToDatabase;
