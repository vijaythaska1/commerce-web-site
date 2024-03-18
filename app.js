import express from "express";
import cors from "cors";
import path from 'path';
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from "./router/index.js";
import users from "./router/APIs.js";
import server from "./cofing/server.config.js"
dotenv.config();

(async () => {
    try {
        const app = express();
        app.set('views', path.join(path.resolve(), 'views'));
        app.use(express.json());
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static(path.join(path.resolve(), 'public')));
        app.use(fileUpload());
        await server();
        app.use('/', router);
        app.use('/users', users);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("error-:", error);
    }

})