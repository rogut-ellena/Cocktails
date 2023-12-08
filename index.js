import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
//import helper from "./helper";
const app = express();
const port = 3000;
var ingredients = [];



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');

        //console.log(result.data.drinks[0].strDrink);
        //console.log(result.data.drinks[0].strCategory);
        //console.log(result.data.drinks[0].strAlcoholic);
        //console.log(result.data.drinks[0].strGlass);
        //console.log(result.data.drinks[0].strInstructions);
      ingredients = [];
        const re = result.data.drinks[0];
        checkCoctails(re);

        res.render("index.ejs", { re, ingredients, coctailsByName: false });

    } catch (error) {
        console.log(error.message);
        //res.status(500);
    }

});

app.post("/submit", async (req, res) => {
    //console.log(req.body.searchName);
    //const serchByName = req.body.searchName;
    const result = await axios.post(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.searchName}`);
    const coctailsByName = result.data.drinks;
    

    //console.log(result.data.drinks);
    res.render("index.ejs", {re: null, ingredients, coctailsByName})
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
