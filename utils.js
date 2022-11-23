export const __qs = (el) => document.querySelector(el)
export const __qsall = (el) => document.querySelectorAll(el)
export const buildIcon = (type) => {
    if (type == "food") return "🌽"
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