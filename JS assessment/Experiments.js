const students = [
    { name: "Adam", city: "New York", scores: [90, 85, 88] },
    { name: "Bob", city: "Los Angeles", scores: [70, 75, 80] },
    { name: "Charlie", city: "Chicago", scores: [95, 92, 94] },
    { name: "David", city: "Houston", scores: [60, 65, 70] },
    { name: "Eva", city: "Phoenix", scores: [88, 90, 92] }
];

const calculateAverage = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;
const getLetterGrade = (average) => {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
};

const classSummary = () => {
    const honorRoll = [];
    let totalAverage = 0;
    let topStudent = { name: "", average: 0 };
    
    const studentListEl = document.getElementById('student-list');

    students.forEach(student => {
        const average = calculateAverage(student.scores);
        const letterGrade = getLetterGrade(average);
        totalAverage += average;

        // Log to console for original behavior
        console.log(`${student.name} from ${student.city} has an average of ${average.toFixed(1)} and a grade of ${letterGrade}.`);

        // DOM injection
        if (studentListEl) {
            const row = document.createElement('div');
            row.className = 'student-row';
            row.innerHTML = `
                <div class="student-info">
                    <h4>${student.name}</h4>
                    <p>${student.city}</p>
                </div>
                <div class="student-grade">
                    <span class="score">${average.toFixed(1)}</span>
                    <span class="letter">${letterGrade}</span>
                </div>
            `;
            studentListEl.appendChild(row);
        }

        if (average >= 85) {
            honorRoll.push(student.name);
        }

        if (average > topStudent.average) {
            topStudent = { name: student.name, average: average };
        }
    });

    const overallAverage = totalAverage / students.length;

    console.log(`Number of students on the honor roll: ${honorRoll.length}`);
    console.log(`Overall class average: ${overallAverage.toFixed(1)}`);
    console.log(`Top student: ${topStudent.name} with an average of ${topStudent.average.toFixed(1)}`);

    // Update DOM summary cards
    const topNameEl = document.getElementById('top-student-name');
    const topScoreEl = document.getElementById('top-student-score');
    const classAvgEl = document.getElementById('overall-average');
    const honorCountEl = document.getElementById('honor-roll-count');

    if (topNameEl) topNameEl.textContent = topStudent.name;
    if (topScoreEl) topScoreEl.textContent = `Average: ${topStudent.average.toFixed(1)}`;
    if (classAvgEl) classAvgEl.textContent = overallAverage.toFixed(1);
    if (honorCountEl) honorCountEl.textContent = honorRoll.length;
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', classSummary);