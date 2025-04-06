import express from "express";
import path from "path";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import cors from 'cors';
import { fileURLToPath } from 'url';
import mongoose from "mongoose"; 
import colorFunction from "./modules/color.js";
import typeFunction from "./modules/type.js";
import originFunction from "./modules/origin.js";
import productFunction from "./modules/product.js";
import categoryFunction from "./modules/category.js";
import rawMaterialFunction from "./modules/rawMaterial.js";
import manufactoringProcessFunction from "./modules/manufactoringProcess.js";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// const swaggerUI = require(‘swagger-ui-express’);
// const swaggerSpec = require(‘./swagger’);

//set up Express object and port
const app = express();
const port = process.env.PORT || "8888";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, "public")));

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management
 *   - name: Origins
 *     description: Origin management
 *   - name: Colors
 *     description: Color management
 *   - name: Types
 *     description: Type management
  *   - name: Processes
 *     description: Process management
 *   - name: Categories
 *     description: Category management
 *   - name: Materials
 *     description: Material management
 */

/**
 * @swagger
 * /api/product/list:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/api/product/list", async (req, res) => {
    let productList = await productFunction.getProducts(); 
    res.json(productList); 
});

/**
 * @swagger
 * /api/origin/list:
 *   get:
 *     tags: [Origins]
 *     summary: Get all origins
 *     responses:
 *       200:
 *         description: List of all origins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Origin'
 */
app.get("/api/origin/list", async (req, res) => {
    let originList = await originFunction.getOrigins();
    res.json(originList); 
});


/**
 * @swagger
 * /api/color/list:
 *   get:
 *     tags: [Colors]
 *     summary: Get all colors
 *     responses:
 *       200:
 *         description: A list of colors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Color'
 *       500:
 *         description: Server error
 */
app.get("/api/color/list", async (req, res) => {
    let colorList = await colorFunction.getColor();
    res.json(colorList); 
});

/**
 * @swagger
 * /api/type/list:
 *   get:
 *     tags: [Types]
 *     summary: Get all product types
 *     responses:
 *       200:
 *         description: A list of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 *       500:
 *         description: Server error
 */
app.get("/api/type/list", async (req, res) => {
    let typeList = await typeFunction.getType();
    res.json(typeList); 
});

/**
 * @swagger
 * /api/category/list:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
app.get("/api/category/list", async (req, res) => {
    let categoryList = await categoryFunction.getCategories();
    res.json(categoryList); 
});

/**
 * @swagger
 * /api/rawmaterial/list:
 *   get:
 *     tags: [Materials]
 *     summary: Get all raw materials
 *     responses:
 *       200:
 *         description: A list of raw materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RawMaterial'
 *       500:
 *         description: Server error
 */
app.get("/api/rawmaterial/list", async (req, res) => {
    let rawMaterialList = await rawMaterialFunction.getRawMaterial();
    res.json(rawMaterialList); 
});

/**
 * @swagger
 * /api/manufactoringProcess/list:
 *   get:
 *     tags: [Processes]
 *     summary: Get all manufacturing processes
 *     responses:
 *       200:
 *         description: A list of manufacturing processes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ManufacturingProcess'
 *       500:
 *         description: Server error
 */
app.get("/api/manufactoringProcess/list", async (req, res) => {
    let manufactoryList = await manufactoringProcessFunction.getManufactoringProcess();
    res.json(manufactoryList); 
});

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get all data collections
 *     responses:
 *       200:
 *         description: Combined data from all collections
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 origins:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Origin'
 *                 colors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Color'
 *                 types:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Type'
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 rawMaterials:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RawMaterial'
 *                 manufactoringProcesses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ManufactoringProcess'
 */
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

/**
 * @swagger
 * /origin/add/submit:
 *   post:
 *     tags: [Origins]
 *     summary: Add a new origin
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               originName:
 *                 type: string
 *                 description: Name of the origin
 *                 example: "China123"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Origin added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Origin added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Origin'
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.post("/origin/add/submit", async (request, response) => {
    try {
        console.log("Request body:", request.body); // Debug log
        console.log("Received originName:", request.body.originName); // Debug log

        let newOrigin = {
            originName: request.body.originName,
            CreatedDate: new Date()
        };

        await originFunction.addOrigin(newOrigin);

        // Check if redirect is disabled
        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Origin added successfully",
                data: newOrigin
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add origin",
            error: error.message
        });
    }
});
// app.post("/origin/add/submit", async (request, response) => {
//     // console.log(request.body);
//     //get form data 
//     let newOrigin = {
//         "originName": request.body.originName,
//         CreatedDate: new Date()
//     };
//     await originFunction.addOrigin(newOrigin);
//     response.redirect("/list");
// });

/**
 * @swagger
 * /origin/delete:
 *   get:
 *     tags: [Origins]
 *     summary: Delete an origin
 *     parameters:
 *       - in: query
 *         name: originId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the origin to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Origin not found
 *       500:
 *         description: Internal server error
 */
