import {getProducts, getProduct, createProduct, deleteProduct, updateProduct, countProducts} from "../controllers/product.js"
import express from "express";
const router = express.Router();

router.get("/", getProducts)
router.post("/", createProduct)
router.get("/:id", getProduct)
router.delete("/:id", deleteProduct)
router.patch("/:id", updateProduct)
router.get("/count/all", countProducts)

export default router;