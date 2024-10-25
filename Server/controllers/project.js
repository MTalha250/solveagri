import Project from "../models/project.js";

export const getProjects = async (req, res) => {
  try {
    const query = {};
    const category = req.query.category;
    if (category && category !== "all") {
      query.category = category;
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const skip = (page - 1) * limit;
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const count = await Project.countDocuments();
    res.status(200).json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { title, header, html, subtitle, images, category } = req.body;
  try {
    const newProduct = new Project({
      title,
      header,
      subtitle,
      html,
      images,
      category,
      comments: [],
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, header, html, subtitle, images, category } = req.body;
  try {
    const product = await Project.findByIdAndUpdate(id, {
      title,
      header,
      subtitle,
      html,
      images,
      category,
      updatedAt: Date.now(),
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndRemove(id);
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
};
