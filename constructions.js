// https://riseofkingdoms.fandom.com/wiki/Buildings
export const Constructions = [
    {
        "id": 1,
        "name": "Fazenda",
        "type": "food",
        "description": "Fornece comida para as pessoas",
        "level": 1,
        "collect": 50,
        "storage": 200,
        "delay_farm": 1,
        "power": 10,
        "req_food": 0,
        "req_wood": 100,
        "req_stone": 0,
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
        "collect": 50,
        "storage": 200,
        "delay_farm": 1,
        "power": 10,
        "req_food": 100,
        "req_wood": 0,
        "req_stone": 0, 
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
        "collect": 50,
        "storage": 200,
        "delay_farm": 1,
        "power": 10,
        "req_food": 100,
        "req_wood": 100,
        "req_stone": 0, 
        "building_time": 1,
        "html": `
            <div class='construction stone'>
                <div class='face front'></div>
                <div class='face side'></div>
                <div class='face top'></div>
            </div>
        `
    },
]