import express from "express";
import cors from "cors";
import path from 'path';
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import  from '';

// import  router  from "./router/index.js";
// import  users  from "./router/APIs.js";


dotenv.config();

const app = express();

(async () => {
    try {
        app.set('views', path.join(path.resolve(), 'views'));
        app.use(express.json());
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static(path.join(path.resolve(), 'public')));
        app.use(fileUpload());
        // app.use('/', routes);
        // app.use('/users', users);
    } catch (error) {
        console.log("Error:", error);
    }
})();
