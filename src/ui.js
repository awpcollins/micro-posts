class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.state = 'add';
  }

  showPosts(posts) {
    if (!posts) {
      return;
    }

    let output = '';
    Object.keys(posts).forEach(key => {
      output += `
				<div class="card mb3" >
					<div class="card-body">
						<h3 class="card-title">${posts[key].title}</h3>
						<p class="card-text">${posts[key].body}</p>
            <a href class="edit card-link" data-id="${posts[key].id}">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href disable class="delete card-link" data-id="${key}">
              <i class="fas fa-ban"></i>
            </a>
					</div>
				</div >	
				`;
    });

    this.posts.innerHTML = output;
  }

  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.state = 'edit';
      this.postSubmit.textContent = 'Update';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'post-cancel btn btn-light btn-block';
      cancelBtn.appendChild(document.createTextNode('Cancel'));

      const container = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');

      container.insertBefore(cancelBtn, formEnd);
    } else if (type === 'create') {
      this.state = 'create';
      const cancelBtn = document.querySelector('.post-cancel');

      if (cancelBtn) {
        cancelBtn.remove();
      }

      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      this.clearFields();
    }
  }

  showAlert(message, className) {
    this.constructor.clearAlert();

    const div = document.createElement('div');

    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.postContainer');
    const posts = document.querySelector('#posts');

    container.insertBefore(div, posts);

    setTimeout(() => { this.constructor.clearAlert(className); }, 3000);
  }

  static clearAlert() {
    const alert = document.querySelector('.alert');

    if (alert) {
      alert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

const ui = new UI();
export default ui;
