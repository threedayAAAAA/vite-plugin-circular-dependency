import { sum } from './sync_module/index'
import { dasyncSum } from './dasync_module/index'

async function run(){
    const syncModuleSum = document.createElement('p')
    syncModuleSum.innerHTML = await sum()
    
    const dasyncModuleSum = document.createElement('p')
    dasyncModuleSum.innerHTML = await dasyncSum()

    document.querySelector('#app').appendChild(syncModuleSum)
    document.querySelector('#app').appendChild(dasyncModuleSum)
}
run()
