import Story from '../components/Story.js';
import { Comment } from '../components/Comments.js';
import view from '../utils/view.js';
import { getStory } from './stories.js';
import { itemUrl } from '../utils/urls.js';

export async function Item() {
  let story = null;
  let hasComments = false;
  let hasError = false;
  const storyId = window.location.hash.split('?id=')[1];

  try {
    story = await getStory(storyId);
    hasComments = 'kids' in story;

    if (hasComments) {
      story.comments = await getComments(story.kids);
    }
  } catch (error) {
    hasError = true;
    console.error(console.error(error));
  }

  if (hasError) {
    view.innerHTML = `
	<div class="error">Error Fetching Story</div>
	`;
  }

  view.innerHTML = `
  <div>${Story(story)}</div>
  ${
    hasComments
      ? story.comments.map((comment) => Comment(comment)).join('')
      : 'No comments'
  }
  <hr/> 
  `;
}

export const getComments = async (commentIds) => {
  const comments = commentIds.map(async (id) => {
    const response = await fetch(`${itemUrl + id}.json`);
    const comment = await response.json();
    comment.time = Math.floor((Date.now() / 1000 - comment.time) / 3600);
    if ('kids' in comment) {
      comment.comments = await getComments(comment.kids);
    }
    return comment;
  });

  return Promise.all(comments);
};
