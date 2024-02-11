//mongoose
import mongoose from "mongoose";
console.log("22");
console.log(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the database!");
});

mongoose.connection.on('error', () => {
    console.log(`unable to connect to database: ${process.env.DATABASE_URL}`) 
});

const conn = mongoose.connection
    
export default conn;