import { sum } from './sync_module/index'

async function run(){
    document.querySelector('#app').innerHTML = await sum()
}
run()
