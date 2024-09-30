export default async () => {
  const module = await import("./cmp2");
  return `component1's view ${module.default()}`;
};
