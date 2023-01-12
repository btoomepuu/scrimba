import { Stories } from './pages/stories.js';
import { Item } from './pages/items.js';

const router = new Navigo(null, true, '#');

export default class RouterHandler {
  constructor() {
    this.createRoutes();
  }

  createRoutes() {
    const routes = [
      { path: '/', page: Stories },
      { path: '/newstories', page: Stories },
      { path: '/askstories', page: Stories },
      { path: '/showstories', page: Stories },
      { path: '/beststories', page: Stories },
      { path: '/item', page: Item },
    ];

    routes.forEach(({ path, page }) => {
      router
        .on(path, () => {
          page(path);
        })
        .resolve();
    });
  }
}
