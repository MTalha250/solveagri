import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const query = {};
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    const q = req.query.q;
    const minPrice = parseInt(req.query.minPrice) || -1;
    const maxPrice = parseInt(req.query.maxPrice) || -1;

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }
    if (category && category !== "all") {
      query.category = category;
    }
    if (subcategory && subcategory !== "all") {
      query.subcategory = subcategory;
    }
    if (minPrice !== -1 && maxPrice !== -1) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const count = await Product.countDocuments();
    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, image, SKU, category, subcategory } =
    req.body;
  try {
    const newProduct = new Product({
      title,
      description,
      price,
      image,
      SKU,
      category,
      subcategory,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image, SKU, category, subcategory } =
    req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, {
      title,
      description,
      price,
      image,
      SKU,
      category,
      subcategory,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};

export const countProducts = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id:"$category",
          count: {
            $sum: 1
          }
        }
      }
    ]
    const response = await Product.aggregate(pipeline)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};