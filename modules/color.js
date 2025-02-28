import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const ColorSchema = new mongoose.Schema({
    colorName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "color" }
);

const Color = mongoose.model("Color", ColorSchema);

async function initializeColors() {
    await db();
    const ColorList = [
        {
            "colorName": "#7D2A2A",
            "CreatedDate": new Date(),
        }
    ];
    return await Color.insertMany(ColorList);
}

async function addColor(colorName) {
    await db();
    return await Color.create(colorName);
}

async function getColor() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await Color.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneColor(id) {
    await db();
    return await Color.findById(id).exec(); 
}

async function updateColor(id,updatedColor) {
    await db();
    id = String(id).trim();
    let filter = { _id: new mongoose.Types.ObjectId(id) }; 
    return await Color.updateOne(filter, { $set: { colorName: updatedColor.colorName } });
}

//function: deleteOne()
async function deleteColor(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    await Color.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await Color.deleteMany({});
}


const colorFunction = {
    getColor,
    initializeColors,
    addColor,
    reset,
    deleteColor,
    getOneColor,
    updateColor,
    // export tags
    Color, 
    ColorSchema
}

export default colorFunction;

