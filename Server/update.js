import Product from "./models/product.js";

const res = await Product.updateMany({category: "Genetics"}, {$set: {category: "genetics"}})

console.log(res)