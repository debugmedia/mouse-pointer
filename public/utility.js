export function createParentContainer(id) {
   const div = document.createElement("div");
   div.setAttribute("data-id", id);
   div.style.position = "absolute";

   return div;
}

export function createMousePointer(color) {
   const div = document.createElement("div");
   div.style.width = "30px";
   div.style.height = "30px";
   div.style.backgroundColor = setBg();
   div.style.borderRadius = "50%";
   div.style.margin = "auto";
   div.style.marginBottom = "10px";

   return div;
}

export function createUsername(data) {
   const span = document.createElement("span");
   span.style.fontSize = "20px";
   span.textContent = data;

   return span;
}

export function setBg() {
   const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
   return "#" + randomColor;
}
