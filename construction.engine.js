import { __qs, __qsall } from "./utils.js";

export class ConstructionEngine {
    constructor(construction, block_id, game) { 
        this.construction = construction
        this.collect_box = 0;
        this.type = construction.type
        this.block_id = block_id
        this.element = __qs(`.block[id="${this.block_id}"]`);
        this.magicid = Math.random()
        this.game = game;
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
                    this.magicInfo(this.block_id, this.type, this.game)
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
        this.destroyMagicInfo()
        return response
    }

    magicInfo (block_id, type, game) {
        if (__qs(`.magic-info[id="${block_id}"]`)) return;
        var rect = __qs(`.block[id="${block_id}"]`).getBoundingClientRect();
        const dd_view = __qs('#map').classList.contains('dd')
        __qs('body').insertAdjacentHTML('beforeend', `
            <span id="${block_id}" style="top: ${rect.top - 10}px;left: ${rect.left + 42 + (dd_view ? -40:0)}px;" class="magic-info">
                ${ type == "food" ? '🌽':'' }
                ${ type == "wood" ? '🪵':'' }
                ${ type == "stone" ? '🪨':'' }
                ${ type == "gold" ? '🟡':'' }
            </span>
        `)
        game.loadEvents();
    }

    destroyMagicInfo() {
        try {
            __qs(`.magic-info[id="${this.block_id}"]`).remove();
        } catch(e) {}
    }

    static destroyAllMagicInfo() {
        try {
            __qsall(`.magic-info`).forEach(el => el.remove())
        } catch(e) {}
    }
    static recreateMagicInfo(constructions) {
        for (let key in constructions) {
            const block_id = Number(key.replace('b', ''))
            console.log(constructions[key])
            if (constructions[key].collect_box == constructions[key].construction.storage) {
                this.prototype.magicInfo(block_id, constructions[key].construction.type, constructions[key].game)
            }
        }
    }
}