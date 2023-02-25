import { sum as normalSum } from './normal/normal'
import { sum as circleDepSum } from './circleDep/circleDep'
import { sum as depSelfSum } from './depSelf/depSelf'
import { sum as indirectCircleDepSum } from './indirectCircleDep/indirectCircleDep'

export const dasyncSum = async () => {
    return await normalSum() + 
        await circleDepSum() + 
        await depSelfSum() + 
        await indirectCircleDepSum()
}