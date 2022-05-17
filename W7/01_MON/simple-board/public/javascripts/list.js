const LIST = document.querySelector('#list');
const UPDATE = document.querySelector('#update');
const DELETE = document.querySelector('#delete');

LIST.addEventListener('click', () => {
  location.href = '/blog';
})

UPDATE.addEventListener('click', () => {
  location.href = `/blog/edit/${UPDATE.dateset.doc}`;
})

DELETE.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`http://localhost:3000/blog/delete/${DELETE.dataset.doc}`, {
    method: 'DELETE',
  })
  .then(response => {
    response.json();
  })
  .then(data => {
    window.location.href = '/blog';
  })
  .catch(err => {
    console.log(err);
  })
})