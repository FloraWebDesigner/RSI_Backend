import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productFunction from "../modules/product.js";
import originFunction from "../modules/origin.js";
import colorFunction from "../modules/color.js";
import typeFunction from "../modules/type.js";
import categoryFunction from "../modules/category.js";
import rawMaterialFunction from "../modules/rawMaterial.js";
import manufactoringProcessFunction from "../modules/manufactoringProcess.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 5,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const cache = {
  data: null,
  lastUpdated: 0,
  ttl: 1 * 60 * 1000 
};


app.get("/apicpanel/data", async (req, res) => {
  try {
    const now = Date.now();

    if (cache.data && (now - cache.lastUpdated < cache.ttl)) {
      return res.json({
        ...cache.data,
        cached: true,
        nextUpdateIn: Math.round((cache.lastUpdated + cache.ttl - now) / 1000) + 's',
        lastUpdated: new Date(cache.lastUpdated).toISOString()
      });
    }

    const results = await Promise.all([
      productFunction.getProducts(),
      originFunction.getOrigins(),
      colorFunction.getColor(),
      typeFunction.getType(),
      categoryFunction.getCategories(),
      rawMaterialFunction.getRawMaterial(),
      manufactoringProcessFunction.getManufactoringProcess()
    ]);

    cache.data = {
      products: Array.isArray(results[0]) ? results[0] : [results[0]],
      origins: Array.isArray(results[1]) ? results[1] : [results[1]],
      colors: Array.isArray(results[2]) ? results[2] : [results[2]],
      types: Array.isArray(results[3]) ? results[3] : [results[3]],
      categories: Array.isArray(results[4]) ? results[4] : [results[4]],
      rawMaterials: Array.isArray(results[5]) ? results[5] : [results[5]],
      manufactoringProcesses: Array.isArray(results[6]) ? results[6] : [results[6]]
    };
    cache.lastUpdated = now;

    res.json({
      ...cache.data,
      cached: false,
      lastUpdated: new Date(cache.lastUpdated).toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    
    if (cache.data) {
      return res.json({
        ...cache.data,
        cached: true,
        error: `Using cached data due to: ${error.message}`,
        lastUpdated: new Date(cache.lastUpdated).toISOString()
      });
    }

    res.status(500).json({ 
      error: "Data unavailable",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


//upload to Cpanel: index.js, package.json, modules/js files, env

export default app;