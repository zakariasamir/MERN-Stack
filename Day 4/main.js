class Me {
  constructor(firstname, lastname, age) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._age = age;
    this._fullname = `${firstname} ${lastname}`;
  }
  get fullname() {
    return this._fullname;
  }
  set fullname(value) {
    const [firstname, lastname] = value.split(" ");
    this._firstname = firstname;
    this._lastname = lastname;
    this._fullname = `${firstname} ${lastname}`;
  }
}
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  compareAge(otherPerson) {
    if (this.age < otherPerson.age) {
      return `${otherPerson.name} is older than me.`;
    } else if (this.age > otherPerson.age) {
      return `${otherPerson.name} is younger than me.`;
    } else {
      return `${otherPerson.name} is the same age as me.`;
    }
  }
}

const p1 = new Person("Samuel", 24);
const p2 = new Person("Joel", 36);
const p3 = new Person("Lily", 24);

console.log(p1.compareAge(p2));
console.log(p2.compareAge(p1));
console.log(p1.compareAge(p3));

function mostOccurred(numbers) {
  const occurrences = {};
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    occurrences[num] = (occurrences[num] || 0) + 1;
  }
  let mostOccurredNum;
  let maxOccurrences = -1;
  for (const num in occurrences) {
    if (occurrences[num] > maxOccurrences) {
      mostOccurredNum = num;
      maxOccurrences = occurrences[num];
    }
  }
  return parseInt(mostOccurredNum);
}

// Example usage:
const numbers = [4, 2, 2, 7, 2];
const result = mostOccurred(numbers);
console.log(result); // Output: 4
