
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

function cons() {
    console.log("salut din helper!");
}
module.exports = {
    checkCoctails: checkCoctails,
    check: check,
    cons
}