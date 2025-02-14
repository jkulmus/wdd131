function getGrades(inputSelector) {
    const gradesInput = document.querySelector(inputSelector).value;
    if (!gradesString) return [];

    const grades = gradesString.split(',').map(grade => grade.trim().toUpperCase());
    return grades;
}

function lookupGrade(grade) {
    switch (grade) {
        case 'A': return 4.0;
        case 'B': return 3.0;
        case 'c': return 2.0;
        case 'D': return 1.0;
        case 'F': return 0.0;
        default: return 0.0;
    }
}

function calculateGpa(grades) {
    const gpaPoints = grades.map(lookupGrade);
    const totalPoints = gpaPoints.reduce((sum, point) => sum + point, 0);
    return (totalPoints / grades.length).toFixed(2);
}

function outputGpa(gpa, selector) {
    document.querySelector(selector).textContent = `Your GPA is: ${gpa}`;
}

function clickHandler() {
    const grades = getGrades('#grades');
    const gpa = calculateGpa(grades);
    outputGpa(gpa, '#output');
}

document.querySelector("#submitButton").addEventListener("click", clickHandler);