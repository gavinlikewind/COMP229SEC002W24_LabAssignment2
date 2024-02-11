import config from "dotenv";
config.config();
import app from "./express.js";


//connect DB connect()
import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  //useCreateIndex: true, 
  useUnifiedTopology: true 
} )
.then(() => {
  console.log("Connected to the database!");
})
  
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${process.env.DATABASE_URL}`) 
})

//simple route for home page, return msg for home page
app.get("/", function (req, res) {
  res.json({"message": "Welcome to DressStore application"});
});

//set listen port
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Started at ${process.env.SERVER_PORT}`)
})