"use strict";
import { createParentContainer, createMousePointer, createUsername } from "./utility.js";

const socket = io();
const input = document.querySelector("input");
const form = document.querySelector("form");

let currentPlayer = false;
let userList = {};


form.addEventListener("submit", (event) => {
   event.preventDefault();
   const newUser = {
      text: input.value,
   };
   socket.emit("new-user", newUser);
   currentPlayer = true;
   input.value = "";
   document.querySelector(".input-container").remove();
});


socket.on("connect", () => {
   socket.on("fetch-users", (users) => {
      if (Object.keys(users).length === 0) return;
      userList = users;
      for (const user in users) {
         const parentContainer = createParentContainer(users[user].id);
         const mousePointer = createMousePointer(user[user].color);
         const username = createUsername(users[user].text);
         parentContainer.appendChild(mousePointer);
         parentContainer.appendChild(username);
         document.body.appendChild(parentContainer);
      }
   });
});

socket.on("new-user", (newUser) => {
   if (userList[newUser.id]) return;
   userList[newUser.id] = newUser;
   const parentContainer = createParentContainer(newUser.id);
   const mousePointer = createMousePointer(newUser.color);
   const username = createUsername(newUser.text);
   parentContainer.appendChild(mousePointer);
   parentContainer.appendChild(username);

   document.body.appendChild(parentContainer);
});

socket.on("mousemove", (user) => {
   if (userList[user.id]) {
      const container = document.querySelector(`[data-id='${userList[user.id].id}']`);
      container.style.left = user.coordinates.x + "px";
      container.style.top = user.coordinates.y + "px";
   }
});

socket.on("user-left", (user) => {
   if (userList[user.id]) {
      delete userList[user.id];
   }
});

document.addEventListener("mousemove", (event) => {
   if (currentPlayer) {
      socket.emit("mousemmove", { x: event.clientX, y: event.clientY });
   }
});
