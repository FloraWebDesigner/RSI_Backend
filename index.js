import express from "express";
import path from "path";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import cors from 'cors';
import { dirname } from 'path'; 
import { fileURLToPath } from 'url';
import mongoose from "mongoose"; 
import colorFunction from "./modules/color.js";
import typeFunction from "./modules/type.js";
import originFunction from "./modules/origin.js";
import productFunction from "./modules/product.js";
import categoryFunction from "./modules/category.js";
import rawMaterialFunction from "./modules/rawMaterial.js";
import manufactoringProcessFunction from "./modules/manufactoringProcess.js";


//set up Express object and port
const app = express();
const port = process.env.PORT || "8887";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/product/list", async (req, res) => {
    let productList = await productFunction.getProducts(); 
    res.json(productList); 
});

app.get("/api/origin/list", async (req, res) => {
    let originList = await originFunction.getOrigins();
    res.json(originList); 
});

app.get("/api/color/list", async (req, res) => {
    let colorList = await colorFunction.getColor();
    res.json(colorList); 
});

app.get("/api/type/list", async (req, res) => {
    let typeList = await typeFunction.getType();
    res.json(typeList); 
});

app.get("/api/category/list", async (req, res) => {
    let categoryList = await categoryFunction.getCategories();
    res.json(categoryList); 
});

app.get("/api/rawmaterial/list", async (req, res) => {
    let rawMaterialList = await rawMaterialFunction.getRawMaterial();
    res.json(rawMaterialList); 
});

app.get("/api/manufactoringProcess/list", async (req, res) => {
    let manufactoryList = await manufactoringProcessFunction.getManufactoringProcess();
    res.json(manufactoryList); 
});

app.get("/api/data", async (req, res) => {
    try {
        const [
            products,
            origins,
            colors,
            types,
            categories,
            rawMaterials,
            manufactoringProcesses
        ] = await Promise.all([
            productFunction.getProducts(),
            originFunction.getOrigins(),
            colorFunction.getColor(),
            typeFunction.getType(),
            categoryFunction.getCategories(),
            rawMaterialFunction.getRawMaterial(),
            manufactoringProcessFunction.getManufactoringProcess()
        ]);

        res.json({
            products,
            origins,
            colors,
            types,
            categories,
            rawMaterials,
            manufactoringProcesses
        }); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});



app.get("/", async (request, response) => {
    // Run for the first time or data reset

    // await originFunction.reset();
    // await typeFunction.reset();
    // await colorFunction.reset();
    // await categoryFunction.reset();
    // await rawMaterialFunction.reset();
    // await manufactoringProcessFunction.reset();
    // await productFunction.reset();

    // let originList = await originFunction.initializeOrigins();
    // let typeList = await typeFunction.initializeTypes();
    // let colorList = await colorFunction.initializeColors();
    // let categoryList = await categoryFunction.initializeCategories();
    // let rawMaterialList = await rawMaterialFunction.initializeRawMaterials();
    // let manufactoringProcessList =  await manufactoringProcessFunction.initializeManufactoringProcesss();
    // let productList = await productFunction.initializeProducts();

    let productList = await productFunction.getProducts();
    let originList = await originFunction.getOrigins();
    let typeList = await typeFunction.getType()
    let colorList = await colorFunction.getColor();   
    let categoryList = await categoryFunction.getCategories();
    let rawMaterialList = await rawMaterialFunction.getRawMaterial();
    let manufactoringProcessList = await manufactoringProcessFunction.getManufactoringProcess();

    // console.log("productList: ",productList);

    response.render("layout", { 
        productList,
        originList,
        typeList,
        colorList,
        categoryList,
        rawMaterialList,
        manufactoringProcessList
    })
}
);


app.get("/list", async (request, response) => {
    // Run for the first time or data reset

    // await originFunction.reset();
    // await typeFunction.reset();
    // await colorFunction.reset();
    // await categoryFunction.reset();
    // await rawMaterialFunction.reset();
    // await manufactoringProcessFunction.reset();
    // await productFunction.reset();

    // let originList = await originFunction.initializeOrigins();
    // let typeList = await typeFunction.initializeTypes();
    // let colorList = await colorFunction.initializeColors();
    // let categoryList = await categoryFunction.initializeCategories();
    // let rawMaterialList = await rawMaterialFunction.initializeRawMaterials();
    // let manufactoringProcessList =  await manufactoringProcessFunction.initializeManufactoringProcesss();
    // let productList = await productFunction.initializeProducts();

    // let productList = await productFunction.getProducts();
    let originList = await originFunction.getOrigins();
    let typeList = await typeFunction.getType()
    let colorList = await colorFunction.getColor();   
    let categoryList = await categoryFunction.getCategories();
    let rawMaterialList = await rawMaterialFunction.getRawMaterial();
    let manufactoringProcessList = await manufactoringProcessFunction.getManufactoringProcess();

    // let productCount=productList.length;
    let originCount=originList.length;
    let colorCount=colorList.length;
    let typeCount=typeList.length;
    let rawMaterialCount=rawMaterialList.length;
    let categoryCount=categoryList.length;
    let manufactoringProcessCount = manufactoringProcessList.length;

    response.render("list", { 
        title: "RSI Product Management", 
        // productCount:productCount,
        originCount:originCount,
        colorCount:colorCount,
        typeCount:typeCount,
        rawMaterialCount:rawMaterialCount,
        categoryCount:categoryCount,
        manufactoringProcessCount:manufactoringProcessCount,
        // productList,
        originList,
        typeList,
        colorList,
        categoryList,
        rawMaterialList,
        manufactoringProcessList
    })
}
);

app.post("/origin/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newOrigin = {
        "originName": request.body.originName,
        CreatedDate: new Date()
    };
    await originFunction.addOrigin(newOrigin);
    response.redirect("/list");
});

