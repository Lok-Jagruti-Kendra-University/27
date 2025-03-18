export interface Subject {
  name: string;
  type: 'theory' | 'practical' | 'combined';
  theoryCredit?: number;
  practicalCredit?: number;
  theoryMarks?: number;
  practicalMarks?: number;
}

export interface Student {
  name: string;
  subjects: Subject[];
  attendanceBonusMarks: number;
}

export interface Grade {
  grade: string;
  gradePoints: number;
  minMarks: number;
  maxMarks: number;
}

export interface ProcessedResult {
  originalMarks: number[];
  finalMarks: number[];
  grades: string[];
  spi: number;
  bonusDistribution: {
    attendance: number[];
    hod: number[];
    extra: number[];
  };
}