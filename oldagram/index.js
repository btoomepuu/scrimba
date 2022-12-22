const posts = [
  {
    name: 'Vincent van Gogh',
    username: 'vincey1853',
    location: 'Zundert, Netherlands',
    avatar: 'images/avatar-vangogh.jpg',
    post: 'images/post-vangogh.jpg',
    comment: 'just took a few mushrooms lol',
    likes: 21,
    index: 0,
  },
  {
    name: 'Gustave Courbet',
    username: 'gus1819',
    location: 'Ornans, France',
    avatar: 'images/avatar-courbet.jpg',
    post: 'images/post-courbet.jpg',
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
    index: 1,
  },
  {
    name: 'Joseph Ducreux',
    username: 'jd1735',
    location: 'Paris, France',
    avatar: 'images/avatar-ducreux.jpg',
    post: 'images/post-ducreux.jpg',
    comment:
      'gm friends! which coin are YOU stacking up today?? post below and WAGMI!',
    likes: 152,
    index: 2,
  },
];

const mainEl = document.querySelector('.main-content');

function renderPosts() {
  posts.forEach((obj) => {
    const section = `
      <section id="${obj.index}">
      <div class="poster-info-container">
        <img class="avatar" src="${obj.avatar}" alt="user picure" />
        <div>
          <p class="name">${obj.name}</p>
          <p class="location">${obj.location}</p>
        </div>
      </div>

      <div>
        <img class="post-img" src="${obj.post}" alt="post by ${obj.name}" />
      </div>

      <div class="icon-container">
        <img class="heart icon" src="images/icon-heart.png" alt="heart icon" />
        <img class="comment icon" src="images/icon-comment.png" alt="comment icon" />
        <img class="dm icon" src="images/icon-dm.png" alt="dm icon" />
      </div>

      <div class="likes-comments-container">
        <p class="likes">${obj.likes} likes</p>
        <p class="comment" ><span class="username" >${obj.username}</span> ${obj.comment}</p>
      </div>
    </section> `;

    mainEl.innerHTML += section;
  });
}

renderPosts();

const sectionEls = document.querySelectorAll('section');

sectionEls.forEach((e) => {
  e.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('post-img')) {
      increaseLikes(e.currentTarget);
    }
  });

  e.addEventListener('click', (e) => {
    if (e.target.classList.contains('heart')) {
      increaseLikes(e.currentTarget);
    }
  });
});

function increaseLikes(targetSection) {
  let likes;
  const targetId = parseInt(targetSection.id);

  const obj = posts.find((obj) => {
    if (obj.index === targetId) {
      if (obj.likedByUser) {
        obj.likes--;
        likes = obj.likes;
        obj.likedByUser = false;
        updateHeart(targetSection, false);
      } else {
        obj.likes++;
        likes = obj.likes;
        obj.likedByUser = true;
        updateHeart(targetSection, true);
      }
    }
  });

  const likesEl = targetSection.querySelector('.likes');
  likesEl.textContent = `${likes} likes`;
}

function updateHeart(targetSection, bool) {
  const heartImgEl = targetSection.querySelector('.heart');
  if (bool) {
    heartImgEl.src = 'images/icon-redheart.png';
    return;
  }
  heartImgEl.src = 'images/icon-heart.png';
}
