//ข้อ 1: Check duplicate items from list A and list B and append to a new list. Using yourpreferred programming language.

const listA = [1, 2, 3, 5, 6, 8, 9];
const listB = [3, 2, 1, 5, 6, 0];

const setNewlist = new Set(listB);
const duplicateItems = listA.filter(item => setNewlist.has(item));
console.log("Duplicate items::", duplicateItems);