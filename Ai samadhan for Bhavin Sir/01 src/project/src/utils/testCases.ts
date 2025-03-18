import { Student, ProcessedResult } from '../types';

export interface TestCase {
  id: string;
  description: string;
  input: Student;
  expectedOutput: ProcessedResult;
  category: string;
  complexity: number; // 1-5 scale
  aiConcepts: string[];
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'TC001',
    description: 'Basic passing scenario - All subjects above threshold',
    input: {
      name: 'John Doe',
      subjects: [
        {
          name: 'Mathematics',
          type: 'theory',
          theoryCredit: 4,
          theoryMarks: 45
        },
        {
          name: 'Physics Lab',
          type: 'practical',
          practicalCredit: 2,
          practicalMarks: 40
        }
      ],
      attendanceBonusMarks: 10
    },
    expectedOutput: {
      originalMarks: [45, 40],
      finalMarks: [50, 45],
      grades: ['B', 'C'],
      spi: 5.83,
      bonusDistribution: {
        attendance: [5, 5],
        hod: [0, 0],
        extra: [0, 0]
      }
    },
    category: 'Basic Validation',
    complexity: 1,
    aiConcepts: ['Rule-based System']
  },
  {
    id: 'TC002',
    description: 'HoD bonus application - Single subject failing by 1 mark',
    input: {
      name: 'Jane Smith',
      subjects: [
        {
          name: 'Chemistry',
          type: 'combined',
          theoryCredit: 3,
          practicalCredit: 1,
          theoryMarks: 34,
          practicalMarks: 35
        }
      ],
      attendanceBonusMarks: 5
    },
    expectedOutput: {
      originalMarks: [34.5],
      finalMarks: [37.5],
      grades: ['E'],
      spi: 4.0,
      bonusDistribution: {
        attendance: [2],
        hod: [1],
        extra: [0]
      }
    },
    category: 'HoD Bonus',
    complexity: 2,
    aiConcepts: ['Decision Making', 'Rule-based System']
  },
  {
    id: 'TC003',
    description: 'SPI Maximization with remaining attendance bonus',
    input: {
      name: 'Alice Johnson',
      subjects: [
        {
          name: 'Programming',
          type: 'theory',
          theoryCredit: 4,
          theoryMarks: 78
        },
        {
          name: 'Database',
          type: 'theory',
          theoryCredit: 4,
          theoryMarks: 82
        }
      ],
      attendanceBonusMarks: 14
    },
    expectedOutput: {
      originalMarks: [78, 82],
      finalMarks: [85, 89],
      grades: ['O+', 'O+'],
      spi: 9.0,
      bonusDistribution: {
        attendance: [7, 7],
        hod: [0, 0],
        extra: [0, 0]
      }
    },
    category: 'Optimization',
    complexity: 4,
    aiConcepts: ['Optimization Algorithm', 'Greedy Algorithm']
  },
  {
    id: 'TC004',
    description: 'Extra bonus marks distribution',
    input: {
      name: 'Bob Wilson',
      subjects: [
        {
          name: 'Physics',
          type: 'combined',
          theoryCredit: 3,
          practicalCredit: 1,
          theoryMarks: 40,
          practicalMarks: 42
        }
      ],
      attendanceBonusMarks: 0
    },
    expectedOutput: {
      originalMarks: [41],
      finalMarks: [43],
      grades: ['D'],
      spi: 4.5,
      bonusDistribution: {
        attendance: [0],
        hod: [0],
        extra: [2]
      }
    },
    category: 'Extra Bonus',
    complexity: 2,
    aiConcepts: ['Rule-based System']
  },
  {
    id: 'TC005',
    description: 'Complex scenario with multiple subjects and all bonus types',
    input: {
      name: 'Charlie Brown',
      subjects: [
        {
          name: 'Mathematics',
          type: 'theory',
          theoryCredit: 4,
          theoryMarks: 33
        },
        {
          name: 'Physics',
          type: 'combined',
          theoryCredit: 3,
          practicalCredit: 1,
          theoryMarks: 38,
          practicalMarks: 40
        }
      ],
      attendanceBonusMarks: 20
    },
    expectedOutput: {
      originalMarks: [33, 39],
      finalMarks: [37, 42],
      grades: ['E', 'D'],
      spi: 4.25,
      bonusDistribution: {
        attendance: [3, 4],
        hod: [1, 0],
        extra: [0, 0]
      }
    },
    category: 'Complex Scenarios',
    complexity: 5,
    aiConcepts: ['Multi-objective Optimization', 'Decision Trees', 'Rule-based System']
  }
];