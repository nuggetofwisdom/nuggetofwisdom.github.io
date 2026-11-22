// ---------- SORT ----------

// Numbers: sort() with no compare function sorts as strings ("10" < "3"),
// so we pass compareFn to sort them numerically.
const nums = [12, 10, 8, 3];

function compareFn(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

console.log(nums.sort(compareFn));

// Strings: the default sort puts capital letters first ("Bananas" before "apples")
const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

let simpleSort = simpleList.sort();
console.log(simpleSort);

// Make everything lowercase first, then sort, so the order is truly alphabetical
let lowerList = simpleList.map(function (fruit) {
  return fruit.toLowerCase();
});

let lowerSort = lowerList.sort();
console.log(lowerSort);

// ---------- FILTER (simple array) ----------

let searchTerm = 'co';

function searchFruit(item) {
  return item.includes(searchTerm);
}

let filterFruit = lowerSort.filter(searchFruit);
console.log(filterFruit); // ['broccoli', 'coconuts']

// ---------- SORT (object array) ----------

const products = [
  {
    productName: "Wireless Mouse",
    price: 29.99
  },
  {
    productName: "Bluetooth Keyboard",
    price: 49.99
  },
  {
    productName: "Laptop Stand",
    price: 39.99
  }
];

// Compare a property of each object instead of the objects themselves
function comparePrice(a, b) {
  if (a.price < b.price) {
    return -1;
  } else if (a.price > b.price) {
    return 1;
  }
  return 0;
}

let productSort = products.sort(comparePrice);
console.log(productSort); // Mouse, Laptop Stand, Keyboard

// ---------- FILTER (object array) ----------

const animals = [
  {
    name: "Lion",
    traits: ["brave", "strong", "fierce", "wild"]
  },
  {
    name: "Elephant",
    traits: ["large", "gentle", "smart", "wild"]
  },
  {
    name: "Fox",
    traits: ["sly", "quick", "clever", "wild"]
  },
  {
    name: "Dog",
    traits: ["loyal", "friendly", "playful", "cuddly"]
  },
  {
    name: "Cat",
    traits: ["quiet", "independent", "curious", "cuddly"]
  }
];

// Filter by a string property (name)
let query = 'dog';

function searchList(item) {
  return item.name.toLowerCase().includes(query.toLowerCase());
}

let filteredList = animals.filter(searchList);
console.log(filteredList); // Dog

// Filter by an array property (traits): find() returns a matching trait
// (truthy) or undefined (falsy), which is all filter() needs.
let queryTrait = 'wild';

function searchTraits(item) {
  return item.traits.find((trait) => trait.toLowerCase().includes(queryTrait.toLowerCase()));
}

let filteredTraits = animals.filter(searchTraits);
console.log(filteredTraits); // Lion, Elephant, Fox
