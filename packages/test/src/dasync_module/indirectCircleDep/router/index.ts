import Config from "./config";

class Router {
  routes: unknown[];
  constructor(config: unknown[]) {
    this.routes = config;
  }

  reverse() {
    this.routes.reverse();
  }
}
export default new Router(Config);
