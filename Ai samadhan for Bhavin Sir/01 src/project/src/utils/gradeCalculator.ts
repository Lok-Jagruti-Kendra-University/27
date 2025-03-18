import { Grade } from '../types';

export const GRADES: Grade[] = [
  { grade: 'O+++', gradePoints: 10, minMarks: 95, maxMarks: 100 },
  { grade: 'O++', gradePoints: 9.5, minMarks: 90, maxMarks: 94 },
  { grade: 'O+', gradePoints: 9, minMarks: 85, maxMarks: 89 },
  { grade: 'O', gradePoints: 8.5, minMarks: 80, maxMarks: 84 },
  { grade: 'A++', gradePoints: 8, minMarks: 75, maxMarks: 79 },
  { grade: 'A+', gradePoints: 7.5, minMarks: 70, maxMarks: 74 },
  { grade: 'A', gradePoints: 7, minMarks: 65, maxMarks: 69 },
  { grade: 'B++', gradePoints: 6.5, minMarks: 60, maxMarks: 64 },
  { grade: 'B+', gradePoints: 6, minMarks: 55, maxMarks: 59 },
  { grade: 'B', gradePoints: 5.5, minMarks: 50, maxMarks: 54 },
  { grade: 'C', gradePoints: 5, minMarks: 45, maxMarks: 49 },
  { grade: 'D', gradePoints: 4.5, minMarks: 40, maxMarks: 44 },
  { grade: 'E', gradePoints: 4, minMarks: 35, maxMarks: 39 },
  { grade: 'F', gradePoints: 0, minMarks: 0, maxMarks: 34 },
];

export function calculateGrade(marks: number): Grade {
  return GRADES.find(
    (g) => marks >= g.minMarks && marks <= g.maxMarks
  ) || GRADES[GRADES.length - 1];
}

export function calculateSPI(marks: number[], credits: number[]): number {
  const totalCredits = credits.reduce((sum, credit) => sum + credit, 0);
  const gradePoints = marks.map((mark) => calculateGrade(mark).gradePoints);
  const weightedSum = gradePoints.reduce(
    (sum, gp, i) => sum + gp * credits[i],
    0
  );
  return weightedSum / totalCredits;
}