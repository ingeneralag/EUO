import express from "express";
import * as dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./src/config/.env.dev") });

import bootstrap from "./src/app.controller.js";

const app = express();
const port = process.env.PORT || 3000;

// Initialize the app
bootstrap(app, express);


if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}!`);
    });
}

export default app;
