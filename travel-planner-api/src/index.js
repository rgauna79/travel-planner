import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    connectDB();
    app.listen(PORT);
    console.log("LISTENING ON PORT >> ", PORT)
  } catch (error) {
    console.log(error);
  }
}

main();
