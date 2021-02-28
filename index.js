import express from "express";
import logger from './logger.js';
import auth from './authenticator.js'
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());

app.use(logger);

app.use(auth);


const recipes = [
    {id: 1 , name: 'bariis', culture: 'somali' },
    {id: 2 , name: 'doro wat', culture: 'ethiopian' },
    {id: 3 , name: 'cheeseburger', culture: 'American' }
]
//get: get information, put:change info , post:add info  , delete: delete info 


//default endpoint for our main page
app.get("/", (req,res) => {
    res.send("hello world");
} );

//endpoint for all recipes
app.get('/api/recipes', (req,res) => {
    res.send(recipes);
});

//endpoint for a specific recipe by id
    //we can have multiple parameters for instance
    // '/api/recipes/:culture/:vegan'
app.get('/api/recipes/:id', (req,res) => {
   const recipe =  recipes.find(r => r.id === parseInt(req.params.id));
   if(!recipe) return res.status(404).send('the recipe with the given id was not found');

   res.send(recipe);
});

//endpoint to create a new recipe and put it in the list of recipes
app.post('/api/recipes', (req,res) => {
    if(!req.body.name) return res.status(400).send('Recipe name is required')
        
    if(!req.body.culture) return res.status(400).send('Recipe culture is required')


    const recipe = {
        id: recipes.length + 1,
        name: req.body.name,
        culture: req.body.culture
    };
    recipes.push(recipe);
    res.send(recipe);
});

//endpoint to update a recipe
app.put('/api/recipes/:id', (req,res) => {
    const recipe =  recipes.find(r => r.id === parseInt(req.params.id));
    if(!recipe) return res.status(404).send('the recipe with the given id was not found');

    if(!req.body.name) return res.status(400).send('Recipe name is required')

    if(!req.body.culture) return res.status(400).send('Recipe culture is required')

    recipe.name = req.body.name;
    recipe.culture = req.body.culture;
    res.send(recipe)

});

//endpoint to delete recipes 
app.delete('/api/recipes/:id', (req,res) => {
    const recipe =  recipes.find(r => r.id === parseInt(req.params.id));
    if(!recipe) return res.status(404).send('the recipe with the given id was not found');

    const index = recipes.indexOf(recipe);
    recipes.splice(index,1);
    res.send(recipe);


});

app.listen(port, () => console.log("listening on port " + port ))