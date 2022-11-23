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
        "delay_farm": 1,
        "power": 10,
        "req_food": 0,
        "req_wood": 100,
        "req_stone": 0,
        "req_gold": 0, 
        "building_time": 1,
        "html": `
            <div class='construction food'>
                <div class='face front'></div>
                <div class='face side'></div>
                <div class='face top'></div>
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
        "delay_farm": 1,
        "power": 10,
        "req_food": 100,
        "req_wood": 0,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 1,
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
        "delay_farm": 1,
        "power": 10,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 1,
        "html": `
            <div class='construction stone'>
                <div class='face front'></div>
                <div class='face side'></div>
                <div class='face top'></div>
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
        "delay_farm": 1,
        "power": 10,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 0, 
        "req_gold": 0, 
        "building_time": 1,
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
        "delay_farm": 1,
        "power": 100,
        "req_food": 200,
        "req_wood": 200,
        "req_stone": 200, 
        "req_gold": 0, 
        "building_time": 5,
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
        "delay_farm": 1,
        "power": 100,
        "req_food": 200,
        "req_wood": 200,
        "req_stone": 200, 
        "req_gold": 0, 
        "building_time": 5,
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
        "delay_farm": 1,
        "power": 100,
        "req_food": 200,
        "req_wood": 200,
        "req_stone": 200, 
        "req_gold": 0, 
        "building_time": 5,
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
        "delay_farm": 1,
        "power": 100,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 100, 
        "req_gold": 1000, 
        "building_time": 5,
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
        "description": "Construa muralhas para o seu império",
        "level": 1,
        "icon": buildIcon("wall"),
        "collect": 0,
        "storage": 1,
        "delay_farm": 0,
        "power": 500,
        "req_food": 100,
        "req_wood": 500,
        "req_stone": 200, 
        "req_gold": 0, 
        "building_time": 2,
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
        "type": "castle",
        "description": "Castelo do seu Império",
        "level": 1,
        "icon": buildIcon("castle"),
        "collect": 0,
        "storage": 1,
        "delay_farm": 0,
        "power": 5000,
        "req_food": 500,
        "req_wood": 500,
        "req_stone": 500, 
        "req_gold": 1000, 
        "building_time": 2,
        "html": `
        <div class='construction castle'>
            <div class="emoji-avatar">${buildIcon("castle")}</div>
        </div>
        `
    },
    {
        "id": 11,
        "name": "Igreja",
        "type": "church",
        "description": "Igreja do seu Império",
        "level": 1,
        "icon": buildIcon("church"),
        "collect": 0,
        "storage": 1,
        "delay_farm": 0,
        "power": 5000,
        "req_food": 500,
        "req_wood": 500,
        "req_stone": 500, 
        "req_gold": 1000, 
        "building_time": 2,
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
        "description": "Hospital do seu Império",
        "level": 1,
        "icon": buildIcon("hospital"),
        "collect": 0,
        "storage": 1,
        "delay_farm": 0,
        "power": 5000,
        "req_food": 500,
        "req_wood": 500,
        "req_stone": 500, 
        "req_gold": 1000, 
        "building_time": 2,
        "html": `
        <div class='construction hospital'>
            <div class="emoji-avatar">${buildIcon("hospital")}</div>
        </div>
        `
    },
]