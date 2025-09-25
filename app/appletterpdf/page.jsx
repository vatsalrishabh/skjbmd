'use client';
import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const AppointmentLetterPDF = () => {
  const [urlData, setUrlData] = useState(null); // 1. declare urlData state
  const [appointmentData, setAppointmentData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]); // For logging debug info
  const [formData, setFormData] = useState({
    employeeName: '',
    fatherName: '',
    position: '',
    userId: '',
    aadharCard: '',
    address: '',
    positionDistrict: '',
    positionState: ''
  });

  const addDebugInfo = (message) => {
    console.log('PDF Debug:', message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate PDF with current form data
  const generatePDFWithFormData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo([]);
      
      addDebugInfo('Generating PDF with form data...');
      
      // Create appointment data from form data
      const currentAppointmentData = {
        ...appointmentData,
        employeeName: formData.employeeName,
        fatherName: formData.fatherName,
        position: formData.position,
        userId: formData.userId,
        aadharCard: formData.aadharCard,
        address: formData.address,
        positionDistrict: formData.positionDistrict,
        positionState: formData.positionState,

      };
      
      addDebugInfo(`Using form data: ${JSON.stringify(currentAppointmentData, null, 2)}`);
      
      // Load the existing PDF template
      const response = await fetch('/Your paragraph text.pdf');
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
      
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Helper function to ensure text is always a string
      const safeText = (text, fallback = 'N/A') => {
        if (text === null || text === undefined || text === '') {
          return fallback;
        }
        return String(text).trim();
      };

      // Helper function to format address objects
      const formatAddress = (addressObj, fallback = 'N/A') => {
        if (!addressObj || typeof addressObj !== 'object') {
          return safeText(addressObj, fallback);
        }
        
        // Extract address components
        const parts = [];
        if (addressObj.street) parts.push(addressObj.street);
        if (addressObj.city) parts.push(addressObj.city);
        if (addressObj.state) parts.push(addressObj.state);
        if (addressObj.zipCode) parts.push(addressObj.zipCode);
        if (addressObj.country) parts.push(addressObj.country);
        
        return parts.length > 0 ? parts.join(', ') : fallback;
      };
      
      addDebugInfo('Adding text overlays with form data...');
      
      // Employee Name
      const employeeName = safeText(currentAppointmentData.employeeName, 'Unknown Name');
      addDebugInfo(`Drawing employee name: "${employeeName}"`);
      firstPage.drawText(employeeName, {
        x: 870,
        y: 1440,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Father Name
      const fatherName = safeText(currentAppointmentData.fatherName, 'Unknown Father');
      const fatherText = `${fatherName}`;
      addDebugInfo(`Drawing father name: "${fatherText}"`);
      firstPage.drawText(fatherText, {
        x: 870,
        y: 1370,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Position
      const position = safeText(currentAppointmentData.position, 'Unknown Position');
      addDebugInfo(`Drawing position: "${position}"`);
      firstPage.drawText(position, {
        x: 870,
        y: 1130,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // User ID
      const userId = safeText(currentAppointmentData.userId, 'N/A');
      const userIdText = `USER ID: ${userId}`;
      addDebugInfo(`Drawing user ID: "${userIdText}"`);
      firstPage.drawText(userIdText, {
        x: 30,
        y: 2580,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Today's Date
      const currentDate = new Date();
      const todaysDate = currentDate.toLocaleDateString('en-GB');
      addDebugInfo(`Drawing today's date: "${todaysDate}"`);
      firstPage.drawText(todaysDate, {
        x: 830,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Letter Date (one year from today.  
      const nextYearDate = new Date();
      nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
      const letterDate = nextYearDate.toLocaleDateString('en-GB');
      addDebugInfo(`Drawing letter date: "${letterDate}"`);
      firstPage.drawText(letterDate, {
        x: 1200,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Aadhar Card
      const aadhar = safeText(currentAppointmentData.aadharCard, 'N/A');
      const aadharText = `AADHAR: ${aadhar}`;
      addDebugInfo(`Drawing aadhar: "${aadharText}"`);
      firstPage.drawText(aadharText, {
        x: 750,
        y: 2580,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Address (if available)
      const address = formatAddress(currentAppointmentData.address);
      if (address && address !== 'N/A') {
        addDebugInfo(`Drawing address: "${address}"`);
        // Split long address into multiple lines if needed
        const addressLines = address.length > 60 ? 
          [address.substring(0, 60), address.substring(60)] :
          [address];
        
        addressLines.forEach((line, index) => {
          if (line && line.trim()) {
            firstPage.drawText(line.trim(), {
              x: 580,
              y: 1260 - (index * 50), // Adjust y-coordinate for each line
              size: 44,
              font: font,
              color: rgb(0, 0, 0),
            });
          }
        });
      }
      
      // Position District and State (on same line, separated by comma)
      const positionDistrict = safeText(currentAppointmentData.positionDistrict, '');
      const positionState = safeText(currentAppointmentData.positionState, '');
      if (positionDistrict || positionState) {
        const locationText = [positionDistrict, positionState].filter(Boolean).join(', ');
        if (locationText) {
          addDebugInfo(`Drawing position location: "${locationText}"`);
          firstPage.drawText(locationText, {
            x: 460,
            y: 935, // Below address
            size: 44,
            font: font,
            color: rgb(0, 0, 0),
          });
        }
      }
      
      // Generate PDF blob URL for preview
      addDebugInfo('Saving PDF document...');
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      addDebugInfo('PDF generated successfully with form data!');
      
    } catch (error) {
      console.error('Error generating PDF with form data:', error);
      setError(`Error generating PDF: ${error.message}`);
      addDebugInfo(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to safely render any data, converting objects to strings
  const safeRender = (value) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    if (typeof value === 'object') {
      // If it's an object, convert it to a readable string
      if (value.street || value.city || value.state) {
        // Handle address objects specifically
        const parts = [];
        if (value.street) parts.push(value.street);
        if (value.city) parts.push(value.city);
        if (value.state) parts.push(value.state);
        if (value.zipCode) parts.push(value.zipCode);
        if (value.country) parts.push(value.country);
        return parts.join(', ') || 'N/A';
      }
      // For other objects, convert to JSON string
      return JSON.stringify(value);
    }
    return String(value);
  };

  // Extract data from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // 2. extract urlParams
    const dataParam = urlParams.get('data'); // 3. extract dataParam
    
    if (dataParam) { // if dataParam exists
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam)); // 4. parse dataParam- means convert stri
        setUrlData(decodedData);
        addDebugInfo(`URL data extracted from JSON: ${JSON.stringify(decodedData, null, 2)}`);
      } catch (error) {
        console.error('Error parsing URL data:', error);
        addDebugInfo(`Error parsing URL data: ${error.message}`);
      }
    } else {
      // Extract individual parameters
      const extractedData = {
        name: urlParams.get('name'),
        fatherName: urlParams.get('fatherName'),
        age: urlParams.get('age'),
        contact: urlParams.get('contact'),
        email: urlParams.get('email'),
        role: urlParams.get('role'),
        address: urlParams.get('address'),
        aadharCard: urlParams.get('aadharCard'),
        id: urlParams.get('id')
      };
      
      // Check if any individual parameters exist
      const hasIndividualParams = Object.values(extractedData).some(value => value !== null);
      
      if (hasIndividualParams) {
        setUrlData(extractedData);
        addDebugInfo(`URL data extracted from individual parameters: ${JSON.stringify(extractedData, null, 2)}`);
      } else {
        addDebugInfo('No URL data found, using default data');
      }
    }
  }, []);

  // Map URL data to appointment data format
  const getAppointmentData = () => {
    if (!urlData) {
      // Fallback data if no URL data
      return {
        employeeName: 'Rajesh Kumar',
        position: 'Member',
        department: 'Information Technology',
        startDate: '2024-03-01',
        salary: '85,000',
        reportingManager: 'Priya Sharma',
        companyName: 'SKJBMD Tech Solutions',
        companyAddress: '123 Tech Park, Bangalore, Karnataka 560001',
        hrName: 'Anita Verma',
        hrTitle: 'HR Manager',
        letterDate: '2024-02-15',
        // Additional fields required by UI
        fatherName: 'Unknown Father',
        age: 'N/A',
        contact: 'N/A',
        email: 'N/A',
        userId: 'N/A',
        aadharCard: 'N/A',
        address: 'N/A'
      };
    }

    // Map URL data to appointment letter fields
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Role mapping for position
    const roleMapping = {
      'rashtriyapramukh': 'Rashtriya Pramukh',
      'pradeshpramukh': 'Pradesh Pramukh',
      'zillapramukh': 'Zilla Pramukh',
      'member': 'Member',
      'volunteer': 'Volunteer'
    };

    return {
      employeeName: urlData.name || 'N/A',
      position: roleMapping[urlData.role] || urlData.role || 'Member',
      department: 'Shri Krishna Janmabhoomi Mukti Dal',
      startDate: currentDate,
      salary: 'Voluntary Service',
      reportingManager: 'Organization Head',
      companyName: 'SKJBMD Tech Solutions',
      companyAddress: '123 Tech Park, Bangalore, Karnataka 560001',
      hrName: 'Administrative Department',
      hrTitle: 'SKJMD Administration',
      letterDate: currentDate,
      // Additional fields from URL data
      fatherName: urlData.fatherName || 'N/A',
      age: urlData.age || 'N/A',
      contact: urlData.contact || 'N/A',
      email: urlData.email || 'N/A',
      address: urlData.address || 'N/A',  // Fixed: address is a simple string, not an object
      aadharCard: urlData.aadharCard || 'N/A',
      userId: urlData.userId || urlData.id || 'N/A'  // Added fallback to 'id' field
    };
  };

  // Auto-load and generate PDF on component mount and when urlData changes
  useEffect(() => {
    loadAndModifyPDF();
  }, [urlData]); // Added urlData as dependency

  const loadAndModifyPDF = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo([]);
      
      addDebugInfo('Starting PDF loading process...');
      
      // Get the latest appointment data
      const currentAppointmentData = getAppointmentData();
      setAppointmentData(currentAppointmentData);
      
      // Update form data with current appointment data
      setFormData({
        employeeName: currentAppointmentData.employeeName || '',
        fatherName: currentAppointmentData.fatherName || '',
        position: currentAppointmentData.position || '',
        userId: currentAppointmentData.userId || '',
        aadharCard: currentAppointmentData.aadharCard || '',
        address: typeof currentAppointmentData.address === 'object' 
          ? `${currentAppointmentData.address.street || ''}, ${currentAppointmentData.address.city || ''}, ${currentAppointmentData.address.state || ''}, ${currentAppointmentData.address.zipCode || ''}, ${currentAppointmentData.address.country || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',')
          : currentAppointmentData.address || '',
        positionDistrict: currentAppointmentData.positionDistrict || '',
        positionState: currentAppointmentData.positionState || ''
      });
      
      addDebugInfo(`Using appointment data: ${JSON.stringify(currentAppointmentData, null, 2)}`);
      
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
      
      // Add URL data to the PDF at specific positions
      // Coordinates are mapped to match the existing template layout
      
      // Helper function to ensure text is always a string
      const safeText = (text, fallback = 'N/A') => {
        if (text === null || text === undefined || text === '') {
          return fallback;
        }
        return String(text).trim();
      };

      // Helper function to format address objects
      const formatAddress = (addressObj, fallback = 'N/A') => {
        if (!addressObj || typeof addressObj !== 'object') {
          return safeText(addressObj, fallback);
        }
        
        // Extract address components
        const parts = [];
        if (addressObj.street) parts.push(addressObj.street);
        if (addressObj.city) parts.push(addressObj.city);
        if (addressObj.state) parts.push(addressObj.state);
        if (addressObj.zipCode) parts.push(addressObj.zipCode);
        if (addressObj.country) parts.push(addressObj.country);
        
        return parts.length > 0 ? parts.join(', ') : fallback;
      };
      
      addDebugInfo('Adding text overlays with null checks...');
      
      // Employee Name (Main name field)
      const employeeName = safeText(currentAppointmentData.employeeName, 'Unknown Name');
      addDebugInfo(`Drawing employee name: "${employeeName}"`);
      firstPage.drawText(employeeName, {
        x: 870,
        y: 1440,
        size: 44,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      
      // Father Name (Position field repurposed)
      const fatherName = safeText(currentAppointmentData.fatherName, 'Unknown Father');
      const fatherText = ` ${fatherName}`;
      addDebugInfo(`Drawing father name: "${fatherText}"`);
      firstPage.drawText(fatherText, {
        x: 870,
        y: 1350,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Role/Position (Department field repurposed)
      const position = safeText(currentAppointmentData.position, 'Member');
      addDebugInfo(`Drawing position: "${position}"`);
      firstPage.drawText(position, {
         x: 1380,
        y: 1010,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      

      
      // User ID (Salary field repurposed)
      const userId = safeText(currentAppointmentData.userId, 'N/A');
      const userIdText = `USER ID: ${userId}`;
      addDebugInfo(`Drawing user ID: "${userIdText}"`);
      firstPage.drawText(userIdText, {
        x: 30,
       y: 2580,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Today's Date (replacing email field) - formatted as DD/MM/YYYY
      const currentDate = new Date();
      const todaysDate = currentDate.toLocaleDateString('en-GB');
      addDebugInfo(`Drawing today's date: "${todaysDate}"`);
      firstPage.drawText(todaysDate, {
        x: 830,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Letter Date (+1 year from current date) - formatted as DD/MM/YYYY
      const nextYearDate = new Date();
      nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
      const letterDate = nextYearDate.toLocaleDateString('en-GB');
      addDebugInfo(`Drawing letter date: "${letterDate}"`);
      firstPage.drawText(letterDate, {
       x: 1200,
        y: 640,
        size: 44,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      // Additional fields at new coordinates
      // Aadhar Card Number
      const aadharCard = safeText(currentAppointmentData.aadharCard);
      if (aadharCard && aadharCard !== 'N/A') {
        const aadharText = `Aadhar: ${aadharCard}`;
        addDebugInfo(`Drawing aadhar: "${aadharText}"`);
        firstPage.drawText(aadharText, {
          x: 750,
          y: 2580,
          size: 44,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
      // Address (if available)
      const address = formatAddress(currentAppointmentData.address);
      if (address && address !== 'N/A') {
        addDebugInfo(`Drawing address: "${address}"`);
        // Split long address into multiple lines if needed
        const addressLines = address.length > 60 ? 
          [address.substring(0, 60), address.substring(60)] :
          [address];
        
        addressLines.forEach((line, index) => {
          if (line && line.trim()) {
            firstPage.drawText(line.trim(), {
              x: 580,
              y: 1260 - (index * 50), // Adjust y-coordinate for each line
              size: 44,
              font: font,
              color: rgb(0, 0, 0),
            });
          }
        });
      }
      
      // Position District and State (on same line, separated by comma)
      const positionDistrict = safeText(currentAppointmentData.positionDistrict, '');
      const positionState = safeText(currentAppointmentData.positionState, '');
      if (positionDistrict || positionState) {
        const locationText = [positionDistrict, positionState].filter(Boolean).join(', ');
        if (locationText) {
          addDebugInfo(`Drawing position location: "${locationText}"`);
          firstPage.drawText(locationText, {
            x: 580,
            y: 1150, // Below address
            size: 44,
            font: font,
            color: rgb(0, 0, 0),
          });
        }
      }
      
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
      saveAs(blob, `appointment-letter-${currentAppointmentData.employeeName.replace(' ', '-')}.pdf`);
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
            {/* Editable Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 border border-blue-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-blue-300 pb-3">
                📝 Edit Data for PDF
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    👤 Employee Name:
                  </label>
                  <input
                    type="text"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter employee name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    👨‍👦 Father Name:
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter father name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    💼 Position/Role:
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter position"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🆔 User ID:
                  </label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => handleInputChange('userId', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter user ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📄 Aadhar Card:
                  </label>
                  <input
                    type="text"
                    value={formData.aadharCard}
                    onChange={(e) => handleInputChange('aadharCard', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter Aadhar card number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🏠 Address:
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md resize-none"
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      🏘️ Position District:
                    </label>
                    <input
                      type="text"
                      value={formData.positionDistrict}
                      onChange={(e) => handleInputChange('positionDistrict', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                      placeholder="Enter position district"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      🗺️ Position State:
                    </label>
                    <input
                      type="text"
                      value={formData.positionState}
                      onChange={(e) => handleInputChange('positionState', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                      placeholder="Enter position state"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={generatePDFWithFormData}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '🚀 Generate PDF with Form Data'
                  )}
                </button>
                <button
                  onClick={downloadPDF}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!pdfUrl}
                >
                  📥 Download PDF
                </button>
                <button
                  onClick={loadAndModifyPDF}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔄 Reset to Original Data
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-gray-300 pb-3">
                📄 PDF Preview
              </h2>
              
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-96 border-2 border-gray-300 rounded-xl shadow-inner bg-white"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-96 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <span className="text-gray-600 font-medium">PDF preview will appear here</span>
                    <p className="text-gray-500 text-sm mt-2">Generate a PDF to see the preview</p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Note:</strong> The data is automatically mapped to the template. You can see how your form data appears in the PDF above.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
 };
 
 export default AppointmentLetterPDF;
