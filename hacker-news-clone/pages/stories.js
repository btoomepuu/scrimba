import Story from '../components/Story.js';
import view from '../utils/view.js';
import { baseUrl, itemUrl } from '../utils/urls.js';

export async function Stories(path) {
  const stories = await getStories(path);
  const hasStories = stories.length > 0;

  view.innerHTML = `<div>${
    hasStories
      ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('')
      : 'No stories'
  }</div>`;
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
