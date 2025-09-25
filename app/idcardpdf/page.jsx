'use client';
import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const IdCardPDF = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    fatherName: '',
    age: '',
    contact: '',
    email: '',
    role: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    aadharCard: '',
    pancard: ''
  });

  const addDebugInfo = (info) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  // Parse URL parameters on component mount and auto-generate PDF
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        const newFormData = {
          userId: parsedData.userId || '',
          name: parsedData.name || '',
          fatherName: parsedData.fatherName || '',
          age: parsedData.age?.toString() || '',
          contact: parsedData.contact || '',
          email: parsedData.email || '',
          role: parsedData.role || '',
          gender: parsedData.gender || '',
          street: parsedData.address?.street || '',
          city: parsedData.address?.city || '',
          state: parsedData.address?.state || '',
          zipCode: parsedData.address?.zipCode || '',
          country: parsedData.address?.country || '',
          aadharCard: parsedData.aadharCard || '',
          pancard: parsedData.pancard || '',
          dpUrl: parsedData.dpUrl || ''
        };
        setFormData(newFormData);
        addDebugInfo('URL data parsed and loaded into form');
        
        // Auto-generate PDF after a short delay to ensure state is updated
        setTimeout(() => {
          addDebugInfo('Auto-generating PDF...');
          loadAndModifyPDFWithData(newFormData);
        }, 100);
      } catch (error) {
        console.error('Error parsing URL data:', error);
        addDebugInfo(`Error parsing URL data: ${error.message}`);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const safeText = (text, fallback = 'N/A') => {
    if (text === null || text === undefined || text === '') {
      return fallback;
    }
    return String(text);
  };

  const formatAddress = (addressObj) => {
    if (!addressObj || typeof addressObj !== 'object') {
      return 'N/A';
    }
    
    const { street, city, state, zipCode, country } = addressObj;
    const addressParts = [street, city, state, zipCode, country].filter(part => 
      part && part.trim() && part.trim() !== 'N/A'
    );
    return addressParts.length > 0 ? addressParts.join(', ') : 'N/A';
  };

  const loadAndModifyPDFWithData = async (dataToUse = null) => {
    const currentFormData = dataToUse || formData;
    setIsLoading(true);
    setError(null);
    if (!dataToUse) setDebugInfo([]);
    
    try {
      addDebugInfo('Starting PDF loading process...');
      
      // Load the PDF template
      const response = await fetch('/SKJBMD.pdf');
      if (!response.ok) {
        throw new Error(`Failed to load PDF: ${response.status} ${response.statusText}`);
      }
      
      const existingPdfBytes = await response.arrayBuffer();
      addDebugInfo(`PDF loaded: ${existingPdfBytes.byteLength} bytes`);
      
      // Load PDF document
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      addDebugInfo('PDF document loaded successfully');
      
      // Get the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      addDebugInfo(`PDF has ${pages.length} page(s)`);
      
      // Embed font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      addDebugInfo('Font embedded successfully');
      
      // Load and embed profile picture
      let profileImage = null;
      const dpUrl = currentFormData.dpUrl;
      if (dpUrl) {
        try {
          addDebugInfo(`Loading profile picture from: ${dpUrl}`);
          
          // Construct full URL for the image
          const imageUrl = dpUrl.startsWith('http') ? dpUrl : `http://localhost:3000${dpUrl}`;
          addDebugInfo(`Full image URL: ${imageUrl}`);
          
          const imageResponse = await fetch(imageUrl);
          if (imageResponse.ok) {
            const imageBytes = await imageResponse.arrayBuffer();
            addDebugInfo(`Image loaded: ${imageBytes.byteLength} bytes`);
            
            // Determine image type and embed accordingly
            if (dpUrl.toLowerCase().includes('.png')) {
              profileImage = await pdfDoc.embedPng(imageBytes);
              addDebugInfo('PNG image embedded successfully');
            } else {
              profileImage = await pdfDoc.embedJpg(imageBytes);
              addDebugInfo('JPG image embedded successfully');
            }
          } else {
            addDebugInfo(`Failed to load image: ${imageResponse.status} ${imageResponse.statusText}`);
          }
        } catch (error) {
          addDebugInfo(`Error loading profile picture: ${error.message}`);
        }
      } else {
        addDebugInfo('No profile picture URL provided');
      }
      
      // Add text overlays to the PDF at specific positions
      addDebugInfo('Adding text overlays to PDF...');
      
      // User ID
      const userId = safeText(currentFormData.userId, '');
      if (userId && userId !== 'N/A') {
        addDebugInfo(`Drawing User ID: "${userId}"`);
        firstPage.drawText(` ${userId}`, {
         x: 126,
          y: 129,
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
      // Name
      const name = safeText(currentFormData.name, '');
      if (name && name !== 'N/A') {
        addDebugInfo(`Drawing Name: "${name}"`);
        firstPage.drawText(`${name}`, {
          x: 126,
          y: 120,
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
    
      
      // Age
      const age = safeText(currentFormData.age, '');
      if (age && age !== 'N/A') {
        addDebugInfo(`Drawing Age: "${age}"`);
        firstPage.drawText(`Age: ${age}`, {
          x: 100,
          y: 400,
          size: 44,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
      // Contact
      const contact = safeText(currentFormData.contact, '');
      if (contact && contact !== 'N/A') {
        addDebugInfo(`Drawing Contact: "${contact}"`);
        firstPage.drawText(`Contact: ${contact}`, {
          x: 100,
          y: 300,
          size: 44,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
  
    
      
      // Role
      const role = safeText(currentFormData.role, '');
      if (role && role !== 'N/A') {
        addDebugInfo(`Drawing Role: "${role}"`);
        firstPage.drawText(` ${role}`, {
          x: 126,
          y: 110,
          size: 8,
          font: font,
          color: rgb(0.6, 0.1, 0.1), // dark red/maroon color
        });
      }
      
      // Gender
      const gender = safeText(currentFormData.gender, '');
      if (gender && gender !== 'N/A') {
        addDebugInfo(`Drawing Gender: "${gender}"`);
        firstPage.drawText(` ${gender}`, {
           x: 126,
          y: 100,
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
      }

      // Mobile Number (using contact field)
      const mobile = safeText(currentFormData.contact, '');
      if (mobile && mobile !== 'N/A') {
        addDebugInfo(`Drawing Mobile: "${mobile}"`);
        firstPage.drawText(` ${mobile}`, {
           x: 126,
          y: 90,
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
      }

      // District
      const district = safeText(currentFormData.city, '');
      addDebugInfo(`District data: "${district}" from currentFormData.city: "${currentFormData.city}"`);
      if (district && district !== 'N/A') {
        addDebugInfo(`Drawing District: "${district}"`);
        firstPage.drawText(`District: ${district}`, {
          x: 50,
          y: 650,
          size: 12,
          font: font,
          color: rgb(0.6, 0.1, 0.1),
        });
      }

      // State
      const state = safeText(currentFormData.state, '');
      addDebugInfo(`State data: "${state}" from currentFormData.state: "${currentFormData.state}"`);
      if (state && state !== 'N/A') {
        addDebugInfo(`Drawing State: "${state}"`);
        firstPage.drawText(`State: ${state}`, {
          x: 50,
          y: 630,
          size: 12,
          font: font,
          color: rgb(0.6, 0.1, 0.1),
        });
      }

      // Full Address
      const fullAddress = `${currentFormData.street || ''}, ${currentFormData.city || ''}, ${currentFormData.state || ''} ${currentFormData.zipCode || ''}`.replace(/^,\s*|,\s*$|,\s*,/g, '').trim();
      addDebugInfo(`Full Address data: "${fullAddress}"`);
      if (fullAddress && fullAddress !== 'N/A' && fullAddress !== '') {
        addDebugInfo(`Drawing Full Address: "${fullAddress}"`);
        firstPage.drawText(`Address: ${fullAddress}`, {
          x: 50,
          y: 610,
          size: 10,
          font: font,
          color: rgb(0.6, 0.1, 0.1),
        });
      }
      
      // Aadhar Card
      const aadharCard = safeText(currentFormData.aadharCard, '');
      if (aadharCard && aadharCard !== 'N/A') {
        addDebugInfo(`Drawing Aadhar Card: "${aadharCard}"`);
        firstPage.drawText(`Aadhar: ${aadharCard}`, {
          x: 400,
          y: 450,
          size: 44,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
      // PAN Card
      const pancard = safeText(currentFormData.pancard, '');
      if (pancard && pancard !== 'N/A') {
        addDebugInfo(`Drawing PAN Card: "${pancard}"`);
        firstPage.drawText(`PAN: ${pancard}`, {
          x: 400,
          y: 400,
          size: 44,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      
      // Draw profile picture if available
      if (profileImage) {
        try {
          addDebugInfo('Drawing profile picture on PDF...');
          
          // Calculate image dimensions (maintaining aspect ratio)
          const imageWidth = 140;  // Desired width (increased)
          const imageHeight = 170; // Desired height (increased)
          
          // Position the image on the right side of the ID card
          const imageX = 400; // X position (right side, moved left)
          const imageY = 600; // Y position (middle area, adjusted for PDF coordinates)
          
          firstPage.drawImage(profileImage, {
            x: imageX,
            y: imageY,
            width: imageWidth,
            height: imageHeight,
          });
          
          addDebugInfo(`Profile picture drawn at position (${imageX}, ${imageY}) with size ${imageWidth}x${imageHeight}`);
        } catch (error) {
          addDebugInfo(`Error drawing profile picture: ${error.message}`);
        }
      } else {
        addDebugInfo('No profile image to draw');
      }
      
      // Generate PDF blob URL for preview
      addDebugInfo('Saving PDF document...');
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      addDebugInfo('PDF generated successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Error generating PDF: ${error.message}`);
      addDebugInfo(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAndModifyPDF = async () => {
    return loadAndModifyPDFWithData();
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `ID_Card_${formData.name || 'Unknown'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      name: '',
      fatherName: '',
      age: '',
      contact: '',
      email: '',
      role: '',
      gender: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      aadharCard: '',
      pancard: ''
    });
    setPdfUrl(null);
    setDebugInfo([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🆔 ID Card PDF Editor
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editable Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-blue-300 pb-3">
              📝 Edit ID Card Data
            </h2>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    👤 Name:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    🎂 Age:
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter age"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📞 Contact:
                  </label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter contact number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📧 Email:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    💼 Role:
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter role"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    ⚧️ Gender:
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 shadow-sm hover:shadow-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  🏠 Street Address:
                </label>
                <textarea
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md resize-none"
                  placeholder="Enter street address"
                  rows="2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🏘️ City:
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🗺️ State:
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter state"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📮 ZIP Code:
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter ZIP code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🌍 Country:
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter country"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📄 Aadhar Card:
                  </label>
                  <input
                    type="text"
                    value={formData.aadharCard}
                    onChange={(e) => handleInputChange('aadharCard', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter Aadhar number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🆔 PAN Card:
                  </label>
                  <input
                    type="text"
                    value={formData.pancard}
                    onChange={(e) => handleInputChange('pancard', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Enter PAN number"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={loadAndModifyPDF}
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
                  '🚀 Generate ID Card PDF'
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
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔄 Reset Form
              </button>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-gray-300 pb-3">
              📄 ID Card Preview
            </h2>
            
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-96 border-2 border-gray-300 rounded-xl shadow-inner bg-white"
                title="ID Card Preview"
              />
            ) : (
              <div className="w-full h-96 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">🆔</div>
                  <span className="text-gray-600 font-medium">ID Card preview will appear here</span>
                  <p className="text-gray-500 text-sm mt-2">Generate a PDF to see the preview</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Note:</strong> The form data is automatically mapped to the ID card template. You can see how your data appears in the PDF above.
              </p>
            </div>
          </div>
        </div>
        
        {/* Debug Information */}
        {debugInfo.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">🔧 Debug Information:</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-xs max-h-40 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="mb-1 text-gray-700">{info}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardPDF;