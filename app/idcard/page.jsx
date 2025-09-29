'use client';

import React, { Suspense } from 'react';

// Wrapper component to use Suspense for useSearchParams hook usage
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export const dynamic = 'force-dynamic';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const [photoEditOptions, setPhotoEditOptions] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
    scale: 1
  });
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (!data) {
      router.push('/home');
    } else {
      try {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        setEditableData(parsedData);
      } catch (err) {
        console.error('Error parsing data:', err);
        router.push('/home');
      }
    }
  }, [searchParams, router]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditableData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditableData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes
      setUserData(editableData);
    } else {
      // Reset to current data when entering edit mode
      setEditableData(userData);
    }
    setIsEditing(!isEditing);
  };

  const resetChanges = () => {
    setEditableData(userData);
    setIsEditing(false);
  };

  // Photo handling functions
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      validateAndSetPhoto(file);
    }
  };

  const handlePhotoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      validateAndSetPhoto(file);
    }
  };

  const validateAndSetPhoto = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    setPhotoFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setIsPhotoEditing(false);
    setPhotoEditOptions({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
      scale: 1
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePhotoEditChange = (option, value) => {
    setPhotoEditOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const resetPhotoEdits = () => {
    setPhotoEditOptions({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
      scale: 1
    });
  };

  const getPhotoStyle = () => {
    const { brightness, contrast, saturation, rotation, scale } = photoEditOptions;
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      transition: 'all 0.3s ease'
    };
  };

  const getCurrentPhotoUrl = () => {
    if (photoPreview) {
      return photoPreview;
    }
    if (dpUrl) {
      return `${process.env.NEXT_PUBLIC_BaseUrl}${dpUrl}`;
    }
    return '/assets/default-user.png';
  };

  if (!userData || !editableData) return null;

  const {
    userId,
    name,
    fatherName,
    age,
    designation,
    role,
    gender,
    contact,
    email,
    address,
    aadharCard,
    pancard,
    dpUrl,
  } = editableData;

  const today = new Date();
  const oneYearLater = new Date(today);
  oneYearLater.setFullYear(today.getFullYear() + 1);
  const validDate = oneYearLater.toLocaleDateString('en-GB');

  const sanitizeColors = (element) => {
    const all = element.querySelectorAll('*');
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      ['color', 'backgroundColor', 'borderColor'].forEach((prop) => {
        const value = style[prop];
        if (value && value.includes('oklch')) {
          el.style[prop] = '#000';
        }
      });
    });
  };

  const downloadCard = () => {
    if (!cardRef.current) return;

    sanitizeColors(cardRef.current);

    html2canvas(cardRef.current, { scale: 2, useCORS: true })
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = `${name}_ID_card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editable Form */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 border border-blue-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Edit ID Card Details</h2>
                <div className="space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={toggleEditMode}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        💾 Save Changes
                      </button>
                      <button
                        onClick={resetChanges}
                        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={toggleEditMode}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      ✏️ Edit Details
                    </button>
                  )}
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="mb-8 p-6 bg-white rounded-xl shadow-md border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  📸 Profile Photo
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Photo Upload Area */}
                  <div className="flex-1">
                    <div
                      className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300 cursor-pointer bg-gray-50 hover:bg-blue-50"
                      onDrop={handlePhotoDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      
                      {photoPreview ? (
                        <div className="space-y-4">
                          <div className="w-32 h-40 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
                            <img
                              src={photoPreview}
                              alt="Photo Preview"
                              className="w-full h-full object-cover"
                              style={getPhotoStyle()}
                            />
                          </div>
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsPhotoEditing(!isPhotoEditing);
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                              🎨 Edit Photo
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhoto();
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-4xl">📷</span>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-700">Upload Profile Photo</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Drag and drop an image here, or click to select
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Supports: JPEG, PNG, WebP (Max 5MB)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Photo Editing Controls */}
                  {isPhotoEditing && photoPreview && (
                    <div className="lg:w-80 bg-gray-50 rounded-lg p-4 space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        🎛️ Photo Adjustments
                      </h4>
                      
                      {/* Brightness */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ☀️ Brightness: {photoEditOptions.brightness}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={photoEditOptions.brightness}
                          onChange={(e) => handlePhotoEditChange('brightness', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Contrast */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          🌓 Contrast: {photoEditOptions.contrast}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={photoEditOptions.contrast}
                          onChange={(e) => handlePhotoEditChange('contrast', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Saturation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          🎨 Saturation: {photoEditOptions.saturation}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={photoEditOptions.saturation}
                          onChange={(e) => handlePhotoEditChange('saturation', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Rotation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          🔄 Rotation: {photoEditOptions.rotation}°
                        </label>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={photoEditOptions.rotation}
                          onChange={(e) => handlePhotoEditChange('rotation', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Scale */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          🔍 Scale: {photoEditOptions.scale}x
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={photoEditOptions.scale}
                          onChange={(e) => handlePhotoEditChange('scale', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={resetPhotoEdits}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        🔄 Reset Adjustments
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User ID */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🆔 User ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.userId || ''}
                      onChange={(e) => handleInputChange('userId', e.target.value)}
                      placeholder="Enter unique user ID (e.g., 160525122516474)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{userId || 'N/A'}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    👤 Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name (e.g., Vatsal Rishabh Pandey)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{name || 'N/A'}</p>
                  )}
                </div>

                {/* Father Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    👨‍👦 Father's Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.fatherName || ''}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="Enter father's name (e.g., Nagesh Pandey)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{fatherName || 'N/A'}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🎂 Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editableData.age || ''}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                      placeholder="Enter age (e.g., 53)"
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{age || 'N/A'}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    💼 Role/Position
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.role || ''}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="Enter role (e.g., rashtriyapramukh, सदस्य)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{role || designation || 'सदस्य'}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    ⚧️ Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={editableData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Select Gender</option>
                      <option value="male" className="text-gray-800">👨 Male</option>
                      <option value="female" className="text-gray-800">👩 Female</option>
                      <option value="other" className="text-gray-800">🏳️‍⚧️ Other</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{gender || 'N/A'}</p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    📞 Contact Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editableData.contact || ''}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="Enter mobile number (e.g., 8123573669)"
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{contact || 'N/A'}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    📧 Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editableData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email (e.g., vatsalrishabh00@gmail.com)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{email || 'N/A'}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🏠 Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address?.street || ''}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      placeholder="Enter complete street address (e.g., G-02 Lake beauty appartment KR puram banmglore)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{address?.street || 'N/A'}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🏙️ City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address?.city || ''}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      placeholder="Enter city name (e.g., Allahabad)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{address?.city || 'N/A'}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🗺️ State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address?.state || ''}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      placeholder="Enter state name (e.g., Uttar Pradesh)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{address?.state || 'N/A'}</p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    📮 ZIP Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address?.zipCode || ''}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      placeholder="Enter ZIP code (e.g., 211008)"
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{address?.zipCode || 'N/A'}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🌍 Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address?.country || ''}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      placeholder="Enter country name (e.g., India)"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{address?.country || 'N/A'}</p>
                  )}
                </div>

                {/* Aadhar Card */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    🆔 Aadhar Card Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.aadharCard || ''}
                      onChange={(e) => handleInputChange('aadharCard', e.target.value)}
                      placeholder="Enter 12-digit Aadhar number (e.g., 526858887881)"
                      pattern="[0-9]{12}"
                      maxLength="12"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{aadharCard || 'N/A'}</p>
                  )}
                </div>

                {/* PAN Card */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                    💳 PAN Card Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.pancard || ''}
                      onChange={(e) => handleInputChange('pancard', e.target.value)}
                      placeholder="Enter PAN number (e.g., ABCDE1234F)"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      maxLength="10"
                      style={{textTransform: 'uppercase'}}
                      className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-sm">{pancard || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ID Card Preview */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-lg p-8 border border-purple-200">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">🎫 ID Card Preview</h2>
              <div className="flex flex-col items-center gap-6">
                <div
                  ref={cardRef}
                  className="relative w-[336px] h-[210px] bg-white rounded-md shadow-md"
                >
                  {/* Background image */}
                  <img
                    src="/assets/idcard.png"
                    alt="ID Card Template"
                    className="w-full h-full object-cover rounded-md"
                  />

                  {/* User photo */}
                  <div className="absolute top-[43px] left-[15px] w-[80px] h-[100px] rounded-sm overflow-hidden bg-white border border-gray-400">
                    <img
                      src={getCurrentPhotoUrl()}
                      alt="User"
                      className="w-full h-full object-cover"
                      style={photoPreview ? getPhotoStyle() : {}}
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* User details */}
                  <div className="absolute inset-0 text-[10px] text-black px-4 py-2 font-semibold leading-tight">
                    <div className="absolute top-[35px] left-[180px]">{userId}</div>
                    <div className="absolute top-[47px] left-[180px]">{name}</div>
                    <div className="absolute top-[61px] left-[180px]">{role || designation || 'सदस्य'}</div>
                    <div className="absolute top-[74px] left-[180px]">{gender}</div>
                    <div className="absolute top-[87px] left-[180px]">{contact}</div>
                    <div className="absolute top-[101px] left-[180px]">{address?.city}</div>
                    <div className="absolute top-[115px] left-[180px]">{address?.state}</div>
                    <div className="absolute top-[129px] left-[180px] w-[150px] text-[10px] font-semibold leading-tight break-words line-clamp-2">
                      {`${address?.street}, ${address?.city}, ${address?.state} - ${address?.zipCode}, ${address?.country}`}
                    </div>
                    <div className="absolute top-[200px] left-[290px] text-[5px]">
                      {validDate}
                    </div>
                  </div>
                </div>

                <button
                  onClick={downloadCard}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  📥 Download ID Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
