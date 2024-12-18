import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
//import { checkCocktails, check, ingredients} from "./helper.js";
const app = express();
const port = 3000;
var ingredients = [];
var ingredientsGroup = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    
    ingredients = [];
    try {
        const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const re = result.data.drinks[0];

        checkCocktails(re);

        res.render("index.ejs", { re, ingredients, cocktailsByName: false });
    } catch (error) {

        console.log(error.message);
        res.status(500);
    }

});

app.post("/byName", async (req, res) => {
  
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.searchName}`);
    const cocktailsByName = result.data.drinks;
    if(cocktailsByName != null){
        res.render("index.ejs", {re: null, cocktailsByName, ingredients: null});
    } else {
        res.send("<h1 >Sorry, no such item with this name!</h1>");
    
    }
    
});
 
app.post("/filter", async (req, res) => {
    const alc = req.body.check;
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alc}`);
    const cocktailsFiltered = result.data.drinks;
    //console.log(result.data.drinks.length);
    //console.log(req.body)

    res.render("index.ejs", {re: null, cocktailsByName: null, ingredients: null, cocktailsFiltered, filter: alc})
});

app.post("/byId", async (req, res) => {
    ingredients = [];
    const searchId = req.body.id;
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${searchId}`);
    const re = result.data.drinks[0];
    checkCocktails(re);
    res.render("index.ejs", {re: re , cocktailsByName: null, ingredients, cocktailsFiltered: null})
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


function check(ingredient, measure) {
    if (measure != null && ingredient != null) {
        ingredients.push({
            ingredient: ingredient,
            measure: measure

        });
    } else {
        return null;
    }
}

function checkCocktails(cocktail) {
    //ingredients = [];
    check(cocktail.strIngredient1, cocktail.strMeasure1);
    check(cocktail.strIngredient2, cocktail.strMeasure2);
    check(cocktail.strIngredient3, cocktail.strMeasure3);
    check(cocktail.strIngredient4, cocktail.strMeasure4);
    check(cocktail.strIngredient5, cocktail.strMeasure5);
    check(cocktail.strIngredient6, cocktail.strMeasure6);
    check(cocktail.strIngredient7, cocktail.strMeasure7);
    check(cocktail.strIngredient8, cocktail.strMeasure8);
    check(cocktail.strIngredient9, cocktail.strMeasure9);
    check(cocktail.strIngredient10, cocktail.strMeasure10);
    check(cocktail.strIngredient11, cocktail.strMeasure11);
    check(cocktail.strIngredient12, cocktail.strMeasure12);
    check(cocktail.strIngredient13, cocktail.strMeasure13);
    check(cocktail.strIngredient14, cocktail.strMeasure14);
    check(cocktail.strIngredient15, cocktail.strMeasure15);

}


