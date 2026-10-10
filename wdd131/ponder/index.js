const PI = 3.14;
let radius = 3;

let area = radius * radius * PI;

console.log(area);

radius = 20;
area = radius * radius * PI;

console.log(area);

// type coersion
const one = 1;
const two = '2';

let result = one * two;
console.log(result);

result = one + Number(two);
console.log(result);

let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(typeof student); // "undefined": student is inaccessible outside the block
                    
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImg = modal.querySelector('img');
const closeBtn = modal.querySelector('.close-viewer');

// open the modal when something in the gallery is clicked
gallery.addEventListener('click', openModal);

function openModal(e) {
    // ignore clicks on the empty space between pictures
    if (e.target.tagName !== 'IMG') return;

    modalImg.src = e.target.src.replace("-sm.jpg", "-full.jpg");
    modalImg.alt = e.target.alt;
    modal.showModal();
}

// X button closes it
closeBtn.addEventListener('click', () => {
    modal.close();
});

// clicking the dark background closes it too
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});