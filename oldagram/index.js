const posts = [
  {
    name: 'Vincent van Gogh',
    username: 'vincey1853',
    location: 'Zundert, Netherlands',
    avatar: 'images/avatar-vangogh.jpg',
    post: 'images/post-vangogh.jpg',
    comment: 'just took a few mushrooms lol',
    likes: 21,
  },
  {
    name: 'Gustave Courbet',
    username: 'gus1819',
    location: 'Ornans, France',
    avatar: 'images/avatar-courbet.jpg',
    post: 'images/post-courbet.jpg',
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
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
  },
];

const icons = [
  { iconName: 'heart', imgUrl: 'images/icon-heart.png' },
  { iconName: 'comment', imgUrl: 'images/icon-comment.png' },
  { iconName: 'dm', imgUrl: 'images/icon-dm.png' },
];

const mainEl = document.querySelector('#main-content');

displayPost(posts);
const sectionEls = document.querySelectorAll('section');
console.log(sectionEls);

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

  const obj = posts.find((obj) => {
    if (obj.name === targetSection.id) {
      obj.likes++;
      likes = obj.likes;
    }
  });

  const likesEl = targetSection.querySelector('.likes');
  likesEl.textContent = `${likes} likes`;
}

function displayPost(posts) {
  posts.forEach((obj) => {
    const section = document.createElement('section');
    section.setAttribute('id', `${obj.name}`);

    const div1 = createDiv(['poster-info-container']);
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = obj.avatar;
    avatar.alt = `picture ${obj.name}`;
    div1.append(avatar);

    const div2 = createDiv([]);
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = obj.name;
    const location = document.createElement('p');
    location.classList.add('location');
    location.textContent = obj.location;
    div2.append(name, location);
    div1.append(div2);

    const div3 = createDiv([]);
    const postImg = document.createElement('img');
    postImg.classList.add('post-img');
    postImg.src = obj.post;
    postImg.alt = `post by ${obj.username}`;
    div3.append(postImg);

    const div4 = addIcons(createDiv(['icon-container']));

    const div5 = createDiv(['likes-comments-container']);
    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = `${obj.likes} likes`;

    const comment = document.createElement('p');
    comment.classList.add('comment');
    const username = document.createElement('span');
    username.classList.add('username');
    username.textContent = obj.username;
    const commentText = document.createElement('span');
    commentText.textContent = ` ${obj.comment}`;
    comment.append(username, commentText);
    div5.append(likes, comment);

    section.append(div1, div3, div4, div5);
    mainEl.append(section);
  });
}

function addIcons(div) {
  let iconDiv = div;
  icons.forEach((obj) => {
    const icon = document.createElement('img');
    icon.classList.add(`${obj.iconName}`, 'icon');
    icon.src = obj.imgUrl;
    icon.alt = `icon ${obj.iconName}`;
    iconDiv.append(icon);
  });

  return iconDiv;
}

// originally had more that one class on several div, but added a wrapper. kept incase classes needed to be added later
function createDiv(classArray) {
  const div = document.createElement('div');

  classArray.forEach((e) => {
    div.classList.add(e);
  });
  return div;
}
