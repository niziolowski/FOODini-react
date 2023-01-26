export const combineIngredientsByName = (ingredients) => {
  const uniqueNames = new Set(ingredients.map((ing) => ing.name));

  const groupedIngredients = [...uniqueNames].map((name) =>
    ingredients.filter((ing) => ing.name === name)
  );

  const combinedIngredients = groupedIngredients.map((arr) => {
    // if only one ingredient in a group, just return it
    if (arr.length === 1) return arr[0];

    // Get the sum amount of the same ingredients
    let sumAmount = arr.reduce((acc, cur) => acc + cur.amount, 0);

    // Return ingredient with summed up amount
    const combined = { ...arr[0] };
    combined.amount = sumAmount;
    return combined;
  });
  return combinedIngredients;
};
