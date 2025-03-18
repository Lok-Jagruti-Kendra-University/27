import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download, TestTube } from 'lucide-react';
import { Student, ProcessedResult } from './types';
import { readExcelFile, generateExcelReport, generateTestCasesReport } from './utils/excelHandler';
import { distributeMarks } from './utils/markDistributor';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<ProcessedResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    try {
      const data = await readExcelFile(file);
      setStudents(data);
      const processedResults = data.map(distributeMarks);
      setResults(processedResults);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!results.length) return;
    
    const reportData = generateExcelReport(students);
    const blob = new Blob([reportData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mark_distribution_results.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTestCasesDownload = () => {
    const testCasesData = generateTestCasesReport();
    const blob = new Blob([testCasesData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_cases.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            AI-Powered Smart Mark Distribution
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-5">
              <div className="flex justify-center space-x-4">
                <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Excel File
                  <input
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </label>
                <button
                  onClick={handleTestCasesDownload}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
                >
                  <TestTube className="w-5 h-5 mr-2" />
                  Download Test Cases
                </button>
              </div>

              {processing && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Processing...</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Results Summary</h2>
                    <button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <FileSpreadsheet className="w-6 h-6 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Processed {students.length} student records
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;