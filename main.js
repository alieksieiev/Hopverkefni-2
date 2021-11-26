import { el } from './lib/helpers.js';

const data = await fetch('./data.json').then(response => {
  return response.json();
});

const todoCategories = data.categories;
const todoItems = data.items;
console.log(todoCategories);
console.log(todoItems);

const main = document.querySelector('main');

function renderSideBar() {
  const generalDiv = el('div');
  generalDiv.classList.add('general');
  const categoryDiv = el('div');
  categoryDiv.classList.add('category');
  const tagDiv = el('div');
  tagDiv.classList.add('tagsSideBar');
  

  const sectionElementLeft = el('section');
  sectionElementLeft.classList.add('container-left');

  sectionElementLeft.appendChild(generalDiv);
  sectionElementLeft.appendChild(categoryDiv);
  sectionElementLeft.appendChild(tagDiv);

  main.appendChild(sectionElementLeft);

  // Segir til um heildafjölda verkefna
  const itemVerkefni = el('div');
  itemVerkefni.classList.add('item');
  const taskCount = todoItems.length;
  const allTasks = el('li', 'Verkefni');
  const allTasksCount = el('p', taskCount.toString());

  itemVerkefni.appendChild(allTasks);
  itemVerkefni.appendChild(allTasksCount);
  generalDiv.appendChild(itemVerkefni);
  

  // Skrifar út fjölda kláruð verkefni
  const itemKlarud = el('div');
  itemKlarud.classList.add('item');
  const tasksCompleted = todoItems.filter(function(s) {return s.completed; }).length;
  const completedTasks = el('li', 'Kláruð Verkefni');
  const completedTasksCount = el('p', tasksCompleted.toString());
  itemKlarud.appendChild(completedTasks);
  itemKlarud.appendChild(completedTasksCount);
  generalDiv.appendChild(itemKlarud);

  // Skrifar út titilinn "Flokkar" og þá flokka sem til eru
  const category = el('h2', 'Flokkar')
  categoryDiv.appendChild(category);
  
  let countsVef = 0;
  let countsSkipulag = 0;
  let countsVefpjonusta = 0;
  for (let i = 0; i < todoItems.length; i++){
      const item = todoItems[i];
      if(item.category === 'vefforrit'){
        countsVef++
      }else if(item.category === 'skipulag'){
          countsSkipulag++;
      }else if(item.category === 'vefþjónustur'){
          countsVefpjonusta++;
      }
  }

  const vefforitLi = el('li', 'vefforit');
  const vefforitP = el('p', String(countsVef));
  const vefforitDiv = el('div');
  vefforitDiv.classList.add('item');
  vefforitDiv.appendChild(vefforitLi);
  vefforitDiv.appendChild(vefforitP)
  categoryDiv.appendChild(vefforitDiv);

  const skipulagLi = el('li', 'skipulag');
  const skipulagP = el('p', String(countsSkipulag));
  const skipulagDiv = el('div');
  skipulagDiv.classList.add('item');
  skipulagDiv.appendChild(skipulagLi);
  skipulagDiv.appendChild(skipulagP)
  categoryDiv.appendChild(skipulagDiv);

  const vefþjónusturLi = el('li', 'vefþjónustur');
  const vefþjónusturP = el('p', String(countsVefpjonusta));
  const vefþjónusturDiv = el('div');
  vefþjónusturDiv.classList.add('item');
  vefþjónusturDiv.appendChild(vefþjónusturLi);
  vefþjónusturDiv.appendChild(vefþjónusturP)
  categoryDiv.appendChild(vefþjónusturDiv);
}

// Function til að skrifa element fyrir verkefnin
function renderTodoItems() {

  // Ef engin verkefni eru sett fyrir birtast viðeigandi texti
  if(todoItems.length === 0) {
    const noItemsElement = el('p', 'Engin verkefni sett fyrir')
    main.appendChild(noItemsElement)
  }

  // Búum til element sem heldur utan um öll verkefni
  const todosElement = el('div');
  todosElement.classList.add('itemList__list');
  const sectionElement = el('section', todosElement);
  sectionElement.classList.add('container-right');
  main.appendChild(sectionElement);

  // Ítrum hvert verkefni og búum til viðeigandi element
  for (let i = 0; i < todoItems.length; i += 1) {
    const item = todoItems[i];
    const label = el('label', item.title);
    const p = el('p', item.description);
    const tags = el('div');
    const itemDiv = el('div');

    // Skrifar út dags. ef hún er til fyrir hvert verkefni
    if (item.due != null) {
      const date = new Date(item.due).toString()
      const due = el('p', date.substring(3,10))
      tags.appendChild(due);
    } else {
      const due = el('p', 'Engin dags.')
      tags.appendChild(due);
    }

    // Ef tögg eru til staðar þá þarf að bæta þeim við
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

renderSideBar();
renderTodoItems();
