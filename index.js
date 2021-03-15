import express from "express";
import logger from "./middleware/logger.js";
import auth from "./middleware/authenticator.js";
import home from "./routes/home.js";
import recipes from "./routes/recipes.js";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 3000;

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("connected to MongoDB...."))
	.catch((err) => console.error("could not connect to MongoDB", err));

async function createRecipe() {
	const recipe = new Recipe({
		name: "Chicken Alfredo",
		culture: "Italian",
	});

	const result = await recipe.save();
	console.log(result);
}

app.use(express.json());
//app.use(logger);
//app.use(auth);
app.use("/api/recipes", recipes);
app.use("/", home);

app.listen(port, () => console.log("listening on port " + port));
