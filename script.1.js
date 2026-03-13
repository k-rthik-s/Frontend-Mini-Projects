document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const addCourseBtn = document.getElementById('add-course');
    const form = document.getElementById('cgpa-form');
    const resultDiv = document.getElementById('result');
    function addCourseRow() {
        const row = document.createElement('div');
        row.className = 'course-row';
        const gradeInput = document.createElement('input');
        gradeInput.type = 'number';
        gradeInput.placeholder = 'Grade (0-100)';
        gradeInput.min = 0;
        gradeInput.max = 100;
        gradeInput.required = true;
        const creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.placeholder = 'Credit Hours';
        creditInput.min = 0;
        creditInput.required = true;
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = '✖';
        removeBtn.addEventListener('click', () => {
            courseList.removeChild(row);
        });
        row.appendChild(gradeInput);
        row.appendChild(creditInput);
        row.appendChild(removeBtn);
        courseList.appendChild(row);
    }
    addCourseBtn.addEventListener('click', addCourseRow);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rows = document.querySelectorAll('#course-list .course-row');
        let totalPoints = 0;
        let totalCredits = 0;
        rows.forEach(row => {
            const grade = parseFloat(row.children[0].value);
            const credits = parseFloat(row.children[1].value);
            if (!isNaN(grade) && !isNaN(credits)) {
                totalPoints += (grade / 25) * credits; // convert 0-100 to 0-4 scale
                totalCredits += credits;
            }
        });
        if (totalCredits > 0) {
            const cgpa = totalPoints / totalCredits;
            resultDiv.textContent = `Your CGPA is ${cgpa.toFixed(2)}`;
        } else {
            resultDiv.textContent = 'Please enter valid courses.';
        }
    });
    // add initial row
    addCourseRow();
});
