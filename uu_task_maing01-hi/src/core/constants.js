import { Utils } from "uu5g05";

export const INITIAL_DATA = [
  {
    name: "Potraviny",
    archive: false,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: true },
      { id: "2", name: "Ondřej", surname: "Korejs", owner: false },
      { id: "3", name: "Jana", surname: "Drobná", owner: false },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Mléko", done: false },
      { id: Utils.String.generateId(), name: "Chleba", done: true },
      { id: Utils.String.generateId(), name: "Máslo", done: true },
      { id: Utils.String.generateId(), name: "Pivo", done: false },
      { id: Utils.String.generateId(), name: "Šunka", done: false },
      { id: Utils.String.generateId(), name: "Mléko", done: false },
      { id: Utils.String.generateId(), name: "Chleba", done: true },
    ],
  },
  {
    name: "Drogerie",
    archive: false,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: false },
      { id: "2", name: "Ondřej", surname: "Korejs", owner: true },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Kartáček na zuby", done: false },
      { id: Utils.String.generateId(), name: "Hřeben", done: true },
      { id: Utils.String.generateId(), name: "Pudr", done: true },
      { id: Utils.String.generateId(), name: "Toaletní papír", done: false },
      { id: Utils.String.generateId(), name: "Ubrousky", done: false },
      { id: Utils.String.generateId(), name: "Pudr", done: true },
      { id: Utils.String.generateId(), name: "Toaletní papír", done: false },
      { id: Utils.String.generateId(), name: "Ubrousky", done: false },
      { id: Utils.String.generateId(), name: "Toaletní papír", done: false },
      { id: Utils.String.generateId(), name: "Ubrousky", done: false },
    ],
  },
  {
    name: "Nářadí",
    archive: false,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: true },
      { id: "2", name: "Ondřej", surname: "Korejs", owner: false },
      { id: "3", name: "Jana", surname: "Drobná", owner: false },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Kleště", done: false },
      { id: Utils.String.generateId(), name: "Šroubovák", done: true },
      { id: Utils.String.generateId(), name: "Matice", done: true },
      { id: Utils.String.generateId(), name: "Pila", done: false },
      { id: Utils.String.generateId(), name: "Škrabka", done: false },
    ],
  },
  {
    name: "Oblečení",
    archive: true,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: false },
      { id: "3", name: "Jana", surname: "Drobná", owner: true },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Košile", done: false },
      { id: Utils.String.generateId(), name: "Šála", done: true },
      { id: Utils.String.generateId(), name: "Motýlek", done: true },
      { id: Utils.String.generateId(), name: "Ponožky", done: false },
      { id: Utils.String.generateId(), name: "Kalhoty", done: false },
    ],
  },
  {
    name: "Sport",
    archive: false,
    memberList: [
      { id: "2", name: "Ondřej", surname: "Korejs", owner: true },
      { id: "3", name: "Jana", surname: "Drobná", owner: false },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Hokejka", done: false },
      { id: Utils.String.generateId(), name: "Běžky", done: true },
      { id: Utils.String.generateId(), name: "Švihadlo", done: true },
    ],
  },
  {
    name: "Elektro",
    archive: false,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: false },
      { id: "2", name: "Ondřej", surname: "Korejs", owner: false },
      { id: "3", name: "Jana", surname: "Drobná", owner: true },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Televize", done: false },
      { id: Utils.String.generateId(), name: "Rádio", done: true },
      { id: Utils.String.generateId(), name: "Monitor", done: true },
      { id: Utils.String.generateId(), name: "Klávesnice", done: false },
      { id: Utils.String.generateId(), name: "Mixér", done: false },
    ],
  },
  {
    name: "Děti",
    archive: false,
    memberList: [
      { id: "1", name: "Petr", surname: "Vlk", owner: false },
      { id: "2", name: "Ondřej", surname: "Korejs", owner: false },
      { id: "3", name: "Jana", surname: "Drobná", owner: true },
    ],
    shoppingList: [
      { id: Utils.String.generateId(), name: "Autíčko", done: false },
      { id: Utils.String.generateId(), name: "Panenka", done: true },
      { id: Utils.String.generateId(), name: "Míč", done: true },
      { id: Utils.String.generateId(), name: "Lego", done: false },
    ],
  },
];