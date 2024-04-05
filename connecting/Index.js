import mongoose from "mongoose";

mongoose.connect('mongodb+srv://vijay:vijay@atlascluster.5bqstxh.mongodb.net/college')
    .then(() => {
        console.log('Mongoose connect');
    }).catch((error) => {
        console.log(`Mongodb connection error -:${error}`);
    });

