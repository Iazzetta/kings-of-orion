import { buildIcon } from "./utils.js";
// https://riseofkingdoms.fandom.com/wiki/Buildings
export const Constructions = [
    {
        "id": 1,
        "name": "Fazenda",
        "type": "food",
        "description": "Fornece comida para as pessoas",
        "level": 1,
        "icon": buildIcon("food"),
        "collect": 50,
        "storage": 200,
        "delay_farm": 3,
        "finish_build": 5,
        "power": 10,
        "req_food": 0,
        "req_wood": 100,
        "req_stone": 0,
        "req_gold": 0, 
        "building_time": 10,
        "html": `
            <div class='construction corn image-block'>
                <div class="svg-image"><img src="/constructions/corn.svg"></div>
            </div>
        `
    },
    {
        "id": 2,
        "name": "Serraria",
        "type": "wood",
        "description": "Produz madeira de árvores",
        "level": 1,
        "icon": buildIcon("wood"),
        "collect": 50,
        "storage": 200,
        "delay_farm": 3,
        "finish_build": 5,
        "power": 10,
        "req_food": 100,
        "req_wood": 0,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 15,
        "html": `
            <div class='construction wood'>
                <div class='face front'></div>
                <div class='face side'></div>
                <div class='face top'></div>
            </div>
        `
    },
    {
        "id": 3,
        "name": "Pedreira",
        "type": "stone",
        "description": "Reúne pedras úteis",
        "level": 1,
        "icon": buildIcon("stone"),
        "collect": 50,
        "storage": 200,
        "delay_farm": 5,
        "finish_build": 5,
        "power": 10,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 20,
        "html": `
            <div class='construction image-block stone'>
                <div class="svg-image"><img src="/constructions/mining_rock.svg"></div>
            </div>
        `
    },
    {
        "id": 4,
        "name": "Mina de Ouro",
        "type": "gold",
        "description": "Exploradores em busca de ouro",
        "level": 1,
        "icon": buildIcon("gold"),
        "collect": 50,
        "storage": 200,
        "delay_farm": 10,
        "finish_build": 6,
        "power": 20,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 30,
        "html": `
            <div class='construction gold'>
                <div class='face front'></div>
                <div class='face side'></div>
                <div class='face top'></div>
            </div>
        `
    },
    {
        "id": 5,
        "name": "Guerreiros",
        "type": "warrior",
        "description": "Aldeia de treino dos guerreiros",
        "level": 1,
        "icon": buildIcon("warrior"),
        "collect": 100,
        "storage": 500,
        "delay_farm": 30,
        "finish_build": 7,
        "power": 500,
        "req_food": 500,
        "req_wood": 500,
        "req_stone": 500,
        "req_gold": 300, 
        "building_time": 60,
        "html": `
        <div class='construction warrior'>
            <div class='face front'></div>
            <div class='face side'></div>
            <div class='face top'></div>
        </div>
        `
    },
    {
        "id": 6,
        "name": "Arqueiros",
        "type": "archer",
        "description": "Aldeia de treino dos arqueiros",
        "level": 1,
        "icon": buildIcon("archer"),
        "collect": 100,
        "storage": 500,
        "delay_farm": 25,
        "finish_build": 7,
        "power": 400,
        "req_food": 450,
        "req_wood": 450,
        "req_stone": 450, 
        "req_gold": 300, 
        "building_time": 50,
        "html": `
        <div class='construction archer'>
            <div class='face front'></div>
            <div class='face side'></div>
            <div class='face top'></div>
        </div>
        `
    },
    {
        "id": 7,
        "name": "Defensores",
        "type": "defensor",
        "description": "Aldeia de treino dos defensores",
        "level": 1,
        "icon": buildIcon("defensor"),
        "collect": 100,
        "storage": 500,
        "delay_farm": 35,
        "finish_build": 7,
        "power": 600,
        "req_food": 600,
        "req_wood": 600,
        "req_stone": 600, 
        "req_gold": 300, 
        "building_time": 120,
        "html": `
        <div class='construction defensor'>
            <div class='face front'></div>
            <div class='face side'></div>
            <div class='face top'></div>
        </div>
        `
    },
    {
        "id": 8,
        "name": "Magicos",
        "type": "magic",
        "description": "Aldeia de treino dos mágicos",
        "level": 1,
        "icon": buildIcon("magic"),
        "collect": 100,
        "storage": 500,
        "delay_farm": 40,
        "finish_build": 10,
        "power": 700,
        "req_food": 700,
        "req_wood": 700,
        "req_stone": 700, 
        "req_gold": 400, 
        "building_time": 150,
        "html": `
        <div class='construction magic'>
            <div class='face front'></div>
            <div class='face side'></div>
            <div class='face top'></div>
        </div>
        `
    },
    {
        "id": 9,
        "name": "Muralha",
        "type": "wall",
        "description": "Construa muralhas para proteger seus recursos",
        "level": 1,
        "icon": buildIcon("wall"),
        "collect": 0,
        "storage": 1,
        "delay_farm": 0,
        "finish_build": 2,
        "power": 200,
        "req_food": 300,
        "req_wood": 300,
        "req_stone": 300, 
        "req_gold": 250, 
        "building_time": 10,
        "html": `
        <div class='construction wall'>
            <div class='face front'></div>
            <div class='face side'></div>
            <div class='face top'></div>
        </div>
        `
    },
    {
        "id": 10,
        "name": "Castelo",
        "type": "gold",
        "description": "Castelo do seu Império",
        "level": 1,
        "icon": buildIcon("castle"),
        "collect": 2000,
        "storage": 20000,
        "delay_farm": 60,
        "finish_build": 20,
        "power": 5000,
        "req_food": 2000,
        "req_wood": 2000,
        "req_stone": 2000, 
        "req_gold": 2000, 
        "building_time": 60 * 2,
        "html": `
        <div class='construction castle'>
            <div class="emoji-avatar">${buildIcon("castle")}</div>
        </div>
        `
    },
    {
        "id": 11,
        "name": "Igreja",
        "type": "gold",
        "description": "Igreja do seu Império",
        "level": 1,
        "icon": buildIcon("church"),
        "collect": 1000,
        "storage": 10000,
        "delay_farm": 60,
        "finish_build": 20,
        "power": 4000,
        "req_food": 1500,
        "req_wood": 1500,
        "req_stone": 1500, 
        "req_gold": 1500, 
        "building_time": 60 * 2,
        "html": `
        <div class='construction church'>
            <div class="emoji-avatar">${buildIcon("church")}</div>
        </div>
        `
    },
    {
        "id": 12,
        "name": "Hospital",
        "type": "hospital",
        "description": "Hospital para cuidar dos seus soldados",
        "level": 1,
        "icon": buildIcon("hospital"),
        "collect": 50,
        "storage": 50,
        "delay_farm": 0,
        "finish_build": 20,
        "power": 2500,
        "req_food": 1000,
        "req_wood": 1000,
        "req_stone": 1000, 
        "req_gold": 1000, 
        "building_time": 60 * 2,
        "html": `
        <div class='construction hospital'>
            <div class="emoji-avatar">${buildIcon("hospital")}</div>
        </div>
        `
    },
]