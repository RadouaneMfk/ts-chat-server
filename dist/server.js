import express from "express";
import { configDotenv } from "../node_modules/dotenv/lib/main";
configDotenv();
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
    console.log("app running...");
});
//# sourceMappingURL=server.js.map