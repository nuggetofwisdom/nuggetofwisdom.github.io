// Course object: properties (data) + a method (behavior)
const aCourse = {
  code: 'CSE121b',
  name: 'Javascript Language',
  logo: 'images/js-logo.png',
  sections: [
    { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
    { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
  ],
  enrollStudent: function (sectionNum) {
    // find the right section... Array.findIndex works here
    // 'this' refers to aCourse, so this.sections is the array above
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );
    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
    }
  }
};

// Fill in the course name and code headings
function setCourseInfo(course) {
  document.querySelector('#courseName').textContent = course.name;
  document.querySelector('#courseCode').textContent = course.code;
}

// Build one table row for a section
function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td></tr>`;
}

// Render all sections into the table body
function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector('#sections').innerHTML = html.join('');
}

setCourseInfo(aCourse);
renderSections(aCourse.sections);

document.querySelector('#enrollStudent').addEventListener('click', function () {
  const sectionNum = document.querySelector('#sectionNumber').value;
  aCourse.enrollStudent(sectionNum);
});
