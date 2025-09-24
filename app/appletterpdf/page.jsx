'use client';
import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const AppointmentLetterPDF = () => {
  // Hardcoded sample data using useState
  const [appointmentData] = useState({
    employeeName: 'Rajesh Kumar',
    position: 'Father Name',
    department: 'Information Technology',
    startDate: '2024-03-01',
    salary: '85,000',
    reportingManager: 'Priya Sharma',
    companyName: 'SKJBMD Tech Solutions',
    companyAddress: '123 Tech Park, Bangalore, Karnataka 560001',
    hrName: 'Anita Verma',
    hrTitle: 'HR Manager',
    letterDate: '2024-02-15'
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);

  // Auto-load and generate PDF on component mount
  useEffect(() => {
    loadAndModifyPDF();
  }, []);

  const addDebugInfo = (message) => {
    console.log('PDF Debug:', message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const loadAndModifyPDF = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo([]);
      
      addDebugInfo('Starting PDF loading process...');
      
      // Load the existing PDF template
      addDebugInfo('Fetching PDF template from /Your paragraph text.pdf');
      const response = await fetch('/Your paragraph text.pdf');
      
      addDebugInfo(`Fetch response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load PDF template: ${response.status} ${response.statusText}`);
      }
      
      addDebugInfo('Converting response to array buffer...');
      const existingPdfBytes = await response.arrayBuffer();
      
      addDebugInfo(`PDF bytes loaded: ${existingPdfBytes.byteLength} bytes`);
      
      addDebugInfo('Loading PDF document with pdf-lib...');
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Get the first page
      addDebugInfo('Getting PDF pages...');
      const pages = pdfDoc.getPages();
      addDebugInfo(`PDF has ${pages.length} pages`);
      
      if (pages.length === 0) {
        throw new Error('PDF has no pages');
      }
      
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      addDebugInfo(`First page size: ${width} x ${height}`);
      
      // Get fonts - using TimesRoman which has better Unicode support
      addDebugInfo('Embedding fonts...');
      let font, boldFont;
      try {
        font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
        addDebugInfo('Times Roman fonts embedded successfully');
      } catch (fontError) {
        addDebugInfo(`Times Roman failed, trying Helvetica: ${fontError.message}`);
        font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        addDebugInfo('Helvetica fonts embedded successfully');
      }
      
      // Add sample data to the PDF at specific positions
      // You can adjust these coordinates based on your template layout
      
      // Employee Name
      firstPage.drawText(appointmentData.employeeName, {
        x: 870,
        y: 1440,
        size: 44,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      
      // Position
      firstPage.drawText(appointmentData.position, {
        x: 870,
        y: 1350,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Department
      firstPage.drawText(appointmentData.department, {
        x: 580,
        y: 1260,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Start Date
      firstPage.drawText(appointmentData.startDate, {
        x: 1380,
        y: 1010,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Salary - using Rs. instead of ₹ to avoid encoding issues
      firstPage.drawText(`Rs. ${appointmentData.salary}`, {
        x: 480,
        y: 930,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Reporting Manager
      firstPage.drawText(appointmentData.reportingManager, {
        x: 830,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Letter Date
      firstPage.drawText(appointmentData.letterDate, {
       x: 1200,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // HR Name
      firstPage.drawText(appointmentData.hrName, {
        x: 100,
        y: 200,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // HR Title
      firstPage.drawText(appointmentData.hrTitle, {
        x: 100,
        y: 180,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Company Name
      firstPage.drawText(appointmentData.companyName, {
        x: 100,
        y: 160,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Add sample data to the PDF at specific positions
      addDebugInfo('Adding text overlays to PDF...');
      
      // Generate PDF blob URL for preview
      addDebugInfo('Saving PDF document...');
      const pdfBytes = await pdfDoc.save();
      addDebugInfo(`PDF saved: ${pdfBytes.length} bytes`);
      
      addDebugInfo('Creating blob and URL for preview...');
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      addDebugInfo(`PDF URL created: ${url.substring(0, 50)}...`);
      
      setPdfUrl(url);
      addDebugInfo('PDF processing completed successfully!');
      
    } catch (error) {
      console.error('Error loading/modifying PDF:', error);
      setError(error.message);
      addDebugInfo(`ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (pdfUrl) {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      saveAs(blob, `appointment-letter-${appointmentData.employeeName.replace(' ', '-')}.pdf`);
    }
  };

  const testPDFFile = async () => {
    try {
      addDebugInfo('Testing direct PDF file access...');
      const response = await fetch('/Your paragraph text.pdf');
      addDebugInfo(`Direct fetch status: ${response.status}`);
      addDebugInfo(`Content-Type: ${response.headers.get('content-type')}`);
      addDebugInfo(`Content-Length: ${response.headers.get('content-length')}`);
      
      if (response.ok) {
        const blob = await response.blob();
        addDebugInfo(`Blob size: ${blob.size} bytes, type: ${blob.type}`);
        
        // Try to create a simple URL for the original PDF
        const originalUrl = URL.createObjectURL(blob);
        addDebugInfo(`Original PDF URL created: ${originalUrl.substring(0, 50)}...`);
        
        // Test if we can display the original PDF
        setPdfUrl(originalUrl);
        addDebugInfo('Original PDF set for display');
      }
    } catch (error) {
      addDebugInfo(`Test error: ${error.message}`);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          PDF Template with Dynamic Data
        </h1>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg">Loading PDF template...</span>
            
            {/* Debug Information */}
            {debugInfo.length > 0 && (
              <div className="mt-4 max-w-md">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Debug Info:</h3>
                <div className="bg-gray-100 p-3 rounded text-xs max-h-32 overflow-y-auto">
                  {debugInfo.map((info, index) => (
                    <div key={index} className="mb-1">{info}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Error Loading PDF</h2>
            <p className="text-red-600 mb-4">{error}</p>
            
            <div className="space-x-4">
               <button
                 onClick={loadAndModifyPDF}
                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               >
                 Retry
               </button>
               <button
                 onClick={testPDFFile}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               >
                 Test PDF File
               </button>
             </div>
            
            {/* Debug Information */}
            {debugInfo.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-red-700 mb-2">Debug Information:</h3>
                <div className="bg-red-100 p-3 rounded text-xs max-h-40 overflow-y-auto">
                  {debugInfo.map((info, index) => (
                    <div key={index} className="mb-1">{info}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Data Display */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Current Data Mapping
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Employee Name:</span>
                  <span className="text-blue-600">{appointmentData.employeeName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Position:</span>
                  <span className="text-blue-600">{appointmentData.position}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Department:</span>
                  <span className="text-blue-600">{appointmentData.department}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Start Date:</span>
                  <span className="text-blue-600">{appointmentData.startDate}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Salary:</span>
                  <span className="text-blue-600">Rs. {appointmentData.salary}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Reporting Manager:</span>
                  <span className="text-blue-600">{appointmentData.reportingManager}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Letter Date:</span>
                  <span className="text-blue-600">{appointmentData.letterDate}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">HR Name:</span>
                  <span className="text-blue-600">{appointmentData.hrName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">HR Title:</span>
                  <span className="text-blue-600">{appointmentData.hrTitle}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Company:</span>
                  <span className="text-blue-600">{appointmentData.companyName}</span>
                </div>
              </div>

              <div className="mt-6 text-center space-y-3">
                <button
                  onClick={downloadPDF}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md block w-full"
                >
                  Download PDF
                </button>
                <button
                  onClick={testPDFFile}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md block w-full"
                >
                  Test Original PDF
                </button>
                <button
                  onClick={loadAndModifyPDF}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md block w-full"
                >
                  Reload PDF
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                PDF Preview
              </h2>
              
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-96 border border-gray-300 rounded-md"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-96 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  <span className="text-gray-500">PDF preview not available</span>
                </div>
              )}
              
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Note:</strong> The data is automatically mapped to the template. You can see how the sample data appears in the PDF above.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
 };
 
 export default AppointmentLetterPDF;
