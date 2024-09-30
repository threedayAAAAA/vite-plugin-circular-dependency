import router from "../router";

export default async () => {
  router.reverse();
  const module = await import("./cmp1");
  return `component2's view ${module.default()}`;
};
