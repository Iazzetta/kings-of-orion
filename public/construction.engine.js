import { __qs, __qsall, buildIcon } from "./utils.js";

export class ConstructionEngine {
    constructor(construction, block_id, game) { 
        this.construction = construction
        this.collect_box = 0;
        this.type = construction.type
        this.block_id = block_id
        this.element = __qs(`.block[id="${this.block_id}"]`);
        this.magicid = Math.random()
        this.game = game;
        this.building = true;
        this.buildingInterval = null;
        this.timer = null;
        this.init()
    }

    init () {
        console.log(`Construindo em ${this.construction.building_time} segundos...`)
        __qs(`.block[id="${this.block_id}"]`).classList.add('building')
        __qs(`.block[id="${this.block_id}"]`).classList.add('building')
        __qs(`.block[id="${this.block_id}"]`).classList.add('building')
        const _this = this
        this.buildingInterval = setTimeout(() => {
            _this.finishBuild()
        }, this.construction.building_time * 1000)
    }

    finishBuild () {
        const _this = this;
        try {
            __qs(`.block[id="${_this.block_id}"]`).classList.remove('building')
            __qs(`.block[id="${_this.block_id}"]`).classList.remove('building')
            __qs(`.block[id="${_this.block_id}"]`).classList.remove('building')
            __qs(`.manage-construction .finish-build[id="${_this.block_id}"]`).remove();
        } catch(e) {}
        this.building = false;
        this.work()
    }

    buyFastBuild(diamond) {
        if (this.construction.finish_build <= diamond) {
            clearTimeout(this.buildingInterval)
            this.finishBuild()
            return diamond - this.construction.finish_build
        }
        return diamond;
    }

    work () {
        if (this.construction.delay_farm == 0) return; //no delay, no interval :P
        const _this = this;
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            if ((_this.collect_box + _this.construction.collect) <= _this.construction.storage) {
                _this.collect_box += _this.construction.collect
            } else {
                _this.magicInfo(_this.block_id, _this.type, _this.game)
                clearInterval(_this.timer)
                _this.timer = null;
            }
        }, this.construction.delay_farm * 1000)
    }

    collect () {
        if (this.construction.delay_farm == 0) return;
        if (this.building) return;
        const _c = this.collect_box
        const _t = this.type
        const response = {
            "collect": _c,
            "type": _t,
            "block_id": this.block_id,
        }
        this.collect_box = 0;
        if (!this.timer) this.work()
        this.destroyMagicInfo()
        try {
            __qs(`.block[id="${this.block_id}"] .face.top`).innerHTML = ``
        } catch(e) {}
        return response
    }

    destroy () {
        clearInterval(this.timer)
        __qs(`.block[id="${this.block_id}"]`).innerHTML = '';
    }

    magicInfo (block_id, type, game) {
        if (__qs(`.magic-info[id="${block_id}"]`)) return;
        var rect = __qs(`.block[id="${block_id}"]`).getBoundingClientRect();
        const dd_view = __qs('#map').classList.contains('dd')
        __qs('body').insertAdjacentHTML('beforeend', `
            <span class="magic-info" id="${block_id}" style="top: ${rect.top - 10}px;left: ${rect.left + 40 + (dd_view ? -40:0)}px;">
                ${ buildIcon(type) }
            </span>
        `)
        game.loadEvents();
    }

    static collectedAmount (block_id, amount) {
        if (__qs(`.collected-info[id="${block_id}"]`)) return;
        var rect = __qs(`.block[id="${block_id}"]`).getBoundingClientRect();
        const dd_view = __qs('#map').classList.contains('dd')
        __qs('body').insertAdjacentHTML('beforeend', `
            <span class="collected-info" id="${block_id}" style="top: ${rect.top - 10}px;left: ${rect.left + 40 + (dd_view ? -40:0)}px;">
                +${ amount }
            </span>
        `)
        setTimeout(() => {
            __qs(`.collected-info[id="${block_id}"]`).remove()
        }, 800)
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
        try {
            __qsall(`.magic-info`).forEach(el => el.remove())
        } catch(e) {}
        for (let key in constructions) {
            const block_id = Number(key.replace('b', ''))
            if (constructions[key].collect_box == constructions[key].construction.storage) {
                this.prototype.magicInfo(block_id, constructions[key].construction.type, constructions[key].game)
            }
        }
    }
}