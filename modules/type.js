import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const TypeSchema = new mongoose.Schema({
    typeName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "type" }
);

const Type = mongoose.model("Type", TypeSchema);

async function initializeTypes() {
    await db();
    const TypeList = [
        {
            "typeName": "6 inch",
            "CreatedDate": new Date(),
        }
    ];
    return await Type.insertMany(TypeList);
}

async function addType(typeName) {
    await db();
    return await Type.create(typeName);
}

async function getType() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await Type.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneType(id) {
    await db();
    return await Type.findById(id).exec(); 
}

async function updateType(id,updatedType) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) }; 
    return await Type.updateOne(filter, { $set: { typeName: updatedType.typeName } });
}


//function: deleteOne()
async function deleteType(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    await Type.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await Type.deleteMany({});
}


const typeFunction = {
    getType,
    initializeTypes,
    addType,
    reset,
    deleteType,
    getOneType,
    updateType,
    // export tags
    Type, 
    TypeSchema
}

export default typeFunction;

