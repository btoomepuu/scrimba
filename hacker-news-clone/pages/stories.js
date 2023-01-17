import Story from '../components/Story.js';
import view from '../utils/view.js';
import { baseUrl, itemUrl } from '../utils/urls.js';
import checkFavorite from '../utils/checkFavorite.js';
import store from '../store.js';

export async function Stories(path) {
  const { favorites } = store.getState();
  const stories = await getStories(path);
  const hasStories = stories.length > 0;

  view.innerHTML = `<div>${
    hasStories
      ? stories
          .map((story, i) =>
            Story({
              ...story,
              index: i + 1,
              isFavorite: checkFavorite(favorites, story),
            })
          )
          .join('')
      : 'No stories'
  }</div>`;

  document.querySelectorAll('.favorite').forEach((favoriteButton) => {
    favoriteButton.addEventListener('click', async function () {
      const story = JSON.parse(this.dataset.story);
      const isFavorited = checkFavorite(favorites, story);
      if (isFavorited) {
        store.dispatch({
          type: 'REMOVE_FAVORITE',
          payload: { favorite: story },
        });
      } else {
        store.dispatch({ type: 'ADD_FAVORITE', payload: { favorite: story } });
      }
      await Stories(path);
    });
  });
}

export async function getStories(path) {
  const isHomeRoute = path === '/';
  const isNewRoute = path === '/';
  if (isHomeRoute) {
    path = '/newsstories';
  }

  const response = await fetch(`${baseUrl + path}.json`);
  const stories = await response.json();

  return await Promise.all(stories.map((storyId) => getStory(storyId)));
}

export const getStory = async (storyId) => {
  const response = await fetch(`${itemUrl + storyId}.json`);
  const story = await response.json();

  story.time = Math.floor((Date.now() / 1000 - story.time) / 3600);

  const hasUrl = 'url' in story ? (story.domain = story.url) : story.url;
  if (hasUrl) {
    const regex = /https?:\/\/(www.)?/i;
    story.domain = story.url.replace(regex, '');
    story.domain = story.domain.slice(0, story.domain.search(/\//g));
  }

  return story;
};
