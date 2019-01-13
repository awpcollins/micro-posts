import axios from 'axios';
import ui from './ui';

const postUrl = 'https://posts-59834.firebaseio.com/posts';

document.addEventListener('DOMContentLoaded', getPosts);
ui.postSubmit.addEventListener('click', submitPost);
ui.posts.addEventListener('click', deletePost);
ui.posts.addEventListener('click', editPostState);
document.querySelector('.card-form').addEventListener('click', createPostState);

function getPosts() {
  axios.get(`${postUrl}.json`)
    .then(res => ui.showPosts(res.data))
    .catch(err => console.log(err));
}

function createPostState(e) {
  e.preventDefault();

  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('create');
  }
}

function editPostState(e) {
  e.preventDefault();

  const a = e.target.parentElement;

  if (a.classList.contains('edit') && ui.state !== 'edit') {
    const { id } = a.dataset;
    const title = a.previousElementSibling.previousElementSibling.textContent;
    const body = a.previousElementSibling.textContent;
    const data = { id, title, body };

    ui.fillForm(data);
  }
}

function deletePost(e) {
  e.preventDefault();

  const a = e.target.parentElement;

  if (a.classList.contains('delete') && ui.state !== 'edit') {
    axios.delete(`${postUrl}/${a.dataset.id}.json`)
      .then(() => {
        a.parentElement.parentElement.remove();
        ui.showAlert('Post removal successful', 'alert alert-success');
      })
      .catch(() => {
        ui.showAlert('Post removal failed', 'alert alert-danger');
      });
  }
}

function submitPost(e) {
  e.preventDefault();

  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;

  if (body === '' || title === '') {
    return ui.showAlert('Please make sure all fields are completed', 'alert alert-danger');
  }

  const id = ui.idInput.value;
  const data = {
    title,
    body,
  };

  if (!id) {
    return axios.post(`${postUrl}.json`, data)
      .then(() => {
        getPosts();
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
      })
      .catch(err => console.log(err));
  }

  return axios.put(`${postUrl}/${id}.json`, data)
    .then(() => {
      getPosts();
      ui.showAlert('Post edited', 'alert alert-success');
      ui.clearFields();
    });
}
