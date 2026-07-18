import dotenv from "dotenv";
import connectDb from "./db/index.js";
import app from "./app.js"

dotenv.config();

connectDb()
.then(() => {
    app.listen(process.env.PORT,() =>{
        console.log("Server is running on port",process.env.PORT)
    })
})
.catch((error) => {
    console.log("Database connection error",
    {
    name : error.name,
    message : error.message,
    Error : error.stack
    });
    process.exit(1);
});