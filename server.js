const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// const connectionStringURI = `mongodb://127.0.0.1:27017`;
// const client = new MongoClient(connectionStringURI);
// let db;
// const dbName = "socialNetworkDB";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose
   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .catch((err) => console.error(err));

mongoose.set("debug", true);

mongoose.connection.on("open", () => {
   app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});
