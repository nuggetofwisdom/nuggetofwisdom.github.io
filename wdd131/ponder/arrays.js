function convert(grade) {
    let points;
    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first: 'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];


const studentList = document.querySelector('#students');
students.forEach(student => {
    studentList.innerHTML += `<li>${student.first} ${student.last}</li>`;
    console.log(`${student.last}, ${student.first}`);
});


const grades = ['A', 'B', 'A', 'C', 'B'];
const gradePoints = grades.map(convert);

document.querySelector('#grades').textContent = `Letter grades: ${grades.join(', ')}`;
document.querySelector('#points').textContent = `Grade points: ${gradePoints.join(', ')}`;
console.log('Grade points:', gradePoints);


const totalPoints = gradePoints.reduce((total, item) => total + item);
const gpa = totalPoints / gradePoints.length;

document.querySelector('#gpa').textContent = `GPA: ${gpa.toFixed(2)}`;
console.log('GPA:', gpa.toFixed(2));


const shortWords = words.filter(word => word.length < 6);

document.querySelector('#short-words').innerHTML = shortWords
    .map(word => `<li>${word}</li>`)
    .join('');
console.log('Short words:', shortWords);


const appleIndex = words.indexOf('apple');

document.querySelector('#apple-index').textContent = `'apple' is at index ${appleIndex} in the words array.`;
console.log('Index of apple:', appleIndex);
console.log('Index of banana (not in the array):', words.indexOf('banana'));
