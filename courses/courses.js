const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
      { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
      { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
    ],
  
    init: function() {
      this.setCourseInfo();
      this.renderSections();
      document.getElementById("enrollStudent").addEventListener("click", () => this.updateStudentCount(1));
      document.getElementById("dropStudent").addEventListener("click", () => this.updateStudentCount(-1));
    },
  
    setCourseInfo: function() {
      const courseName = document.querySelector("#courseName");
      const courseCode = document.querySelector("#courseCode");
      courseName.textContent = this.name;
      courseCode.textContent = this.code;
    },
  
    sectionTemplate: (section) => {
      return `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
      </tr>`;
    },
  
    renderSections: function() {
      const html = this.sections.map(this.sectionTemplate);
      document.querySelector("#sections").innerHTML = html.join("");
    },
  
    updateStudentCount: function(change) {
      const sectionNum = parseInt(document.getElementById("sectionNumber").value);
      const sectionIndex = this.sections.findIndex(
        (section) => section.sectionNum === sectionNum
      );
  
      if (sectionIndex >= 0) {
        const newEnrolled = this.sections[sectionIndex].enrolled + change;
  
        if (newEnrolled >= 0) {
          this.sections[sectionIndex].enrolled = newEnrolled;
          this.renderSections();
        }
      }
    }
  };
  
  aCourse.init();