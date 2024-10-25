import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  SKU: {
    required: true,
    type: String,
    maxLength: 64
  },
  image: String,
  category: {
    type: String,
    default: "Uncategorized",
  },
  subcategory: {
    type: String,
    default: "Uncategorized",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
