const data = await fetch('./data.json').then(response => {
  return response.json();
});

const todoCategories = data.categories;
const todoItems = data.items;
console.log(todoCategories);
console.log(todoItems);