app.get("/origin/delete", async (request, response) => {
    let id = request.query.originId;
    await originFunction.deleteOrigin(id);
    response.redirect("/list");
})

/**
 * @swagger
 * /origin/edit/submit:
 *   post:
 *     tags: [Origins]
 *     summary: Update an origin
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               originName:
 *                 type: string
 *                 example: "New Origin Name"
 *             required:
 *               - originId
 *               - originName
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Origin updated successfully"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
app.post("/origin/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.originId;
    let updatedOrigin = { originName: request.body.originName };
    console.log('Request body:', request.body);
    await originFunction.updateOrigin(id, updatedOrigin);
    response.json({ success: true, message: 'Origin updated successfully' });
})

/**
 * @swagger
 * /color/add/submit:
 *   post:
 *     tags: [Colors]
 *     summary: Add a new color
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               colorName:
 *                 type: string
 *                 description: Name of the color
 *                 example: "Red"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Color added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Color added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     colorName:
 *                       type: string
 *                       example: "Red"
 *                     CreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-06T15:35:07.870Z"
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 */
app.post("/color/add/submit", async (request, response) => {
    try {
        let newColor = {
            colorName: request.body.colorName,
            CreatedDate: new Date()
        };

        await colorFunction.addColor(newColor);

        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Color added successfully",
                data: newColor
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add color",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /color/delete:
 *   get:
 *     tags: [Colors]
 *     summary: Delete a color
 *     parameters:
 *       - in: query
 *         name: colorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the color to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Color not found
 *       500:
 *         description: Internal server error
 */
app.get("/color/delete", async (request, response) => {
    let id = request.query.colorId;
    await colorFunction.deleteColor(id);
    response.redirect("/list");
})


/**
 * @swagger
 * /color/edit/submit:
 *   post:
 *     tags: [Colors]
 *     summary: Update a color
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               colorId:
 *                 type: string
 *               colorName:
 *                 type: string
 *             required:
 *               - colorId
 *               - colorName
 *     responses:
 *       200:
 *         description: Color updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.post("/color/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.colorId;
    let updatedColor = { colorName: request.body.colorName };
    await colorFunction.updateColor(id, updatedColor);
    response.json({ success: true, message: 'Color updated successfully' });
})

/**
 * @swagger
 * /type/add/submit:
 *   post:
 *     tags: [Types]
 *     summary: Add a new type
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               typeName:
 *                 type: string
 *                 description: Name of the type
 *                 example: "Apparel"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Type added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Type added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     typeName:
 *                       type: string
 *                       example: "Apparel"
 *                     CreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-06T15:35:07.870Z"
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 */
app.post("/type/add/submit", async (request, response) => {
    try {
        let newType = {
            typeName: request.body.typeName,
            CreatedDate: new Date()
        };

        await typeFunction.addType(newType);

        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Type added successfully",
                data: newType
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add type",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /type/delete:
 *   get:
 *     tags: [Types]
 *     summary: Delete a type
 *     parameters:
 *       - in: query
 *         name: typeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the type to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Type not found
 *       500:
 *         description: Internal server error
 */
app.get("/type/delete", async (request, response) => {
    let id = request.query.typeId;
    await typeFunction.deleteType(id);
    response.redirect("/list");
})

/**
 * @swagger
 * /type/edit/submit:
 *   post:
 *     tags: [Types]
 *     summary: Update a type
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               typeName:
 *                 type: string
 *                 example: "New Type Name"
 *             required:
 *               - typeId
 *               - typeName
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Type updated successfully"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
app.post("/type/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.typeId;
    let updatedType = { typeName: request.body.typeName };
    await typeFunction.updateType(id, updatedType);
    response.json({ success: true, message: 'Type updated successfully' });
})
/**
 * @swagger
 * /rawmaterial/add/submit:
 *   post:
 *     tags: [Materials]
 *     summary: Add a new raw material
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               rawMaterialName:
 *                 type: string
 *                 description: Name of the raw material
 *                 example: "Organic Cotton"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Raw material added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Raw material added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rawMaterialName:
 *                       type: string
 *                       example: "Organic Cotton"
 *                     CreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-06T15:35:07.870Z"
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 */
app.post("/rawmaterial/add/submit", async (request, response) => {
    try {
        let newRawMaterial = {
            rawMaterialName: request.body.rawMaterialName,
            CreatedDate: new Date()
        };

        await rawMaterialFunction.addRawMaterial(newRawMaterial);

        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Raw material added successfully",
                data: newRawMaterial
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add raw material",
            error: error.message
        });
    }
});
/**
 * @swagger
 * /rawmaterial/delete:
 *   get:
 *     tags: [Materials]
 *     summary: Delete a raw material
 *     parameters:
 *       - in: query
 *         name: rawMaterialId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the material to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Material not found
 *       500:
 *         description: Internal server error
 */
app.get("/rawmaterial/delete", async (request, response) => {
    let id = request.query.rawMaterialId;
    await rawMaterialFunction.deleteRawMaterial(id);
    response.redirect("/list");
})
/**
 * @swagger
 * /rawmaterial/edit/submit:
 *   post:
 *     tags: [Materials]
 *     summary: Update a raw material
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rawMaterialId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *               rawMaterialName:
 *                 type: string
 *                 example: "New Material Name"
 *             required:
 *               - rawMaterialId
 *               - rawMaterialName
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Raw Material updated successfully"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
app.post("/rawmaterial/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.rawMaterialId;
    let updatedRawMaterial = { rawMaterialName: request.body.rawMaterialName };
    // console.log('Request body:', request.body);
    await rawMaterialFunction.updateRawMaterial(id, updatedRawMaterial);
    response.json({ success: true, message: 'Raw Material updated successfully' });
})

/**
 * @swagger
 * /category/add/submit:
 *   post:
 *     tags: [Categories]
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: Name of the category
 *                 example: "Clothing"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Clothing"
 *                     CreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-06T15:35:07.870Z"
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 */
app.post("/category/add/submit", async (request, response) => {
    try {
        let newCategory = {
            categoryName: request.body.categoryName,
            CreatedDate: new Date()
        };

        await categoryFunction.addCategory(newCategory);

        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Category added successfully",
                data: newCategory
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add category",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /category/delete:
 *   get:
 *     tags: [Categories]
 *     summary: Delete a category
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
app.get("/category/delete", async (request, response) => {
    let id = request.query.categoryId;
    await categoryFunction.deleteCategory(id);
    response.redirect("/list");
})

/**
 * @swagger
 * /category/edit/submit:
 *   post:
 *     tags: [Categories]
 *     summary: Update a category
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439014"
 *               categoryName:
 *                 type: string
 *                 example: "New Category Name"
 *             required:
 *               - categoryId
 *               - categoryName
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
app.post("/category/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.categoryId;
    let updatedCategory = { categoryName: request.body.categoryName };
    await categoryFunction.updateCategory(id, updatedCategory);
    response.json({ success: true, message: 'Category updated successfully' });
})

/**
 * @swagger
 * /manufactoringprocess/add/submit:
 *   post:
 *     tags: [Processes]
 *     summary: Add a new manufacturing process
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               manufactoringProcessName:
 *                 type: string
 *                 description: Name of the manufacturing process
 *                 example: "Hand Weaving"
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to "false" to return JSON instead of redirecting
 *     responses:
 *       200:
 *         description: Manufacturing process added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Manufacturing process added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     manufactoringProcessName:
 *                       type: string
 *                       example: "Hand Weaving"
 *                     CreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-06T15:35:07.870Z"
 *       302:
 *         description: Redirects to /list on success
 *       500:
 *         description: Internal server error
 */
app.post("/manufactoringprocess/add/submit", async (request, response) => {
    try {
        let newManufactory = {
            manufactoringProcessName: request.body.manufactoringProcessName,
            CreatedDate: new Date()
        };

        await manufactoringProcessFunction.addManufactoringProcess(newManufactory);

        if (request.query.redirect === "false") {
            response.status(200).json({
                success: true,
                message: "Manufacturing process added successfully",
                data: newManufactory
            });
        } else {
            response.redirect("/list");
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to add manufacturing process",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /manufactoringprocess/delete:
 *   get:
 *     tags: [Processes]
 *     summary: Delete a manufacturing process
 *     parameters:
 *       - in: query
 *         name: manufactoringProcessId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the process to delete
 *     responses:
 *       302:
 *         description: Redirects to /list on success
 *       404:
 *         description: Process not found
 *       500:
 *         description: Internal server error
 */
app.get("/manufactoringprocess/delete", async (request, response) => {
    let id = request.query.manufactoringProcessId;
    await manufactoringProcessFunction.deleteManufactoringProcess(id);
    response.redirect("/list");
})

/**
 * @swagger
 * /manufactoringprocess/edit/submit:
 *   post:
 *     tags: [Processes]
 *     summary: Update a manufacturing process
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               manufactoringProcessId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439015"
 *               manufactoringProcessName:
 *                 type: string
 *                 example: "New Process Name"
 *             required:
 *               - manufactoringProcessId
 *               - manufactoringProcessName
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Manufactoring process updated successfully"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
app.post("/manufactoringprocess/edit/submit", async (request, response) => {
    //get the _id and set it as a JSON object to be used for the filter
    let id = request.body.manufactoringProcessId;
    let updateManufactoringProcess = { manufactoringProcessName: request.body.manufactoringProcessName };
    await manufactoringProcessFunction.updateManufactoringProcess(id, updateManufactoringProcess);
    response.json({ success: true, message: 'manufactoringProcess updated successfully' });
})
    
/**
 * @swagger
 * /business/add/submit:
 *   post:
 *     tags: [Products]
 *     summary: Add a new product
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               ProductName:
 *                 type: string
 *                 example: "Organic Cotton T-Shirt"
 *               ProductLink:
 *                 type: string
 *                 example: "https://example.com/product"
 *               Desc:
 *                 type: string
 *                 example: "Eco-friendly clothing item"
 *               Category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["clothing", "eco"]
 *               RawMaterial:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["organic_cotton", "natural_dyes"]
 *               Origin:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["india", "bangladesh"]
 *               Type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["apparel", "top"]
 *               Color:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["blue", "white"]
 *               ManufactoringProcess:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["handwoven", "natural_dyeing"]
 *             required:
 *               - ProductName
 *     responses:
 *       302:
 *         description: Redirects to home page on success
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

app.post("/business/add/submit", async (request, response) => {
    // console.log("project ADD: ",request.body);
    //get form data 
    let newProduct = {
        "ProductName": request.body.ProductName || "",
        "ProductLink": request.body.ProductLink || "",
        "Category": Array.isArray(request.body.Category) ? request.body.Category : (request.body.Category ? [request.body.Category] : []),
        "RawMaterial":Array.isArray(request.body.RawMaterial) ? request.body.RawMaterial : (request.body.RawMaterial ? [request.body.RawMaterial] : []),
        "Desc":request.body.Desc || "",
        "Origin":Array.isArray(request.body.Origin) ? request.body.Origin : (request.body.Origin ? [request.body.Origin] : []),
        "Type":Array.isArray(request.body.Type) ? request.body.Type : (request.body.Type ? [request.body.Type] : []),
        "Color":Array.isArray(request.body.Color) ? request.body.Color : (request.body.Color ? [request.body.Color] : []),
        "ManufactoringProcess":Array.isArray(request.body.ManufactoringProcess) ? request.body.ManufactoringProcess : (request.body.ManufactoringProcess ? [request.body.ManufactoringProcess] : []),
        CreatedDate: new Date()
    };

    await productFunction.addProduct(newProduct);
    response.redirect("/");
});

/**
 * @swagger
 * /product/delete:
 *   get:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       302:
 *         description: Redirects to home page on success
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
app.get("/product/delete", async (request, response) => {
    let id = request.query.productId;
    await productFunction.deleteProduct(id);
    response.redirect("/");
});

/**
 * @swagger
 * /business/edit/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get details of a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get("/business/edit/:productId", async (request, response) => { 
    const productId = request.params.productId; 
   console.log("Received productId:", productId);
    if (!productId) {
        return response.status(400).json({ error: "Product ID is required" });
    }

    let productData = await productFunction.getOneProduct(productId);
    // console.log("Fetched productData:", productData);

    if (!productData) {
        return response.status(404).json({ error: "Product not found" });
    }

    return response.json(productData);
});

/**
 * @swagger
 * /business/edit/submit:
 *   post:
 *     tags:
 *       - Products
 *     summary: Edit an existing product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.post("/business/edit/submit", async (request, response) => {
    console.log("project EDIT: ",request.body);
    let id = request.body.productId;
    let idFilter = { _id: new ObjectId(id) };
    console.log(id);
    let updatedProduct = {
        "ProductName": request.body.ProductName || "",
        "ProductLink": request.body.ProductLink || "",
        "Category": Array.isArray(request.body.Category) ? request.body.Category.map(id => new mongoose.Types.ObjectId(id)) : [],
        "RawMaterial": Array.isArray(request.body.RawMaterial) ? request.body.RawMaterial.map(id => new mongoose.Types.ObjectId(id)) : [],
        "Desc": request.body.Desc || "",
        "Origin": Array.isArray(request.body.Origin) ? request.body.Origin.map(id => new mongoose.Types.ObjectId(id)) : [],
        "Type": Array.isArray(request.body.Type) ? request.body.Type.map(id => new mongoose.Types.ObjectId(id)) : [],
        "Color": Array.isArray(request.body.Color) ? request.body.Color.map(id => new mongoose.Types.ObjectId(id)) : [],
        "ManufactoringProcess": Array.isArray(request.body.ManufactoringProcess) ? request.body.ManufactoringProcess.map(id => new mongoose.Types.ObjectId(id)) : [],
        CreatedDate: new Date()
    };    

    // console.log(updatedProduct);

        await productFunction.updateProduct(idFilter, updatedProduct);
        response.redirect("/");

});


//set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});
