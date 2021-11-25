import { el } from './lib/helpers.js';

const data = await fetch('./data.json').then(response => {
  return response.json();
});

const todoCategories = data.categories;
const todoItems = data.items;
console.log(todoCategories);
console.log(todoItems);

const main = document.querySelector('main');

function renderTodoItems() {
  if(todoItems.length === 0) {
    const noItemsElement = el('p', 'Engin verkefni sett fyrir')
  }

  const todosElement = el('div');
  todosElement.classList.add('itemList__list');
  const sectionElement = el('section', todosElement);
  sectionElement.classList.add('container-right');
  main.appendChild(sectionElement);

  for (let i = 0; i < todoItems.length; i += 1) {
    const item = todoItems[i];
    const label = el('label', item.title);
    const p = el('p', item.description);
    const tags = el('div');
    const itemDiv = el('div');

    if (item.due != null) {
      const date = new Date(item.due).toString()
      const due = el('p', date.substring(3,10))
      tags.appendChild(due);
    } else {
      const due = el('p', 'Engin dags.')
      tags.appendChild(due);
    }

    for (let j = 0; j < item.tags.length; j += 1) {
      const tag = el('button', item.tags[j])
      tags.appendChild(tag)
    }

    const category = el('label', item.category);

    tags.appendChild(category);

    itemDiv.classList.add('todo__item');
    itemDiv.appendChild(label);
    itemDiv.appendChild(p);
    itemDiv.appendChild(tags);

    todosElement.appendChild(itemDiv);
  }
}

renderTodoItems();
