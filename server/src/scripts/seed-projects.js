import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import connectDB from "../DB/connection.js";
import projectModel, { projectCategories, projectStatuses } from "../DB/model/Project.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config/.env.dev") });

async function run() {
    try {
        await connectDB();

        const sampleProjects = [
            {
                title: "E-Commerce Platform",
                description:
                    "Modern e-commerce solution with advanced features, payment integration, and responsive design.",
                image:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=300&auto=format&fit=crop",
                category: "web",
                status: "Completed",
                client: "TechCorp Solutions",
                technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
                progress: 100,
                startDate: new Date("2023-10-01"),
                endDate: new Date("2024-01-15"),
                featured: true,
            },
            {
                title: "Healthcare Mobile App",
                description:
                    "Comprehensive healthcare application with appointment booking and telemedicine features.",
                image:
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=300&auto=format&fit=crop",
                category: "mobile",
                status: "In Progress",
                client: "MedTech Solutions",
                technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
                progress: 75,
                startDate: new Date("2023-12-01"),
                featured: true,
            },
            {
                title: "Corporate Website",
                description:
                    "Professional corporate website with modern design and SEO optimization.",
                image:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop",
                category: "web",
                status: "In Progress",
                client: "Business Inc",
                technologies: ["React", "Gatsby", "GraphQL", "Contentful"],
                progress: 45,
                startDate: new Date("2024-01-08"),
                featured: false,
            },
            {
                title: "Restaurant Ordering System",
                description:
                    "Complete restaurant management system with online ordering and inventory management.",
                image:
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop",
                category: "web",
                status: "Draft",
                client: "Foodie Restaurant",
                technologies: ["Vue.js", "Laravel", "MySQL", "PayPal API"],
                progress: 10,
                startDate: new Date("2024-01-20"),
                featured: false,
            },
        ];

        // Ensure enums include the used values
        const usedCategories = Array.from(new Set(sampleProjects.map((p) => p.category)));
        const usedStatuses = Array.from(new Set(sampleProjects.map((p) => p.status)));
        const missingCategory = usedCategories.filter((c) => !projectCategories.includes(c));
        const missingStatus = usedStatuses.filter((s) => !projectStatuses.includes(s));
        if (missingCategory.length || missingStatus.length) {
            console.warn("Warning: Some categories or statuses are not in model enums:", {
                missingCategory,
                missingStatus,
            });
        }

        await projectModel.deleteMany({});
        const created = await projectModel.insertMany(sampleProjects);
        console.log(`Inserted ${created.length} projects.`);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

run();


