let jottTitle;
let jottText;
let savejottBtn;
let newjottBtn;
let jottList;

if (window.location.pathname === '/jott') {
  jottTitle = document.querySelector('.jott-title');
  jottText = document.querySelector('.jott-textarea');
  savejottBtn = document.querySelector('.save-jott');
  newjottBtn = document.querySelector('.new-jott');
  jottList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activejott is used to keep track of the jott in the textarea
let activeJott = {};

const getJotts = () =>
  fetch('/routes/jottRoutes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveJott = (jott) =>
  fetch('/routes/jottRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jott),
  });

const deleteJott = (id) =>
  fetch(`/routes/jottRoutes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveJotts = () => {
  hide(savejottBtn);

  if (activeJott.id) {
    jottTitle.setAttribute('readonly', true);
    jottText.setAttribute('readonly', true);
    jottTitle.value = activeJott.title;
    jottText.value = activeJott.text;
  } else {
    jottTitle.removeAttribute('readonly');
    jottText.removeAttribute('readonly');
    jottTitle.value = '';
    jottText.value = '';
  }
};

const handleJottSave = () => {
  const newJott = {
    title: jottTitle.value,
    text: jottText.value,
  };
  saveJott(newJott).then(() => {
    getAndRenderJotts();
    renderActiveJotts();
  });
};

// Delete the clicked jott
const handleJottDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const jott = e.target;
  const jottId = JSON.parse(jott.parentElement.getAttribute('data-jott')).id;

  if (activeJott.id === jottId) {
    activeJott = {};
  }

  deleteJott(jottId).then(() => {
    getAndRenderJotts();
    renderActiveJotts();
  });
};

// Sets the activejott and displays it
const handleJottView = (e) => {
  e.preventDefault();
  activeJott = JSON.parse(e.target.parentElement.getAttribute('data-jott'));
  renderActiveJotts();
};

// Sets the activejott to and empty object and allows the user to enter a new jott
const handleNewJottView = (e) => {
  activeJott = {};
  renderActiveJotts();
};

const handleRenderSaveBtn = () => {
  if (!jottTitle.value.trim() || !jottText.value.trim()) {
    hide(savejottBtn);
  } else {
    show(savejottBtn);
  }
};

// Render the list of jott titles
const renderJottList = async (jotts) => {
  let jsonJotts = await jotts.json();
  if (window.location.pathname === '/jott') {
    jottList.forEach((el) => (el.innerHTML = ''));
  }

  let jottListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleJottView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-jott'
      );
      delBtnEl.addEventListener('click', handleJottDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonJotts.length === 0) {
    jottListItems.push(createLi('No saved Jotts', false));
  }

  jsonJotts.forEach((jott) => {
    const li = createLi(jott.title);
    li.dataset.jott = JSON.stringify(jott);

    jottListItems.push(li);
  });

  if (window.location.pathname === '/jott') {
    jottListItems.forEach((jott) => jottList[0].append(jott));
  }
};

// Gets Jotts from the db and renders them to the sidebar const getAndRenderJotts = () => getJotts().then(renderJottList);

const getAndRenderJotts = () => getJotts().then(renderJottList);

if (window.location.pathname === '/jott') {
  savejottBtn.addEventListener('click', handleJottSave);
  newjottBtn.addEventListener('click', handleNewJottView);
  jottTitle.addEventListener('keyup', handleRenderSaveBtn);
  jottText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderJotts();
