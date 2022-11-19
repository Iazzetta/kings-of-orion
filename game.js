import { __qs, __qsall } from './utils.js'

import { Constructions } from './constructions.js';
import { ConstructionEngine } from './construction.engine.js';

export default class Game {
    constructor(gameData) {
        this.data = gameData
        this.construction = null;
        this.my_constructions = {}
        this.updateInfo()
        this.buildCity()
        this.buildConstructionMenu()
        this.loadEvents()
    }

    updateInfo () {
        const $nav = __qs('#nav')
        $nav.innerHTML = `
            <div>${this.data.name}</div>
            <ul>
                <li id="food">🌽 ${this.data.food} alimentos</li>
                <li id="wood">🪵 ${this.data.wood} madeiras</li>
                <li id="stone">🪨 ${this.data.stone} pedras</li>
                <li id="gold">🟡 ${this.data.gold} ouro</li>
                <li id="diamond">💎 ${this.data.diamond} diamante</li>
            </ul>
        `
    }

    buildCity () {
        const $map = __qs('#map')
        for ( let i = 1; i <= 120; i++) {
            $map.innerHTML += `
                <span class="block" id="${i}"></span>
            `
        }
    }

    buildConstructionMenu () {
        const $construction_menu = __qs('#construction-menu .content')
        for ( let i = 0; i < Constructions.length; i++) {
            $construction_menu.innerHTML += `
                <div class="build" id="${Constructions[i].id}">
                    <div>${Constructions[i].name}</div>
                    <div>Food Cost: ${Constructions[i].req_food}</div>
                    <div>Wood Cost: ${Constructions[i].req_wood}</div>
                    <div>Stone Cost: ${Constructions[i].req_stone}</div>
                    <button class="select-construction" id="${Constructions[i].id}">Construir</button>
                </div>
            `
        }
    }

    loadEvents() {
        let _this = this;
        __qsall('.block').forEach((el) => {
            el.addEventListener( 'click', (e) => {
                // if (el !== e.target) return;
                let block_id = e.target.getAttribute('id')
                if (!block_id) block_id = e.target.parentNode.parentNode.getAttribute('id');
                _this.build(block_id)
            })
        })
        __qsall('.select-construction').forEach((el) => {
            el.addEventListener( 'click', (e) => {
                // if (el !== e.target) return;
                _this.selectConstruction(e.target.getAttribute('id'))
            })
        })
    }

    build(block_id) {
        const block_name = `b${block_id}`
        // check if exist any constructions
        if (this.my_constructions[block_name]) {
            // reset
            this.construction = null;
            this.collectAll(block_name)
        } else {
            // create new construction
            if (!this.construction) {
                console.log('Nenhuma construção selecionada!')
                return false;
            }
            if (
                this.construction.req_food <= this.data.food && 
                this.construction.req_wood <= this.data.wood && 
                this.construction.req_stone <= this.data.stone
            ) {
                // buy
                this.data.food -= this.construction.req_food
                this.data.wood -= this.construction.req_wood
                this.data.stone -= this.construction.req_stone
    
                // draw
                const html = this.construction.html
                __qs(`.block[id="${block_id}"]`).innerHTML = this.construction.html
    
                // save
                this.my_constructions[block_name] = new ConstructionEngine(this.construction, block_id)
    
            }
        }
        // update info
        this.updateInfo()
    }

    collectAll (block_name) {
        for (let key in this.my_constructions) {
            const another_block = this.my_constructions[key]
            if (another_block.type == this.my_constructions[block_name].type) {
                const result = this.my_constructions[key].collect()
                if (result) {
                    if (result.type == 'food') this.data.food += result.collect
                    if (result.type == 'wood') this.data.wood += result.collect
                    if (result.type == 'stone') this.data.stone += result.collect
                } else {
                    console.log('Nada para colher ainda...')
                }
            }
        }
    }

    selectConstruction(construct_id) {
        try {
            this.construction = Constructions.filter(x => x.id == construct_id)[0]
        } catch(error) { 
            console.log(error)
            alert('Nenhuma construção selecionada!')
        }
    }
}