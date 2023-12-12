import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
//import { checkCoctails, check, ingredients} from "./helper.js";
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

        checkCoctails(re);

        res.render("index.ejs", { re, ingredients, coctailsByName: false });
    } catch (error) {

        console.log(error.message);
        res.status(500);
    }

});

app.post("/byName", async (req, res) => {
  
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.searchName}`);
    const coctailsByName = result.data.drinks;
    if(coctailsByName != null){
        res.render("index.ejs", {re: null, coctailsByName, ingredients: null});
    } else {
        res.send("<h1 >Sorry, no such item with this name!</h1>");
    
    }
    
});
 
app.post("/filter", async (req, res) => {
    const alc = req.body.check;
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alc}`);
    const coctailsFiltered = result.data.drinks;
    //console.log(result.data.drinks.length);
    //console.log(req.body)

    res.render("index.ejs", {re: null, coctailsByName: null, ingredients: null, coctailsFiltered, filter: alc})
});

app.post("/byId", async (req, res) => {
    ingredients = [];
    const searchId = req.body.id;
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${searchId}`);
    const re = result.data.drinks[0];
    checkCoctails(re);
    res.render("index.ejs", {re: re , coctailsByName: null, ingredients, coctailsFiltered: null})
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

function checkCoctails(coctail) {
    //ingredients = [];
    check(coctail.strIngredient1, coctail.strMeasure1);
    check(coctail.strIngredient2, coctail.strMeasure2);
    check(coctail.strIngredient3, coctail.strMeasure3);
    check(coctail.strIngredient4, coctail.strMeasure4);
    check(coctail.strIngredient5, coctail.strMeasure5);
    check(coctail.strIngredient6, coctail.strMeasure6);
    check(coctail.strIngredient7, coctail.strMeasure7);
    check(coctail.strIngredient8, coctail.strMeasure8);
    check(coctail.strIngredient9, coctail.strMeasure9);
    check(coctail.strIngredient10, coctail.strMeasure10);
    check(coctail.strIngredient11, coctail.strMeasure11);
    check(coctail.strIngredient12, coctail.strMeasure12);
    check(coctail.strIngredient13, coctail.strMeasure13);
    check(coctail.strIngredient14, coctail.strMeasure14);
    check(coctail.strIngredient15, coctail.strMeasure15);

}


