import { sum as normal } from "./normal/normal";
import { sum as circleDep } from "./circleDep/circleDep";
import { sum as depSelf } from "./depSelf/depSelf";
import { bootstrap as indirectCircleDep } from "./indirectCircleDep/indirectCircleDep";

export const dasyncSum = async () => {
  await normal();
  await circleDep();
  await depSelf();
  await indirectCircleDep();
};
