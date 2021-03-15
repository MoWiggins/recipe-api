import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const Recipe = mongoose.model(
	"Recipe",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50,
		},
		culture: {
			type: String,
			required: true,
		},
	})
);

//endpoint for all recipes
router.get("/", async (req, res) => {
	const recipes = await Recipe.find().sort("name");
	res.send(recipes);
});

//endpoint for a specific recipe by id
router.get("/:id", async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);

	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	res.send(recipe);
});

//trying to get all recipes by culture
/* router.get("/culture/:culture", async (req, res) => {
	if (!req.body.culture)
		return res.status(400).send("Recipe culture is required");

	const recipes = await Recipe.find();

	res.send(recipes);
}); */

//endpoint to create a new recipe and put it in the list of recipes
router.post("/", async (req, res) => {
	if (!req.body.name) return res.status(400).send("Recipe name is required");

	if (!req.body.culture)
		return res.status(400).send("Recipe culture is required");

	let recipe = new Recipe({
		name: req.body.name,
		culture: req.body.culture,
	});
	recipe = await recipe.save();
	res.send(recipe);
});

//endpoint to update a recipe
router.put("/:id", async (req, res) => {
	if (!req.body.name) return res.status(400).send("Recipe name is required");

	if (!req.body.culture)
		return res.status(400).send("Recipe culture is required");

	const recipe = await Recipe.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, culture: req.body.culture },
		{
			new: true,
		}
	);

	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	res.send(recipe);
});

//endpoint to delete recipes
router.delete("/:id", async (req, res) => {
	const recipe = await Recipe.findByIdAndRemove(req.params.id);

	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	res.send(recipe);
});

export default router;
