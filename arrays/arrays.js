const steps = ["one", "two", "three"];

const listTemplate = (step) => {
  return `<li>${step}</li>`;
};

const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

// Activity 2
const grades = ['A', 'B', 'A'];
const gradeToGpa = (grade) => {
    switch (grade) {
        case 'A': return 4;
        case 'B': return 3;
        case 'C': return 2;
        case 'D': return 1;
        default: return 0;
    }
};

const gpaPoints = grades.map(gradeToGpa);

//Activity 3
const gpa = gpaPoints.reduce((sum, point) => sum + point, 0) / gpaPoints.length;

// Activity 4
const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const shortFruits = fruits.filter(fruit => fruit.length < 6);

// Activity 5
const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyIndex = numbers.inderxOf(luckyNumber);

// Testing Output
console.log("Activity 1:", stepsHtml.join(""));
console.log("Activity 2:", gpaPoints);
console.log("Activity 3:", gpa);
console.log("Activity 4:", shortFruits);
console.log("Activity 5:", luckyIndex);