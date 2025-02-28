import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const RawMaterialSchema = new mongoose.Schema({
    rawMaterialName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "rawMaterial" }
);

const RawMaterial = mongoose.model("RawMaterial", RawMaterialSchema);

async function initializeRawMaterials() {
    await db();
    const RawMaterialList = [
        {
            "rawMaterialName": "wool",
            "CreatedDate": new Date(),
        }
    ];
    return await RawMaterial.insertMany(RawMaterialList);
}

async function addRawMaterial(newRawMaterial) {
    await db();
    return await RawMaterial.create(newRawMaterial);
}

async function getRawMaterial() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await RawMaterial.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneRawMaterial(id) {
    await db();
    return await RawMaterial.findById(id).exec(); 
}

async function updateRawMaterial(id,updatedRawMaterial) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) }; 
    return await RawMaterial.updateOne(filter, { $set: { rawMaterialName: updatedRawMaterial.rawMaterialName } });
}


//function: deleteOne()
async function deleteRawMaterial(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    await RawMaterial.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await RawMaterial.deleteMany({});
}


const rawMaterialFunction = {
    getRawMaterial,
    initializeRawMaterials,
    addRawMaterial,
    reset,
    deleteRawMaterial,
    getOneRawMaterial,
    updateRawMaterial,
    // export tags
    RawMaterial, 
    RawMaterialSchema
}

export default rawMaterialFunction;

