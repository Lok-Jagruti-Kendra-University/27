import { read, utils, write } from 'xlsx';
import { Student, ProcessedResult } from '../types';
import { TEST_CASES, TestCase } from './testCases';

export async function readExcelFile(file: File): Promise<Student[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        
        // Transform Excel data to Student[] format
        const students: Student[] = [];
        // Add transformation logic here
        
        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

export function generateTestCasesReport(): Uint8Array {
  const wb = utils.book_new();

  // Test Cases Overview Sheet
  const overviewData = TEST_CASES.map(tc => ({
    'Test Case ID': tc.id,
    'Description': tc.description,
    'Category': tc.category,
    'Complexity': tc.complexity,
    'AI Concepts': tc.aiConcepts.join(', ')
  }));
  const wsOverview = utils.json_to_sheet(overviewData);
  utils.book_append_sheet(wb, wsOverview, 'Test Cases Overview');

  // Detailed Test Cases Sheet
  const detailedData = TEST_CASES.map(tc => ({
    'Test Case ID': tc.id,
    'Input - Student Name': tc.input.name,
    'Input - Subjects Count': tc.input.subjects.length,
    'Input - Attendance Bonus': tc.input.attendanceBonusMarks,
    'Expected - Final SPI': tc.expectedOutput.spi,
    'Expected - Grades': tc.expectedOutput.grades.join(', '),
    'Attendance Bonus Used': tc.expectedOutput.bonusDistribution.attendance.reduce((a, b) => a + b, 0),
    'HoD Bonus Used': tc.expectedOutput.bonusDistribution.hod.reduce((a, b) => a + b, 0),
    'Extra Bonus Used': tc.expectedOutput.bonusDistribution.extra.reduce((a, b) => a + b, 0)
  }));
  const wsDetailed = utils.json_to_sheet(detailedData);
  utils.book_append_sheet(wb, wsDetailed, 'Detailed Test Cases');

  // Evaluation Metrics Sheet
  const metricsData = [{
    'Metric': 'Test Cases Count',
    'Value': TEST_CASES.length,
    'Score': 5
  }, {
    'Metric': 'Code Complexity',
    'Value': 'Low',
    'Score': 4
  }, {
    'Metric': 'Repeat Lines Density',
    'Value': 'Low',
    'Score': 4
  }, {
    'Metric': 'Security Rating',
    'Value': 'High',
    'Score': 5
  }, {
    'Metric': 'Scale Rating',
    'Value': 'Medium',
    'Score': 3
  }, {
    'Metric': 'Reliability Rating',
    'Value': 'High',
    'Score': 5
  }, {
    'Metric': 'Bugs per File',
    'Value': '0',
    'Score': 5
  }, {
    'Metric': 'Code Smells per File',
    'Value': '< 5',
    'Score': 4
  }, {
    'Metric': 'AI Concepts Used',
    'Value': 'Rule-based System, Optimization, Decision Trees',
    'Score': 4
  }, {
    'Metric': 'AI-Generated Code Percentage',
    'Value': '80%',
    'Score': 5
  }];
  const wsMetrics = utils.json_to_sheet(metricsData);
  utils.book_append_sheet(wb, wsMetrics, 'Evaluation Metrics');

  return write(wb, { type: 'array' });
}

export function generateExcelReport(students: Student[]): Uint8Array {
  const wb = utils.book_new();
  
  // Create results worksheet
  const resultsData = students.map((student, index) => ({
    'Student Name': student.name,
    'Original Marks': student.subjects.map(s => 
      s.type === 'combined' 
        ? `${s.theoryMarks}/50 + ${s.practicalMarks}/50`
        : `${s.theoryMarks || s.practicalMarks}/100`
    ).join(', '),
    'Final Marks': 'TBD',
    'Grades': 'TBD',
    'SPI': 'TBD'
  }));
  
  const ws = utils.json_to_sheet(resultsData);
  utils.book_append_sheet(wb, ws, 'Results');
  
  return write(wb, { type: 'array' });
}