import { buildIcon, buildNames, notify, __qs, __qsall, nFormatter } from './utils.js'

import { Constructions } from './constructions.js';
import { ConstructionEngine } from './construction.engine.js';

let zoomX = 1.7;
let zoomY = 1;
let zoomZ = 0.2;
let selectedView = 'isometric';
let last_block_id = 1;


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
        const power = this.data.warrior + this.data.archer + this.data.defensor
        $nav.innerHTML = `
            <div class="logo">Kings of Orion</div>
            <ul class="nav-stats">
                <li id="food" title="poder">${buildIcon('power')} ${nFormatter(power , 1)}</li>
                <li id="food" title="alimentos">${buildIcon('food')} ${nFormatter(this.data.food, 1)}</li>
                <li id="wood" title="madeiras">${buildIcon('wood')} ${nFormatter(this.data.wood, 1)}</li>
                <li id="stone" title="pedras">${buildIcon('stone')} ${nFormatter(this.data.stone, 1)}</li>
                <li id="gold" title="ouros">${buildIcon('gold')} ${nFormatter(this.data.gold, 1)}</li>
                <li id="gold" title="guerreiros">${buildIcon('warrior')} ${nFormatter(this.data.warrior, 1)}</li>
                <li id="gold" title="arqueiros">${buildIcon('archer')} ${nFormatter(this.data.archer, 1)}</li>
                <li id="gold" title="defensores">${buildIcon('defensor')} ${nFormatter(this.data.defensor, 1)}</li>
                <li id="diamond" title="diamantes">${buildIcon('diamond')} ${nFormatter(this.data.diamond)}</li>
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
                    <div class="fw7">${Constructions[i].name}</div>
                    <span class="build-icon">
                        ${ Constructions[i].icon }
                    </span>
                    <ul class="req-build">
                        <li>${buildIcon("food")} ${nFormatter(Constructions[i].req_food)}</li>
                        <li>${buildIcon("wood")} ${nFormatter(Constructions[i].req_wood)}</li>
                        <li>${buildIcon("stone")} ${nFormatter(Constructions[i].req_stone)}</li>
                        <li>${buildIcon("gold")} ${nFormatter(Constructions[i].req_gold)}</li>
                    </ul>
                    <button class="btn select-construction" id="${Constructions[i].id}">Construir</button>
                </div>
            `
        }
    }

    loadEvents() {
        let _this = this;

        // sistema dos blocos (construcao etc)
        if (__qsall('.block:not(.loaded)').length > 0) {
            __qsall('.block:not(.loaded)').forEach((el) => {
                el.classList.add('loaded')
                let clicking = false;
                el.addEventListener( 'mousedown', (e) => {
                    let block_id = e.target.getAttribute('id')
                    if (!block_id) block_id = e.target.parentNode.parentNode.getAttribute('id');
                    _this.build(block_id)
                    clicking = true;
                })
                el.addEventListener('mouseup', (e) => {
                    clicking = false;
                })
                el.addEventListener('mouseover', (e) => {
                    if(e.buttons == 1 || e.buttons == 3){
                        let block_id = e.target.getAttribute('id')
                        if (!block_id) block_id = e.target.parentNode.parentNode.getAttribute('id');
                        _this.build(block_id)
                    }
                })
            })
        }

        // magic info - icones animados em cima dos blocos
        if (__qsall('.magic-info:not(.loaded)').length > 0) {
            __qsall('.magic-info:not(.loaded)').forEach((el) => {
                el.classList.add('loaded')
                el.addEventListener( 'click', (e) => {
                    let block_id = e.target.getAttribute('id')
                    if (!block_id) block_id = e.target.parentNode.getAttribute('id');
                    _this.build(block_id)
                })
            })
        }

        // seleção do construtor
        if (__qsall('.select-construction:not(.loaded)').length > 0) {
            __qsall('.select-construction:not(.loaded)').forEach((el) => {
                el.classList.add('loaded')
                el.addEventListener( 'click', (e) => {
                    // if (el !== e.target) return;
                    _this.selectConstruction(e.target.getAttribute('id'))
                })
            })
        }

        // change view (isometric/2d)
        if (__qs('.change-view:not(.loaded)')) {
            __qs('.change-view:not(.loaded)').addEventListener('click', (e) => {
                if (__qs('#map').classList.contains('dd')) {
                    __qs('#map').classList.remove('dd')
                    selectedView = 'isometric'
                    e.target.src = '2d.svg'
                } else {
                    e.target.src = '25d.svg'
                    __qs('#map').classList.add('dd')
                    selectedView = '2d'
                }
                ConstructionEngine.recreateMagicInfo(_this.my_constructions)
            })
            __qs('.change-view:not(.loaded)').classList.add('loaded')
        }

        // zoom +
        if (__qs('.zoom-plus:not(.loaded)')) {
            __qs('.zoom-plus:not(.loaded)').addEventListener('click', (e) => {
                if (selectedView == 'isometric') {
                    zoomX += 0.1
                    zoomY += 0.1
                    if (zoomX >= 1.7) zoomX = 1.7
                    if (zoomY >= 1) zoomY = 1
                    __qs('#map').style.transform = `
                        scaleX(${zoomX}) scaleY(${zoomY}) scaleZ(${zoomZ})
                        rotateX(62deg) rotateY(0deg) rotateZ(339deg) 
                        translateX(-26px) translateY(37px) translateZ(0px) 
                        skewX(19deg) skewY(-26deg)
                    `;
                    ConstructionEngine.recreateMagicInfo(_this.my_constructions)
                }
            })
            __qs('.zoom-plus:not(.loaded)').classList.add('loaded')
        }

        // zoom -
        if (__qs('.zoom-minus:not(.loaded)')) {
            __qs('.zoom-minus:not(.loaded)').addEventListener('click', (e) => {
                if (selectedView == 'isometric') {
                    zoomX -= 0.1
                    zoomY -= 0.1
                    if (zoomX <= 1.2) zoomX = 1.2
                    if (zoomY<= 0.5) zoomY = zoomY = 0.5
                    __qs('#map').style.transform = `
                        scaleX(${zoomX}) scaleY(${zoomY}) scaleZ(${zoomZ})
                        rotateX(62deg) rotateY(0deg) rotateZ(339deg) 
                        translateX(-26px) translateY(37px) translateZ(0px) 
                        skewX(19deg) skewY(-26deg)
                    `;
                    ConstructionEngine.recreateMagicInfo(_this.my_constructions)
                }
            })
            __qs('.zoom-minus:not(.loaded)').classList.add('loaded')
        }

        if (__qs('body:not(.listening)')) {
            window.addEventListener('scroll', (e) => ConstructionEngine.recreateMagicInfo(_this.my_constructions))
            window.addEventListener('resize', (e) => ConstructionEngine.recreateMagicInfo(_this.my_constructions))
            __qs('body:not(.listening)').addEventListener('touchend', (e) => ConstructionEngine.recreateMagicInfo(_this.my_constructions))
            __qs('body:not(.listening)').addEventListener('keypress', (e) => {
                if (e.key == 'b') {
                    _this.toggleConstructMenu()
                }
            })
            __qs('body:not(.listening)').classList.add('listening')
        }
        
        // open/close construction menu
        if (__qs('.build-menu:not(.loaded)')) {
            __qs('.build-menu').addEventListener('click', (e) => {
                _this.toggleConstructMenu()
            })
            __qs('.build-menu').classList.add('loaded')
        }
    }

    toggleConstructMenu () {
        if (__qs('.build-menu').classList.contains('on')) {
            __qs('.construction-menu').style.height = '400px';
            __qs('.build-menu').classList.remove('on')
        } else {
            __qs('.construction-menu').style.height = '40px';
            __qs('.build-menu').classList.add('on')
            // __qs(`.block[id="${last_block_id}"]`).scrollTo({top: 0, left: 0, behavior: 'smooth'});
            // __qs(`.block[id="${last_block_id}"]`).scrollIntoView({
            //     behavior: 'auto',
            //     block: 'center',
            //     inline: 'center'
            // });
        }
    }
    closeConstructMenu () {
        __qs('.construction-menu').style.height = '45px';
        __qs('.build-menu').classList.add('on')
        // __qs(`.block[id="${last_block_id}"]`).scrollTo({top: 0, left: 0, behavior: 'smooth'});
        if (__qs(`.block[id="${last_block_id}"]`)) {
            __qs(`.block[id="${last_block_id}"]`).scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
    cancelBuildMode() {
        this.construction = null;
        __qsall(`.select-construction`).forEach((el) => { 
            el.classList.remove('waiting-build')
            el.innerText = 'Construir'
        })
        __qsall('.block').forEach((el) => el.classList.remove('to-build'))
        __qs('.manage-construction').classList.remove('on')
    }
    enableBuildMode(construct_id) {
        __qs(`.select-construction[id="${construct_id}"]`).classList.add('waiting-build')
        __qs(`.select-construction[id="${construct_id}"]`).innerText = 'Selecione a região';
        __qsall('.block').forEach((el) => el.classList.add('to-build'))
        __qs('.manage-construction').classList.add('on')
    }

    build(block_id) {
        last_block_id = block_id;
        const $block = __qs(`.block[id="${block_id}"]`);
        // this.closeConstructMenu()
        if ($block) {
            const block_name = `b${block_id}`
            // check if exist any constructions
            if (this.my_constructions[block_name]) {
                // reset
                // this.cancelBuildMode()
                this.collectAll(block_name)
                this.manageConstruction(this.my_constructions[block_name])
                this.openInfoBox(block_id)
            } else {
                // create new construction
                if (!this.construction) {
                    console.log('Nenhuma construção selecionada!')
                    this.cancelBuildMode()
                    return false;
                }

                if (this.construction.req_food > this.data.food) return;
                if (this.construction.req_wood > this.data.wood) return;
                if (this.construction.req_stone > this.data.stone) return;
                if (this.construction.req_gold > this.data.gold) return;

                // buy
                this.data.food -= this.construction.req_food
                this.data.wood -= this.construction.req_wood
                this.data.stone -= this.construction.req_stone
                this.data.gold -= this.construction.req_gold
    
                // draw
                const html = this.construction.html
                __qs(`.block[id="${block_id}"]`).innerHTML = this.construction.html
    
                // save
                this.my_constructions[block_name] = new ConstructionEngine(this.construction, block_id, this)
        
            }
            // update info
            this.updateInfo()
            // reset
            const _this = this;
            setTimeout(() => {
                ConstructionEngine.recreateMagicInfo(_this.my_constructions)
            }, 500)
        }
    }

    collectAll (block_name) {
        for (let key in this.my_constructions) {
            const another_block = this.my_constructions[key]
            if (another_block.type == this.my_constructions[block_name].type) {
                const result = this.my_constructions[key].collect()
                if (result) {
                    this.data[result.type] += result.collect
                    if (result.collect > 0) {
                        ConstructionEngine.collectedAmount(result.block_id, result.collect)
                    }
                } else {
                    console.log('Nada para colher ainda...')
                }
            }
        }
    }

    openInfoBox () {
        if (!__qs('.manage-construction').classList.contains('on'))
            __qs('.manage-construction').classList.add('on')
    }

    selectConstruction(construct_id) {
        try {
            this.cancelBuildMode()
            this.construction = Constructions.filter(x => x.id == construct_id)[0]

            if (this.construction.req_food > this.data.food) {
                notify(`Faltam ${this.construction.req_food - this.data.food} ${buildIcon('food')} para construir.`)
                this.cancelBuildMode()
                return;
            }
            else if (this.construction.req_wood > this.data.wood) {
                notify(`Faltam ${this.construction.req_wood - this.data.wood} ${buildIcon('wood')} para construir.`)
                this.cancelBuildMode()
                return;
            }
            else if (this.construction.req_stone > this.data.stone) {
                notify(`Faltam ${this.construction.req_stone - this.data.stone} ${buildIcon('stone')} para construir.`)
                this.cancelBuildMode()
                return;
            }
            else if (this.construction.req_gold > this.data.gold) {
                notify(`Faltam ${this.construction.req_gold - this.data.gold} ${buildIcon('gold')} para construir.`)
                this.cancelBuildMode()
                return;
            }

            this.manageConstruction()
            // this.enableBuildMode(construct_id)
            this.loadEvents()
        } catch(error) { 
            console.log(error)
            alert('Nenhuma construção selecionada!')
            this.cancelBuildMode()
        }
    }

    destroyConstruction(block_id) {
        try {
            const block_name = `b${block_id}`
            if (block_name in this.my_constructions) {
                // this.cancelBuildMode()
                this.construction = null
                this.my_constructions[block_name].destroy()
                delete this.my_constructions[block_name]
            }
        } catch(error) { 
            console.log(error)
            alert('Erro ao destruir!')
        }
    }

    manageConstruction (construction = null) {
        try { __qs('.manage-construction .cancel').removeEventListener('click', (e) => this.cancelBuildMode()) } catch(e){}

        let _c = (construction ? construction.construction:this.construction)
        __qs('.manage-construction').innerHTML = `
        <div class="build" id="${construction ? construction.block_id:_c.id}">
            <span class="build-icon">
                ${ buildIcon(_c.type) }
            </span>
            <span class="fw7">${_c.name} <small>${construction ? '#' + construction.block_id:''}</small></span>
            <div class="info">
                <ul>
                    <li>+ ${_c.power} poder</li>
                    ${ _c.delay_farm > 0 ? `
                        <li>${buildIcon(_c.type)} + ${_c.collect}/${_c.delay_farm}s</li>
                    `:''}
                </ul>
                <p>${_c.description}</p>
                <ul class="req-build">
                    <li>${buildIcon("food")} ${nFormatter(_c.req_food)}</li>
                    <li>${buildIcon("wood")} ${nFormatter(_c.req_wood)}</li>
                    <li>${buildIcon("stone")} ${nFormatter(_c.req_stone)}</li>
                    <li>${buildIcon("gold")} ${nFormatter(_c.req_gold)}</li>
                </ul>
            </div>
            <div class="actions">
                ${!construction ? `<button class="btn select-construction" id="${_c.id}">Construir</button>`:''}
                ${construction ? `<button class="btn destroy" id="${construction.block_id}">Destruir</button>`:''}
                ${construction && construction.building ? `<button class="btn finish-build" id="${construction.block_id}">Finalizar +${nFormatter(_c.finish_build)} ${buildIcon('diamond')}</button>`:''}
                <button class="btn cancel">Fechar</button>
            </div>
        </div>
        `;
        __qs('.manage-construction .cancel').addEventListener('click', (e) => this.cancelBuildMode())
        this.closeConstructMenu()
        let _this = this;
        try {
            __qs('.destroy').addEventListener('click', (e) => {
                // if (construction && construction.building) return;
                _this.destroyConstruction(e.target.getAttribute('id'))
                _this.cancelBuildMode()
            })
            __qs('.finish-build').addEventListener('click', (e) => {
                _this.data.diamond = construction.buyFastBuild(this.data.diamond)
                _this.updateInfo()
            })
        } catch(e) {}
    }
}