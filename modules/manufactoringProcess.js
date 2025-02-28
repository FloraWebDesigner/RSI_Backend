import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const ManufactoringProcessSchema = new mongoose.Schema({
    manufactoringProcessName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "manufactoringProcess" }
);

const ManufactoringProcess = mongoose.model("ManufactoringProcess", ManufactoringProcessSchema);

async function initializeManufactoringProcesss() {
    await db();
    const ManufactoringProcessList = [
        {
            "manufactoringProcessName": "6 inch",
            "CreatedDate": new Date(),
        }
    ];
    return await ManufactoringProcess.insertMany(ManufactoringProcessList);
}

async function addManufactoringProcess(newManufactoringProcess) {
    await db();
    return await ManufactoringProcess.create(newManufactoringProcess);
}

async function getManufactoringProcess() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await ManufactoringProcess.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneManufactoringProcess(id) {
    await db();
    return await ManufactoringProcess.findById(id).exec(); 
}

async function updateManufactoringProcess(id,updatedManufactoringProcess) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) }; 
    return await ManufactoringProcess.updateOne(filter, { $set: { manufactoringProcessName: updatedManufactoringProcess.manufactoringProcessName } });
}


//function: deleteOne()
async function deleteManufactoringProcess(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) }; 
    await ManufactoringProcess.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await ManufactoringProcess.deleteMany({});
}


const manufactoringProcessFunction = {
    getManufactoringProcess,
    initializeManufactoringProcesss,
    addManufactoringProcess,
    reset,
    deleteManufactoringProcess,
    getOneManufactoringProcess,
    updateManufactoringProcess,
    // export tags
    ManufactoringProcess, 
    ManufactoringProcessSchema
}

export default manufactoringProcessFunction;

