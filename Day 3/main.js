//  -- Sort & Search:

// -- Bubble Sort:

let r = [];

function bubbleSort(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j <= numbers.length - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        r = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = r;
      }
    }
  }
  return numbers;
}

let arrBubble = [77, 34, 15, 20, 1, 40];
r = bubbleSort(arrBubble);
console.log(r);

// -- Selection Sort :

function selectionSort(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let min = i;
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] < numbers[min]) {
        min = j;
      }
    }
    let s = numbers[i];
    numbers[i] = numbers[min];
    numbers[min] = s;
  }
  return numbers;
}
let arrSelect = [7, 17, 1, 10, 23];
let resultSel = selectionSort(arrSelect);
console.log(resultSel);

// Insertion Sort :

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Example usage:
let unsortedArray = [5, 2, 4, 6, 1, 3];
let sortedArray = insertionSort(unsortedArray);
console.log("Sorted Array:", sortedArray);

// Linear search :

function linearSearch(numbers, c) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === c) {
      return i;
    }
  }
  return "this number is not in the array";
}
let c = 23;
let arrLinear = [7, 17, 1, 10, 23];
let resLinear = linearSearch(arrLinear, c);
console.log(resLinear);

// Binary search :

function binarySearch(numbers, c) {
  let min = 0;
  let max = numbers.length - 1;
  while (min <= max) {
    let mid = parseInt((min + max) / 2);
    if (c === numbers[mid]) {
      return mid;
    } else if (c > numbers[mid]) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return -1;
}
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let bin = binarySearch(arr2, 10);
console.log(bin);
//----------------------------------------------
