import { Utils } from "uu5g05";

export const INITIAL_MEMBER_LIST = [
    { id: Utils.String.generateId(), name: "Petr", surname: "Vlk", owner: true},
    { id: Utils.String.generateId(), name: "Ondřej", surname: " Korejs", owner: false},
    { id: Utils.String.generateId(), name: "Jana", surname: " Drobná", owner: false},
  ];

export const INITIAL_NAME = "Potraviny";

export const INITIAL_SHOPPING_LIST = [
    { id: Utils.String.generateId(), name: "Mléko", done: false},
    { id: Utils.String.generateId(), name: "Chleba", done: true},
    { id: Utils.String.generateId(), name: "Máslo", done: true},
    { id: Utils.String.generateId(), name: "Pivo", done: false},
    { id: Utils.String.generateId(), name: "Šunka", done: false},
];