import router from "./router";
import Cmp1 from "./components/cmp1";
export function bootstrap() {
  Cmp1();
  router.reverse();
}
