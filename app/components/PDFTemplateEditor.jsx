'use client';
import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const PDFTemplateEditor = () => {
  const [formData, setFormData] = useState({
    employeeName: 'Rajesh Kumar',
    position: 'Senior Developer',
    department: 'Technology',
    startDate: '2024-03-01',
    salary: '₹75,000',
    reportingManager: 'Priya Sharma',
    employeeId: 'SKJBMD001',
    workLocation: 'Delhi Office',
    contactEmail: 'rajesh.kumar@skjbmd.org',
    contactPhone: '+91 9876543210'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const loadExistingPDF = async () => {
    try {
      const response = await fetch('/Your paragraph text.pdf');
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error('Error loading existing PDF:', error);
      return null;
    }
  };

  const modifyExistingPDF = async () => {
    setIsGenerating(true);
    try {
      let pdfArrayBuffer;
      
      if (pdfFile) {
        // Use uploaded file
        pdfArrayBuffer = await pdfFile.arrayBuffer();
      } else {
        // Use existing template
        pdfArrayBuffer = await loadExistingPDF();
      }

      if (!pdfArrayBuffer) {
        throw new Error('Could not load PDF template');
      }

      // Load the existing PDF
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // Embed fonts
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Add a new page for the appointment letter
      const newPage = pdfDoc.addPage([width, height]);

      // Header
      newPage.drawText('APPOINTMENT LETTER', {
        x: width / 2 - 80,
        y: height - 80,
        size: 20,
        font: boldFont,
        color: rgb(0, 0, 0.8),
      });

      // Company letterhead
      newPage.drawText('SKJBMD ORGANIZATION', {
        x: width / 2 - 90,
        y: height - 110,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      newPage.drawText('www.skjbmd.org', {
        x: width / 2 - 50,
        y: height - 130,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });

      // Date
      const currentDate = new Date().toLocaleDateString('en-IN');
      newPage.drawText(`Date: ${currentDate}`, {
        x: 450,
        y: height - 170,
        size: 12,
        font: font,
      });

      // Employee details
      let yPosition = height - 220;

      newPage.drawText(`Dear ${formData.employeeName},`, {
        x: 50,
        y: yPosition,
        size: 14,
        font: boldFont,
      });

      yPosition -= 40;

      const appointmentText = `We are pleased to offer you the position of ${formData.position} in our ${formData.department} department.`;

      newPage.drawText(appointmentText, {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
        maxWidth: width - 100,
      });

      yPosition -= 60;

      // Terms and conditions
      const terms = [
        `Position: ${formData.position}`,
        `Department: ${formData.department}`,
        `Employee ID: ${formData.employeeId}`,
        `Start Date: ${formData.startDate}`,
        `Monthly Salary: ${formData.salary}`,
        `Reporting Manager: ${formData.reportingManager}`,
        `Work Location: ${formData.workLocation}`,
        `Contact Email: ${formData.contactEmail}`,
        `Contact Phone: ${formData.contactPhone}`
      ];

      terms.forEach((term, index) => {
        newPage.drawText(`${index + 1}. ${term}`, {
          x: 70,
          y: yPosition - (index * 25),
          size: 11,
          font: font,
        });
      });

      yPosition -= terms.length * 25 + 40;

      // Additional terms
      const additionalTerms = [
        'Probation period: 6 months from joining date',
        'Background verification required',
        'Confidentiality agreement mandatory',
        'Offer valid for 15 days'
      ];

      additionalTerms.forEach((term, index) => {
        newPage.drawText(`• ${term}`, {
          x: 70,
          y: yPosition - (index * 20),
          size: 10,
          font: font,
          maxWidth: width - 120,
        });
      });

      yPosition -= additionalTerms.length * 20 + 40;

      // Closing
      newPage.drawText('We look forward to your positive response.', {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
      });

      yPosition -= 30;

      newPage.drawText('Sincerely,', {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
      });

      yPosition -= 60;

      newPage.drawText('HR Department', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
      });

      newPage.drawText('SKJBMD Organization', {
        x: 50,
        y: yPosition - 20,
        size: 12,
        font: font,
      });

      // Generate modified PDF
      const pdfBytes = await pdfDoc.save();

      // Download the PDF
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, `Modified_Appointment_Letter_${formData.employeeName.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
      console.error('Error modifying PDF:', error);
      alert('Error modifying PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        PDF Template Editor
      </h2>

      {/* File Upload Section */}
      <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Upload PDF Template (Optional)</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <p className="text-sm text-gray-600 mt-2">
          Leave empty to use the default template from public/Your paragraph text.pdf
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee Name
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reporting Manager
          </label>
          <input
            type="text"
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Location
          </label>
          <input
            type="text"
            name="workLocation"
            value={formData.workLocation}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={modifyExistingPDF}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          }`}
        >
          {isGenerating ? 'Generating PDF...' : 'Generate Modified PDF'}
        </button>
      </div>
    </div>
  );
};

export default PDFTemplateEditor;