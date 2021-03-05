import express from "express";
const router = express.Router();

export const recipes = [
	{ id: 1, name: "bariis", culture: "somali" },
	{ id: 2, name: "doro wat", culture: "ethiopian" },
	{ id: 3, name: "cheeseburger", culture: "American" },
];

//endpoint for all recipes
router.get("/", (req, res) => {
	res.send(recipes);
});

//endpoint to get all recipes by culture
router.get("/culture/:culture", (req, res) => {
	const list = [];
	const culture = req.params.culture.toLowerCase();
	for (let i = 0; i < recipes.length; i++) {
		const current = recipes[i].culture.toLowerCase();
		if (current === culture) {
			list.push(recipes[i]);
		}
	}
	if (list.length == 0)
		return res
			.status(404)
			.send("no recipies with the culture of " + req.params.culture);

	return res.send(list);
});

//endpoint for a specific recipe by id
//we can have multiple parameters for instance
// '/api/recipes/:culture/:vegan'
router.get("/:id", (req, res) => {
	const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	res.send(recipe);
});

//endpoint to create a new recipe and put it in the list of recipes
router.post("/", (req, res) => {
	if (!req.body.name) return res.status(400).send("Recipe name is required");

	if (!req.body.culture)
		return res.status(400).send("Recipe culture is required");

	const recipe = {
		id: recipes.length + 1,
		name: req.body.name,
		culture: req.body.culture,
	};
	recipes.push(recipe);
	res.send(recipe);
});

//endpoint to update a recipe
router.put("/:id", (req, res) => {
	const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	if (!req.body.name) return res.status(400).send("Recipe name is required");

	if (!req.body.culture)
		return res.status(400).send("Recipe culture is required");

	recipe.name = req.body.name;
	recipe.culture = req.body.culture;
	res.send(recipe);
});

//endpoint to delete recipes
router.delete("/:id", (req, res) => {
	const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
	if (!recipe)
		return res.status(404).send("the recipe with the given id was not found");

	const index = recipes.indexOf(recipe);
	recipes.splice(index, 1);
	res.send(recipe);
});

export default router;
