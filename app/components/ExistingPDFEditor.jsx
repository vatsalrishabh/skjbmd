'use client';
import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const ExistingPDFEditor = () => {
  const [sampleData, setSampleData] = useState({
    employeeName: 'Rajesh Kumar Sharma',
    position: 'Senior Software Developer',
    department: 'Information Technology',
    startDate: '15th March 2024',
    salary: '₹85,000',
    employeeId: 'SKJBMD-2024-001',
    reportingManager: 'Priya Singh',
    workLocation: 'Mumbai Office',
    contactEmail: 'rajesh.kumar@skjbmd.org',
    contactPhone: '+91 9876543210',
    joiningDate: '1st April 2024'
  });

  const [textPositions, setTextPositions] = useState({
    employeeName: { x: 150, y: 650, size: 14 },
    position: { x: 150, y: 620, size: 12 },
    department: { x: 150, y: 590, size: 12 },
    startDate: { x: 150, y: 560, size: 12 },
    salary: { x: 150, y: 530, size: 12 },
    employeeId: { x: 150, y: 500, size: 12 },
    reportingManager: { x: 150, y: 470, size: 12 },
    workLocation: { x: 150, y: 440, size: 12 },
    contactEmail: { x: 150, y: 410, size: 12 },
    contactPhone: { x: 150, y: 380, size: 12 },
    joiningDate: { x: 150, y: 350, size: 12 }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedField, setSelectedField] = useState('employeeName');

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setSampleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePositionChange = (field, property, value) => {
    setTextPositions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [property]: parseInt(value) || 0
      }
    }));
  };

  const generatePDFWithTemplate = async () => {
    setIsGenerating(true);
    try {
      // Load the existing PDF template
      const response = await fetch('/Your paragraph text.pdf');
      if (!response.ok) {
        throw new Error('Could not load PDF template. Make sure "Your paragraph text.pdf" exists in the public folder.');
      }
      
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Get the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      // Embed fonts
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Add sample data to the PDF at specified positions
      Object.entries(sampleData).forEach(([key, value]) => {
        const position = textPositions[key];
        if (position && value) {
          firstPage.drawText(value, {
            x: position.x,
            y: height - position.y, // PDF coordinates are from bottom-left
            size: position.size,
            font: key === 'employeeName' ? boldFont : font,
            color: rgb(0, 0, 0),
          });
        }
      });
      
      // Add a watermark to show this is a sample
      firstPage.drawText('SAMPLE DATA OVERLAY', {
        x: width - 200,
        y: 30,
        size: 10,
        font: font,
        color: rgb(0.7, 0.7, 0.7),
      });
      
      // Generate the modified PDF
      const pdfBytes = await pdfDoc.save();
      
      // Download the PDF
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, `Template_With_Sample_Data_${new Date().getTime()}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetPositions = () => {
    setTextPositions({
      employeeName: { x: 150, y: 650, size: 14 },
      position: { x: 150, y: 620, size: 12 },
      department: { x: 150, y: 590, size: 12 },
      startDate: { x: 150, y: 560, size: 12 },
      salary: { x: 150, y: 530, size: 12 },
      employeeId: { x: 150, y: 500, size: 12 },
      reportingManager: { x: 150, y: 470, size: 12 },
      workLocation: { x: 150, y: 440, size: 12 },
      contactEmail: { x: 150, y: 410, size: 12 },
      contactPhone: { x: 150, y: 380, size: 12 },
      joiningDate: { x: 150, y: 350, size: 12 }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Existing PDF Template Editor
      </h2>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
        <p className="text-blue-700 text-sm">
          This tool loads your existing PDF template from <code>public/Your paragraph text.pdf</code> and overlays sample data. 
          Adjust the X, Y positions and font sizes to place text in the right locations on your template.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sample Data Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Sample Data</h3>
          
          {Object.entries(sampleData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Position Controls Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Position Controls</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Field to Position:
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(sampleData).map(key => (
                <option key={key} value={key}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
          </div>

          {selectedField && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3 capitalize">
                Position for: {selectedField.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    X Position
                  </label>
                  <input
                    type="number"
                    value={textPositions[selectedField]?.x || 0}
                    onChange={(e) => handlePositionChange(selectedField, 'x', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Y Position
                  </label>
                  <input
                    type="number"
                    value={textPositions[selectedField]?.y || 0}
                    onChange={(e) => handlePositionChange(selectedField, 'y', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="800"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size
                  </label>
                  <input
                    type="number"
                    value={textPositions[selectedField]?.size || 12}
                    onChange={(e) => handlePositionChange(selectedField, 'size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="8"
                    max="24"
                  />
                </div>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>Current Value:</strong> {sampleData[selectedField]}</p>
                <p><strong>Position:</strong> X: {textPositions[selectedField]?.x}, Y: {textPositions[selectedField]?.y}, Size: {textPositions[selectedField]?.size}px</p>
              </div>
            </div>
          )}

          {/* Quick Position Presets */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-3">Quick Position Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePositionChange(selectedField, 'x', 100)}
                className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300"
              >
                Left (X: 100)
              </button>
              <button
                onClick={() => handlePositionChange(selectedField, 'x', 300)}
                className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300"
              >
                Center (X: 300)
              </button>
              <button
                onClick={() => handlePositionChange(selectedField, 'y', 700)}
                className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300"
              >
                Top (Y: 700)
              </button>
              <button
                onClick={() => handlePositionChange(selectedField, 'y', 400)}
                className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300"
              >
                Middle (Y: 400)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={resetPositions}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset Positions
        </button>
        
        <button
          onClick={generatePDFWithTemplate}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          }`}
        >
          {isGenerating ? 'Generating PDF...' : 'Generate PDF with Sample Data'}
        </button>
      </div>

      {/* Position Summary */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Positions Summary:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {Object.entries(textPositions).map(([key, position]) => (
            <div key={key} className="p-2 bg-white rounded border">
              <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-gray-600">X: {position.x}, Y: {position.y}, Size: {position.size}px</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExistingPDFEditor;