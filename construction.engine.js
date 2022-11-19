import { __qs } from "./utils.js";

export class ConstructionEngine {
    constructor(construction, block_id) { 
        this.construction = construction
        this.collect_box = 0;
        this.type = construction.type
        this.block_id = block_id
        this.init()
    }

    init () {
        console.log(`Construindo em ${this.construction.building_time} segundos...`)
        __qs(`.block[id="${this.block_id}"] .face.top`).classList.add('building')
        __qs(`.block[id="${this.block_id}"] .face.side`).classList.add('building')
        __qs(`.block[id="${this.block_id}"] .face.front`).classList.add('building')
        const _this = this
        setTimeout(() => {
            __qs(`.block[id="${this.block_id}"] .face.top`).classList.remove('building')
            __qs(`.block[id="${this.block_id}"] .face.side`).classList.remove('building')
            __qs(`.block[id="${this.block_id}"] .face.front`).classList.remove('building')
            setInterval(() => {
                if ((_this.collect_box + _this.construction.collect) <= _this.construction.storage) {
                    _this.collect_box += _this.construction.collect
                } else {
                    __qs(`.block[id="${this.block_id}"] .face.top`).innerHTML = 
                    `<span class="collect"></span>`
                }
            }, _this.construction.delay_farm * 1000)

        }, this.construction.building_time * 1000)
    }

    collect () {
        const _c = this.collect_box
        const _t = this.type
        const response = {
            "collect": _c,
            "type": _t
        }
        this.collect_box = 0;
        __qs(`.block[id="${this.block_id}"] .face.top`).innerHTML = ``
        return response
    }
}