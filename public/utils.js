export const __qs = (el) => document.querySelector(el)
export const __qsall = (el) => document.querySelectorAll(el)
export const buildIcon = (type) => {
  if (type == "power") return "💥"
  else if (type == "food") return "🌽"
  else if (type == "wood") return "🪵"
  else if (type == "stone") return "🪨"
  else if (type == "gold") return "🟡"
  else if (type == "diamond") return "💎"
  else if (type == "warrior") return "🪖"
  else if (type == "archer") return "🏹"
  else if (type == "defensor") return "🛡"
  else if (type == "magic") return "🧙🏻‍♂️"
  else if (type == "castle") return "🏰"
  else if (type == "church") return "⛪"
  else if (type == "hospital") return "🏥"
  else if (type == "wall") return "🧱"
  else return "-"
}
export const buildNames = (type) => {
  if (type == "power") return "Poder"
  else if (type == "food") return "Alimentx"
  else if (type == "wood") return "Madeirx"
  else if (type == "stone") return "Pedrx"
  else if (type == "gold") return "Ourx"
  else if (type == "diamond") return "Diamantx"
  else if (type == "warrior") return "Soldadx"
  else if (type == "archer") return "Arqueirx"
  else if (type == "defensor") return "Defensor"
  else if (type == "magic") return "Magico"
  else if (type == "castle") return "Castelx"
  else if (type == "church") return "Igrejx"
  else if (type == "hospital") return "Hospital"
  else if (type == "wall") return "Muralha"
  else return "-"
}
//https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
export const notify = (text, status = 'error') => {
  if (text) {
    __qsall('.notify').forEach((el) => el.remove())
    let n = document.createElement("div");
    n.classList.add('notify');
    n.classList.add(status);
    n.innerHTML = text;
    document.body.appendChild(n);
    setInterval(() => {
      n.remove();
    }, 3000);
    n.addEventListener('click', (e) => __qsall('.notify').forEach((el) => el.remove()))
  }
}