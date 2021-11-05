const posts = document.querySelector('.posts');
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const loadedCommented = {};
let prevId = null;

async function getAllPost() {
  const data = await (await fetch(`${BASE_URL}/posts`)).json();
  const rawList = data.map(item => {
    return `<li class="card">
      <h3 class="card__title" onclick="getComments(${item.id})">${item.title}</h3>
      <p>${item.body}</p>
      <div id="comment-${item.id}"></div>
    </li>`
  }).join('');
  posts.innerHTML = `<h2>Posts</h2>` +rawList;
}
getAllPost();

async function getComments(id) {
  const commentSection = document.querySelector(`#comment-${id}`);
  if (prevId) {
    const prevComment = document.querySelector(`#comment-${prevId}`);
    prevComment.style.display = 'none';
    commentSection.style.display = 'block';
  }
  prevId = id;
  if (loadedCommented[id]) return;
  commentSection.innerHTML = 'Loading...'
  const comments = await (await fetch(`${BASE_URL}/posts/${id}/comments`)).json();
  const rawList = comments.map(comment => {
    return `<li class="card">
      <p><i>Commented by:</i> ${comment.name} (${comment.email})</p>
      <small>${comment.body}</small>
    </li>`
  }).join('');
  loadedCommented[id] = true;
  commentSection.innerHTML = `<hr /><h4>Comments</h4>` + rawList;
}