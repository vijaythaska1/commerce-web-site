import jwt from "jsonwebtoken";
import joi from "joi";
import moment from "moment";
import mongoose from "mongoose";
import userModel from "../Model/UserSchame.js";
import chatModel from "../Model/chats.js";
import messageModel from "../Model/mesagesSchema.js";
import { dataValidator, notificationManager, notificationTypes } from "../config/validator.js";
const session = {};
const errorNotifyer = (io, socket, err) => {
    console.log("err =============>", err);
    const socketId = socket.id;
    if (err) {
        if (typeof err === "string") {
            if (err === "Unauthorization") {
                err = "error_message:Unauthorized invailed authorization token";
            }
        } else if (typeof err === "object") {
            err.message ? (err = err?.message) : err;
        } else err = "Connection refused";
    } else err = "Connection refused";
    io.to(socketId).emit("errorNotifyer", { message: err });
};
export default {
    authConnection: async (io, socket, next) => {
        try {
            const sendError = (message) => {
                !message ? (message = "Unauthorized") : message;
                throw message;
            };
            if (!socket.handshake) sendError();
            if (!socket.handshake.headers) sendError();
            if (!socket.handshake.headers.authorization) sendError();
            const authToken = socket.handshake.headers.authorization;
            const jwtSecretToken = process?.env?.SECRET_KEY;
            const decoded = jwt.verify(authToken, jwtSecretToken);
            const currentUser = await userModel.findOne({ _id: decoded?._id });
            if (!currentUser) sendError();
            // if (currentUser?.isOnline === 1) sendError();
            socket.userData = currentUser;
            next();
        } catch (err) {
            console.log('err ===============>', err);
            next(new Error(err));
        }
    },
    handdleDuplicateConnection: async (io, socket) => {
        const _id = socket?.userData?.id;
        if (session[_id]) {
            session[_id]?.disconnect(true);
            session[_id] = socket
        }
        else {
            session[_id] = socket
        }
    },
    handdleUserConnect: async (io, socket) => {
        try {
            const socketId = socket.id;
            const _id = socket?.userData?.id;
            await userModel.updateOne({ _id }, { $set: { socketId, isOnline: 1 } });
            io.to(socketId).emit("connectListenerr", {
                message: "User connected succesfully",
            });
        } catch (error) {
            errorNotifyer(io, socket, err);
        }
    },
    disconnectUser: async (io, socket, data) => {
        try {
            const _id = socket?.userData?.id;
            await userModel.updateOne({ _id }, { $set: { isOnline: 0 } });
        } catch (err) {
            errorNotifyer(io, socket, err);
        }
    },
    sendMessage: async (io, socket, data) => {
        try {
            const validationSchem = joi
                .object()
                .required()
                .keys({
                    receiverId: joi.string().required(),
                    message: joi.string().required(),
                    type: joi.number().required().valid(1, 2, 3),
                });
            dataValidator(validationSchem, data);
            const { receiverId, message, type } = data;
            const senderId = socket?.userData?.id;
            const socketId = socket?.id;
            if (senderId.toString() === receiverId) throw "Invalied receiverId";
            const receverDetails = await userModel.findOne({ _id: receiverId });
            if (!receverDetails) throw "Invalied receiverId";
            let chatId = null;
            const isChatExist = await chatModel.findOne({
                $or: [{ senderId, receiverId }, { receiverId: senderId, senderId: receiverId }],
            });
            if (!isChatExist) {
                const newChat = await chatModel.create({
                    senderId,
                    receiverId,
                })
                chatId = newChat?._id
            } else chatId = isChatExist?._id;
            await chatModel.updateOne({ _id: chatId }, { $set: { "lastMessage.message": message, "lastMessage.messageType": type, "lastMessage.date": moment().valueOf() } });
            const newMessage = await messageModel.create({
                senderId,
                receiverId,
                chatId,
                message,
                message_type: type
            });
            io.to(socketId).emit("send-message-status", {
                status: 200,
                message: "Message sended succesfully",
            });
            // notify to recever
            if (receverDetails?.isOnline === 1) {
                const newMessageForRecever = {
                    _id: newMessage?._id,
                    message,
                    message_type: newMessage?.message_type,
                    is_read: newMessage?.is_read,
                    createdAt: newMessage?.createdAt,
                    mesageType: 2,
                    name: socket?.userData?.name,
                    image: socket?.userData?.image,
                    isOnline: 1
                }
                io.to(receverDetails?.socketId).emit("receve-message", newMessageForRecever);
            }
            else {
                // send push notification here
                if (receverDetails?.notificationStatus === 1) {
                    const notification = {
                        senderId,
                        receiverId,
                        message: `${socket?.userData?.name} send you a message`,
                        type: notificationTypes?.sendMessageAlert
                    }
                    notificationManager(notification?.senderId, notification?.receiverId, notification?.message, notification?.type)
                }
            }
        } catch (err) {
            console.log('err =============>', err);
            errorNotifyer(io, socket, err);
        }
    },
    getChatListing: async (io, socket, data) => {
        try {
            const userId = socket?.userData?.id;
            const socketId = socket?.id;
            const select = ['name', 'image', 'isOnline']
            const populateQuery = [
                {
                    path: "senderId",
                    select
                },
                {
                    path: "receiverId",
                    select
                }
            ]
            const isChatExist = await chatModel.find({
                $or: [{ senderId: userId }, { receiverId: userId, }],
            }).populate(populateQuery);
            const filtredChats = [];
            for (let i = 0; i < isChatExist.length; i++) {
                const { senderId, receiverId, lastMessage } = isChatExist[i];
                if (senderId) {
                    if (senderId?._id?.toString() === userId?.toString()) {
                        filtredChats.push({ ...receiverId?._doc, lastMessage })
                    }
                }
                if (receiverId) {
                    if (receiverId?._id?.toString() === userId?.toString()) {
                        filtredChats.push({ ...senderId?._doc, lastMessage })
                    }
                }
            }
            io.to(socketId).emit("chats-get-status", {
                status: 200,
                message: "Get chat list succesfully",
                data: filtredChats
            });
        }
        catch (err) {
            console.log('err =============>', err);
            errorNotifyer(io, socket, err);
        }
    },
    getChatListing2: async (io, socket, data) => {
        try {
            const userId = socket?.userData?._id;
            const socketId = socket?.id;
            const list = await chatModel.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                senderId: userId
                            },
                            {
                                receiverId: userId
                            },
                        ],
                    },
                },
                {
                    $sort: {
                        updatedAt: -1,
                    },
                },
                {
                    $project: {
                        senderId: 1,
                        receiverId: 1,
                        lastMessage: 1,
                        createdAt: 1,
                        blockedBy: 1,
                        isSender: {
                            $cond: [
                                {
                                    $in: [
                                        "$senderId",
                                        [
                                            userId
                                        ],
                                    ],
                                },
                                1,
                                2,
                            ],
                        },
                        isBloked: {
                            $cond: [
                                {
                                    $in: [
                                        "$blockedBy",
                                        [
                                            userId
                                        ],
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "senderId",
                        foreignField: "_id",
                        as: "senderId",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    image: 1,
                                    isOnline: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: "$senderId",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "receiverId",
                        foreignField: "_id",
                        as: "receiverId",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    image: 1,
                                    isOnline: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: "$receiverId",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $project: {
                        recever: {
                            $cond: [
                                { $eq: ["$isSender", 1] },
                                "$receiverId",
                                "$senderId",
                            ],
                        },
                        lastMessage: 1,
                        isBloked: 1,
                    },
                },
                {
                    $project: {
                        _id: "$recever._id",
                        name: "$recever.name",
                        image: "$recever.image",
                        isOnline: "$recever.isOnline",
                        lastMessage: 1,
                        isBloked: 1,
                    },
                },
            ])
            io.to(socketId).emit("chats-get-status", {
                status: 200,
                message: "Get chat list succesfully",
                data: list
            });
        }
        catch (err) {
            console.log('err =============>', err);
            errorNotifyer(io, socket, err);
        }
    },
    getMessageListig: async (io, socket, data) => {
        try {
            const validationSchem = joi
                .object()
                .required()
                .keys({
                    receiverId: joi.string().required(),
                });
            dataValidator(validationSchem, data);
            const { receiverId } = data;
            const senderId = socket?.userData?.id;
            const socketId = socket?.id;
            const isChatExist = await chatModel.findOne({
                $or: [{ senderId, receiverId }, { receiverId: senderId, senderId: receiverId }],
            });
            let messages = [];
            if (isChatExist) {
                messages = await messageModel.aggregate([
                    {
                        $match: {
                            chatId: isChatExist?._id,
                            deletedBy: {
                                $nin: [new mongoose.Types.ObjectId(senderId)]
                            }
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "senderId",
                            foreignField: "_id",
                            as: "senderId",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        image: 1,
                                        isOnline: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "receiverId",
                            foreignField: "_id",
                            as: "receiverId",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        image: 1,
                                        isOnline: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$senderId",
                            preserveNullAndEmptyArrays: false,
                        },
                    },
                    {
                        $unwind: {
                            path: "$receiverId",
                            preserveNullAndEmptyArrays: false,
                        },
                    },
                    {
                        $project: {
                            senderId: 1,
                            receiverId: 1,
                            message: 1,
                            message_type: 1,
                            is_read: 1,
                            mesageType: {
                                $cond: [
                                    {
                                        $in: [
                                            "$senderId._id",
                                            [
                                                new mongoose.Types.ObjectId(senderId)
                                            ],
                                        ],
                                    },
                                    1,
                                    2,
                                ],
                            },
                            createdAt: 1
                        },
                    },
                    {
                        $project: {
                            message: 1,
                            message_type: 1,
                            is_read: 1,
                            mesageType: 1,
                            currentUser: {
                                $cond: [
                                    { $in: ["$mesageType", [1]] },
                                    "$senderId",
                                    "$receiverId",
                                ],
                            },
                            createdAt: 1
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $project: {
                            message: 1,
                            message_type: 1,
                            mesageType: 1,
                            is_read: 1,
                            name: "$currentUser.name",
                            image: "$currentUser.image",
                            isOnline: "$currentUser.isOnline",
                            createdAt: 1
                        },
                    },
                ])
            }
            io.to(socketId).emit("get-message-listing-status", {
                status: 200,
                message: "Get message list succesfully",
                data: messages
            });
        }
        catch (err) {
            console.log('err =============>', err);
            errorNotifyer(io, socket, err);
        }
    },
    claerUserChats: async (io, socket, data) => {
        try {
            const validationSchem = joi
                .object()
                .required()
                .keys({
                    receiverId: joi.string().required(),
                });
            dataValidator(validationSchem, data);
            const { receiverId } = data;
            const senderId = socket?.userData?.id;
            const socketId = socket?.id;
            if (senderId.toString() === receiverId) throw "Invalied receiverId";
            const isChatExist = await chatModel.findOne({
                $or: [{ senderId, receiverId }, { receiverId: senderId, senderId: receiverId }],
            });
            if (isChatExist) {
                await messageModel.updateMany({ chatId: isChatExist?._id }, { $set: { deletedBy: senderId } })
            }
            //clear-chats
            io.to(socketId).emit("clear-chats-status", {
                status: 200,
                message: "Chats clear succesfully",
            });
        }
        catch (err) {
            console.log('err =============>', err);
            errorNotifyer(io, socket, err);
        }
    }


    // import controllers from "./controllers.js"
export default(io) => {
    io.use((socket, next) => controllers.authConnection(io, socket, next));
    io.on("connection", (socket) => {
        controllers.handdleDuplicateConnection(io, socket);
        controllers.handdleUserConnect(io, socket);
        socket.on("send-message", (data) => controllers.sendMessage(io, socket, data))
        socket.on("chats", (data) => controllers.getChatListing2(io, socket, data));
        socket.on("get-message-listing", (data) => controllers.getMessageListig(io, socket, data))
        socket.on("clear-chats", (data) => controllers.claerUserChats(io, socket, data))
        socket.on("start-tracking", (data) => controllers.startTracking(io, socket, data))
        socket.on("disconnect", (data) => controllers.disconnectUser(io, socket, data))
        socket.on('disconnectClient', () => {
            socket.disconnect();
        });
    });
}
}












