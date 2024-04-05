import express from "express";
import cors from "cors";
import path from 'path';
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';
import "./connecting/Index.js";
import dotenv from 'dotenv';
import router from "./router/index.js";
import users from "./router/APIs.js";
import helper from "./utility/helper.js";
// import server from "./cofing/server.config.js"
const PORT = process.env.PORT || 4500
const catchServerErrors = helper.catchServerError

const app = express();
app.set('views', path.join(path.resolve(), 'views'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(fileUpload());
// dotenv.config(ENVPATH);
// await server();
app.use('/', router);
app.use('/users', users);
app.use(catchServerErrors);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

