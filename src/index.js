"use strict";
exports.__esModule = true;
var MicroEvent = require("./modules/microEvent.js");
var ListStore = {
    items: [],
    getAll: function () {
        return this.items;
    }
};
var button = document.querySelector('.button');
var ul = document.querySelector('.ul');
var createNewItem = function () {
    var li = document.createElement('li');
    li.innerHTML = 'asd';
    ul && ul.appendChild(li);
};
button && button.addEventListener('click', createNewItem);
console.log(MicroEvent);
