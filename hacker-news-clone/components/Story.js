export default function Story(story) {
  return `
  <div class="story">
    <div>
      <span class="gray">${story.index || ''}</span>
      <span class="upvote">▲</span>
      <href="${story.url}">${story.title}</a>
      <span>${'url' in story ? `(${story.domain})` : ''}</span>
    </div>

    <div>
      <div class="gray">
        ${story.score} points by ${story.by} ${story.time} hours ago 
      | 
      <a href="#/item?id=${story.id}">
        ${'kids' in story ? story.kids.length : 0} comments
      </a>
      |
      <span class="favorite">
        <img src="./imgs/299063_heart_icon (1).png">
        Add To Favorites
      </span>
      </div>
    </div>
  
  </div>`;
}
