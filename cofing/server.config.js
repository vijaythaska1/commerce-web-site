import dotenv from 'dotenv';
import mongoose from 'mongoose';
const PORT = process.env.PORT
dotenv.config()
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Mongoose connect');
}).catch((error) => {
    console.log(`Mongodb connection error -:${error}`);
});
