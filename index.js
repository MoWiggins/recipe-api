import express from "express";
import logger from "./middleware/logger.js";
import auth from "./middleware/authenticator.js";
import recipes from "./routes/recipes.js";
import home from "./routes/home.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(auth);
app.use("/api/recipes", recipes);
app.use("/", home);

app.listen(port, () => console.log("listening on port " + port));
