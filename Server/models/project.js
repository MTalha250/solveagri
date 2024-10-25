import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  images: [String],
  category: {
    type: String,
    required: true,
    enum: ['development', 'trainings-institute', 'consultancies', 'events-and-networking']
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

const Project = mongoose.model("Project", projectSchema);

export default Project;
