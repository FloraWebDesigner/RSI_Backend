import mongoose from "mongoose";
import db from "./db.js";
import { ObjectId } from "mongodb";

const CategorySchema = new mongoose.Schema({
    categoryName: String,
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "category" }
);

const Category = mongoose.model("Category", CategorySchema);

async function initializeCategories() {
    await db();
    const categoryList = [
        {
            "categoryName": "Handmade Carpets",
            "CreatedDate": new Date(),
        },
        
    ];
    return await Category.insertMany(categoryList);
}


async function addCategory(newCategory) {
    await db();
    return await Category.create(newCategory);
}

async function getCategories() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await Category.find({}).sort({ CreatedDate: 1 }); 
}

async function getOneCategory(id) {
    await db();
    return await Category.findById(id).exec(); 
}

async function updateCategory(id,updatedCategory) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    return await Category.updateOne(filter, { $set: { categoryName: updatedCategory.categoryName } });
}


//function: deleteOne()
async function deleteCategory(id) {
    await db();
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    await Category.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await Category.deleteMany({});
}


const categoryFunction = {
    getCategories,
    initializeCategories,
    addCategory,
    reset,
    deleteCategory,
    getOneCategory,
    updateCategory,
    // export tags
    Category, 
    CategorySchema
}

export default categoryFunction;

