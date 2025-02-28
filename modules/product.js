import mongoose from "mongoose";
import db from './db.js';
import { ObjectId } from "mongodb";
import categoryFunction from './category.js';
import rawMaterialFunction from './rawMaterial.js';
import originFunction from './origin.js';
import typeFunction from './type.js';
import colorFunction from './color.js';
import manufactoringProcessFunction from './manufactoringProcess.js';
const { Category } =categoryFunction;
const { RawMaterial } =rawMaterialFunction;
const { Origin } =originFunction;
const { Type } =typeFunction;
const { Color } =colorFunction;
const {ManufactoringProcess} = manufactoringProcessFunction;

const ProductSchema = new mongoose.Schema({
    ProductName: String,
    Category:[{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    RawMaterial:[{ type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial" }],
    Desc: String,
    Origin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Origin" }],
    Type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
    Color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    ManufactoringProcess:[{ type: mongoose.Schema.Types.ObjectId, ref: "ManufactoringProcess" }],
    CreatedDate: { type: Date, default: Date.now },
},
    { collection: "products" });

const Product = mongoose.model("Product", ProductSchema);

async function initializeProducts() {
    await db();
    // let category = await Category.findOne({ categoryName: "wool" });
    // if (!category) {
    //     category = await categoryFunction.initializeCategories();
    // }
    // let rawMaterial = await RawMaterial.findOne({ rawMaterialName: "wool" });
    // if (!rawMaterial) {
    //     rawMaterial = await rawMaterialFunction.initializeRawMaterials;
    // }
    // let origin = await Origin.findOne({ originName: "Pakistan" });
    // if (!origin) {
    //     origin = await originFunction.initializeOrigins();
    // }
    // let type = await Type.findOne({ typeName: "type" });
    // if (!type) {
    //     type = await typeFunction.initializeTypes();
    // }
    // let color = await Color.findOne({ colorName: "6 inch" });
    // if (!color) {
    //     color = await colorFunction.initializeColors();
    // }
    // let manufactoringProcess = await ManufactoringProcess.findOne({ manufactoringProcessName: "manufactoringProcess" });
    // if (!manufactoringProcess) {
    //     manufactoringProcess = await ManufactoringProcess.create({ manufactoringProcessName: "manufactoringProcess"  });
    // }

    const productList = [
        {
            ProductName: "Template Product Name",
            Category: [Category._id],
            RawMaterial: [RawMaterial._id],
            Desc: "Template Description",
            Origin: [Origin._id],
            Type: [Type._id],
            Color: [Color._id],
            ManufactoringProcess:[ManufactoringProcess._id],
            CreatedDate: new Date('2025-02-22'),
        }

    ];
    return await Product.insertMany(productList);
}

async function addProduct(newProduct) {
    await db();

    let categories = Array.isArray(newProduct.Category) 
    ? await Category.find({ _id: { $in: newProduct.Category.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];

    let rawMaterials = Array.isArray(newProduct.RawMaterial) 
        ? await RawMaterial.find({ _id: { $in: newProduct.RawMaterial.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];

    let origins = Array.isArray(newProduct.Origin) 
        ? await Origin.find({ _id: { $in: newProduct.Origin.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];

    let types = Array.isArray(newProduct.Type) 
        ? await Type.find({ _id: { $in: newProduct.Type.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];

    let colors = Array.isArray(newProduct.Color) 
        ? await Color.find({ _id: { $in: newProduct.Color.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];

    let manufactoringProcesses = Array.isArray(newProduct.ManufactoringProcess) 
        ? await ManufactoringProcess.find({ _id: { $in: newProduct.ManufactoringProcess.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];

    let productData = {
        ProductName: newProduct.ProductName,
        Category: categories.map(category => category._id),
        RawMaterial: rawMaterials.map(rawMaterial => rawMaterial._id), 
        Desc: newProduct.Desc,
        Origin: origins.map(origin => origin._id),
        Type: types.map(type => type._id),
        Color: colors.map(color => color._id),
        ManufactoringProcess: manufactoringProcesses.map(manufactoringProcess => manufactoringProcess._id),
        CreatedDate: newProduct.CreatedDate,
    };
    await Product.create(productData);
}

async function getProducts() {
    await db();
    // for sort(), you can use "asc", "desc", (or 1, -1)
    return await Product.find({})
        .populate('Category')
        .populate('RawMaterial')
        .populate('Origin')
        .populate('Type')
        .populate('Color')
        .populate('ManufactoringProcess')
        .sort({ CreatedDate: -1 }); 
}


async function getOneProduct(id) {
    await db();
    return await Product.findById(id)
    .populate('Category')
    .populate('RawMaterial')
    .populate('Origin')
    .populate('Type')
    .populate('Color')
    .populate('ManufactoringProcess')
    .exec(); 
}

async function updateProduct(filter,updatedProduct) {
    await db();
    console.log("Inside updateProduct:", updatedProduct);

    let categories = Array.isArray(updatedProduct.Category) 
        ? await Category.find({ _id: { $in: updatedProduct.Category.map(id => new mongoose.Types.ObjectId(id)) } }) 
        : [];
        console.log("Selected Categories:", categories);

    let rawMaterials = Array.isArray(updatedProduct.RawMaterial) 
    ? await RawMaterial.find({ _id: { $in: updatedProduct.RawMaterial.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];
    console.log("Selected RawMaterial:", rawMaterials);

    let origins = Array.isArray(updatedProduct.Origin) 
    ? await Origin.find({ _id: { $in: updatedProduct.Origin.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];
    console.log("Selected Categories:", origins);

    let types = Array.isArray(updatedProduct.Type) 
    ? await Type.find({ _id: { $in: updatedProduct.Type.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];
    console.log("Selected Types:", types);

    let colors = Array.isArray(updatedProduct.Color) 
    ? await Color.find({ _id: { $in: updatedProduct.Color.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];
    console.log("Selected Colors:", colors);

    let manufactoringProcesses = Array.isArray(updatedProduct.ManufactoringProcess) 
    ? await ManufactoringProcess.find({ _id: { $in: updatedProduct.ManufactoringProcess.map(id => new mongoose.Types.ObjectId(id)) } }) 
    : [];
    console.log("Selected manufactoringProcesses:", manufactoringProcesses);

    let updateFields = {
        "ProductName": updatedProduct.ProductName,
        "Category": categories.map(category => category._id),
        "RawMaterial": rawMaterials.map(rawMaterial => rawMaterial._id), 
        "Desc": updatedProduct.Desc,
        "Origin": origins.map(origin => origin._id),
        "Type": types.map(type => type._id),
        "Color": colors.map(color => color._id),
        "ManufactoringProcess":manufactoringProcesses.map(manufactoringProcess => manufactoringProcess._id),

    };
    console.log("Update Fields:", updateFields);

    return await Product.updateOne(filter,{ $set: updateFields }); 
}


//function: deleteOne()
async function deleteProduct(id) {
    await db();
    let filter = { _id: new ObjectId(id) };
    //let filter = { _id: new mongoose.Types.ObjectId(id) };
    await Product.deleteOne(filter);
}

//function: deleteMany()
async function reset() {
    await db();
    await Product.deleteMany({});
}

const productFunction = {
    getProducts,
    initializeProducts,
    addProduct,
    reset,
    deleteProduct,
    getOneProduct,
    updateProduct,
    Product,
    ProductSchema
}

export default productFunction;