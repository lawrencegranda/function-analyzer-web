import express from "express";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve static files from multiple directories
app.use(express.static(resolve(__dirname)));
app.use("/res", express.static(resolve(__dirname, "res")));
app.use("/src", express.static(resolve(__dirname, "src")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Serve the main application
app.get("/*", (req, res) => {
  try {
    res.sendFile(resolve(__dirname, "index.html"));
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).send("Error loading the application");
  }
});

// Use the port provided by cPanel or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Application root: ${__dirname}`);
});