app.get("/origin/delete", async (request, response) => {
    let id = request.query.originId;
    await originFunction.deleteOrigin(id);
    response.redirect("/list");
})

app.post("/origin/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.originId;
    let updatedOrigin = { originName: request.body.originName };
    console.log('Request body:', request.body);
    await originFunction.updateOrigin(id, updatedOrigin);
    response.json({ success: true, message: 'Origin updated successfully' });
})

app.post("/color/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newColor = {
        "colorName": request.body.colorName,
        CreatedDate: new Date()
    };
    await colorFunction.addColor(newColor);
    response.redirect("/list");
});

app.get("/color/delete", async (request, response) => {
    let id = request.query.colorId;
    await colorFunction.deleteColor(id);
    response.redirect("/list");
})

app.post("/color/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.colorId;
    let updatedColor = { colorName: request.body.colorName };
    console.log('Request body:', request.body);
    await colorFunction.updateColor(id, updatedColor);
    response.json({ success: true, message: 'Color updated successfully' });
})

app.post("/type/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newType = {
        "typeName": request.body.typeName,
        CreatedDate: new Date()
    };
    await typeFunction.addType(newType);
    response.redirect("/list");
});

app.get("/type/delete", async (request, response) => {
    let id = request.query.typeId;
    await typeFunction.deleteType(id);
    response.redirect("/list");
})

app.post("/type/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.typeId;
    let updatedType = { typeName: request.body.typeName };
    console.log('Request body:', request.body);
    await typeFunction.updateType(id, updatedType);
    response.json({ success: true, message: 'Type updated successfully' });
})

app.post("/rawmaterial/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newRawMaterial = {
        "rawMaterialName": request.body.rawMaterialName,
        CreatedDate: new Date()
    };
    await rawMaterialFunction.addRawMaterial(newRawMaterial);
    response.redirect("/list");
});

app.get("/rawmaterial/delete", async (request, response) => {
    let id = request.query.rawMaterialId;
    await rawMaterialFunction.deleteRawMaterial(id);
    response.redirect("/list");
})

app.post("/rawmaterial/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.rawMaterialId;
    let updatedRawMaterial = { rawMaterialName: request.body.rawMaterialName };
    console.log('Request body:', request.body);
    await rawMaterialFunction.updateRawMaterial(id, updatedRawMaterial);
    response.json({ success: true, message: 'Raw Material updated successfully' });
})
    
app.post("/category/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newCategory = {
        "categoryName": request.body.categoryName,
        CreatedDate: new Date()
    };
    await categoryFunction.addCategory(newCategory);
    response.redirect("/list");
});

app.get("/category/delete", async (request, response) => {
    let id = request.query.categoryId;
    await categoryFunction.deleteCategory(id);
    response.redirect("/list");
})

app.post("/category/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.categoryId;
    let updatedCategory = { categoryName: request.body.categoryName };
    console.log('Request body:', request.body);
    await categoryFunction.updateCategory(id, updatedCategory);
    response.json({ success: true, message: 'Category updated successfully' });
})

app.post("/manufactoringprocess/add/submit", async (request, response) => {
    console.log(request.body);
    //get form data 
    let newManufactory = {
        "manufactoringProcessName": request.body.manufactoringProcessName,
        CreatedDate: new Date()
    };
    await manufactoringProcessFunction.addManufactoringProcess(newManufactory);
    response.redirect("/list");
});

app.get("/manufactoringprocess/delete", async (request, response) => {
    let id = request.query.manufactoringProcessId;
    await manufactoringProcessFunction.deleteManufactoringProcess(id);
    response.redirect("/list");
})

app.post("/manufactoringprocess/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.manufactoringProcessId;
    let updateManufactoringProcess = { manufactoringProcessName: request.body.manufactoringProcessName };
    console.log('Request body:', request.body);
    await manufactoringProcessFunction.updateManufactoringProcess(id, updateManufactoringProcess);
    response.json({ success: true, message: 'manufactoringProcess updated successfully' });
})
    

app.post("/business/add/submit", async (request, response) => {
    console.log("project ADD: ",request.body);
    //get form data 
    let newProduct = {
        "ProductName": request.body.ProductName || "",
        "Category": Array.isArray(request.body.Category) ? request.body.Category : (request.body.Category ? [request.body.Category] : []),
        "RawMaterial":Array.isArray(request.body.RawMaterial) ? request.body.RawMaterial : (request.body.RawMaterial ? [request.body.RawMaterial] : []),
        "Desc":request.body.Desc || "",
        "Origin":Array.isArray(request.body.Origin) ? request.body.Origin : (request.body.Origin ? [request.body.Origin] : []),
        "Type":Array.isArray(request.body.Type) ? request.body.Type : (request.body.Type ? [request.body.Type] : []),
        "Color":Array.isArray(request.body.Color) ? request.body.Color : (request.body.Color ? [request.body.Color] : []),
        "ManufactoringProcess":Array.isArray(request.body.ManufactoringProcess) ? request.body.ManufactoringProcess : (request.body.ManufactoringProcess ? [request.body.ManufactoringProcess] : []),
        CreatedDate: new Date()
    };

    console.log("New Product Data:", newProduct);

    await productFunction.addProduct(newProduct);
    response.redirect("/");
});

app.get("/product/delete", async (request, response) => {
    let id = request.query.productId;
    await productFunction.deleteProduct(id);
    response.redirect("/");
});

app.get("/product/edit", async (request, response) => {
    if (request.query.productId) {
        let businessEdit = await productFunction.getOneProduct(request.query.productId);
        return response.json(businessEdit);
    } else {
    return response.status(400).json({ error: "Product ID is required" });
}
});


//set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});
