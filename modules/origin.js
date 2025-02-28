import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const OriginSchema = new mongoose.Schema({
    originName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "origin" }
);

const Origin = mongoose.model("Origin", OriginSchema);

async function initializeOrigins() {
        await db();
        const OriginList = [
            { "originName": "Pakistan", "CreatedDate": new Date() },
            { "originName": "Iran", "CreatedDate": new Date() },
            { "originName": "Afghanistan", "CreatedDate": new Date() },
            { "originName": "India", "CreatedDate": new Date() },
            { "originName": "Turkey", "CreatedDate": new Date() },
        ];
        return await Origin.insertMany(OriginList);

}


async function addOrigin(newOrigin) {
    await db();
    return await Origin.create(newOrigin);
}

async function getOrigins() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await Origin.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneOrigin(id) {
    await db();
    return await Origin.findById(id).exec(); 
}

async function updateOrigin(id, updatedOrigin) {
    await db();
    id = String(id).trim();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    return await Origin.updateOne(filter, { $set: { originName: updatedOrigin.originName } });
}


//function: deleteOne()
async function deleteOrigin(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    await Origin.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await Origin.deleteMany({});
}


const originFunction = {
    getOrigins,
    initializeOrigins,
    addOrigin,
    reset,
    deleteOrigin,
    getOneOrigin,
    updateOrigin,
    Origin, 
    OriginSchema
}

export default originFunction;

