import mongoose from "mongoose";

export const projectCategories = [
    "web",
    "mobile",
    "ecommerce",
    "backend",
    "frontend",
    "design",
    "data",
    "devops",
    "other",
];

export const projectStatuses = [
    "Draft",
    "Planned",
    "In Progress",
    "Completed",
    "On Hold",
    "Cancelled",
];

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 2, maxlength: 150 },
        description: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
        image: { type: String, trim: true },
        category: { type: String, enum: projectCategories, required: true },
        status: { type: String, enum: projectStatuses, default: "Planned" },
        client: { type: String, trim: true },
        technologies: { type: [String], default: [] },
        progress: { type: Number, min: 0, max: 100, default: 0 },
        startDate: { type: Date },
        endDate: { type: Date },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const projectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default projectModel;


