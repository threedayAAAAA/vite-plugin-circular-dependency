import { normal2Sum } from  './normal/normal2'
import { circleDepSum1 } from  './circleDep/circleDep1'
import { indirectCircleDepSum1 } from  './indirectCircleDep/indirectCircleDep1'
import { indirectCircleDepSum2 } from  './indirectCircleDep/indirectCircleDep2'
import { indirectCircleDepSum3 } from  './indirectCircleDep/indirectCircleDep3'
import { depSelfSum1 } from  './depSelf/depSelf1'
import { depSelfSum2 } from  './depSelf/depSelf2'
import { loopSum1 } from './loop/loop1';

export const sum = async () => {
    return [
        normal2Sum,
        circleDepSum1(),
        indirectCircleDepSum1(), indirectCircleDepSum2(), indirectCircleDepSum3(),
        depSelfSum1(), 
        depSelfSum2(),
        loopSum1(),
    ].reduce((pre, cur) => pre + cur)
}