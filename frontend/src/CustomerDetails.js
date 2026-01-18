import React, { useState } from 'react';
import { Camera, User, LogOut, Calendar, TrendingUp } from 'lucide-react';

function CustomerDetails({
  customer,
  customers,
  setCustomers,
  setSelectedCustomer,
  setCurrentView,
  handleLogout,
  fetchCustomerList,
  API_BASE_URL,
  isLoading,
  setIsLoading
}) {
  const [selectedBeforeDate, setSelectedBeforeDate] = useState(null);
  const [selectedAfterDate, setSelectedAfterDate] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    recipientEmail: '',
    subject: '',
    message: '',
    includePhotos: true
  });
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    photo: '',
    notes: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecord({ ...newRecord, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.date) {
      alert('Please fill in date');
      return;
    }

    const record = { 
      date: newRecord.date,
      photo: newRecord.photo || null,
      notes: newRecord.notes || null
    };

    const updatedRecords = [...(customer.records || []), record].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Update customer with new record via API
    const updateCustomerWithRecord = async () => {
      try {
        const customerData = {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone || null,
          age: customer.age || null,
          gender: customer.gender,
          joinDate: customer.joinDate,
          goals: customer.goals || null,
          records: updatedRecords.map(r => ({
            date: r.date,
            photo: r.photo || null,
            notes: r.notes || null
          }))
        };

        const response = await fetch(`${API_BASE_URL}/client/editClient`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });

        if (response.ok) {
          const data = await response.json();
          const transformedCustomer = {
            ...data,
            joinDate: data.joinDate.split('T')[0],
            records: (data.records || []).map(record => ({
              ...record,
              date: record.date.split('T')[0]
            }))
          };
          
          setSelectedCustomer(transformedCustomer);
          
          // Update local customers list
          const updatedCustomers = customers.map(c => 
            c.id === customer.id ? transformedCustomer : c
          );
          setCustomers(updatedCustomers);

          setNewRecord({
            date: new Date().toISOString().split('T')[0],
            photo: '',
            notes: ''
          });

          alert('Record added successfully!');
        } else {
          alert('Failed to add record');
        }
      } catch (error) {
        console.error('Error adding record:', error);
        alert('Error connecting to server');
      }
    };

    updateCustomerWithRecord();
  };

  const handleUpdateCustomer = async () => {
    if (!editCustomerData.name || !editCustomerData.email) {
      alert('Please fill in name and email');
      return;
    }

    setIsLoading(true);
    try {
      const customerData = {
        id: customer.id,
        name: editCustomerData.name,
        email: editCustomerData.email,
        phone: editCustomerData.phone || null,
        age: editCustomerData.age ? parseInt(editCustomerData.age) : null,
        gender: editCustomerData.gender,
        joinDate: editCustomerData.joinDate,
        goals: editCustomerData.goals || null,
        records: (customer.records || []).map(record => ({
          date: record.date,
          photo: record.photo || null,
          notes: record.notes || null
        }))
      };

      const response = await fetch(`${API_BASE_URL}/client/editClient`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Customer details updated successfully!');
        // Transform response data
        const transformedCustomer = {
          ...data,
          joinDate: data.joinDate.split('T')[0],
          records: (data.records || []).map(record => ({
            ...record,
            date: record.date.split('T')[0]
          }))
        };
        setSelectedCustomer(transformedCustomer);
        setIsEditingCustomer(false);
        setEditCustomerData(null);
        fetchCustomerList();
      } else {
        const errorData = await response.json();
        alert(`Failed to update customer: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error connecting to server. Make sure your backend is running on port 8080.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = () => {
    if (!emailData.recipientEmail) {
      alert('Please enter recipient email address');
      return;
    }

    const records = customer.records || [];
    const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
    const beforeRecord = selectedBeforeDate 
      ? records.find(r => r.date === selectedBeforeDate)
      : sortedRecords[0];
    const afterRecord = selectedAfterDate
      ? records.find(r => r.date === selectedAfterDate)
      : sortedRecords[sortedRecords.length - 1];

    // Create HTML email content
    let htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .section { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1f2937; }
    .image-container { display: flex; gap: 20px; margin: 20px 0; }
    .image-box { flex: 1; text-align: center; }
    .image-box img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .image-title { font-weight: bold; margin-bottom: 10px; padding: 10px; background: #f3f4f6; border-radius: 4px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Pilates Body Analysis Report</h1>
    <h2>${customer.name}</h2>
  </div>
  
  <div class="content">
    <div class="section">
      <h3>Customer Information</h3>
      <p><span class="label">Name:</span> ${customer.name}</p>
      <p><span class="label">Email:</span> ${customer.email}</p>
      <p><span class="label">Phone:</span> ${customer.phone || 'N/A'}</p>
      <p><span class="label">Age:</span> ${customer.age || 'N/A'} years</p>
      <p><span class="label">Gender:</span> ${customer.gender || 'N/A'}</p>
      <p><span class="label">Join Date:</span> ${new Date(customer.joinDate).toLocaleDateString()}</p>
    </div>

    ${customer.goals ? `
    <div class="section">
      <h3>Remarks/Goals</h3>
      <p>${customer.goals}</p>
    </div>
    ` : ''}

    <div class="section">
      <h3>Progress Tracking</h3>
      <p><span class="label">Total Records:</span> ${records.length}</p>
    </div>

    ${(beforeRecord || afterRecord) ? `
    <div class="section">
      <h3>Before & After Comparison</h3>
      <div class="image-container">
        ${beforeRecord ? `
        <div class="image-box">
          <div class="image-title">BEFORE - ${new Date(beforeRecord.date).toLocaleDateString()}</div>
          ${beforeRecord.photo ? `<img src="${beforeRecord.photo}" alt="Before Photo" />` : '<p>No photo available</p>'}
          ${beforeRecord.notes ? `<p style="margin-top: 10px; font-style: italic;">${beforeRecord.notes}</p>` : ''}
        </div>
        ` : ''}
        
        ${afterRecord ? `
        <div class="image-box">
          <div class="image-title">AFTER - ${new Date(afterRecord.date).toLocaleDateString()}</div>
          ${afterRecord.photo ? `<img src="${afterRecord.photo}" alt="After Photo" />` : '<p>No photo available</p>'}
          ${afterRecord.notes ? `<p style="margin-top: 10px; font-style: italic;">${afterRecord.notes}</p>` : ''}
        </div>
        ` : ''}
      </div>
    </div>
    ` : ''}

    ${emailData.message ? `
    <div class="section">
      <h3>Additional Message</h3>
      <p>${emailData.message}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p>This report was generated by Pilates Tracker - Body Analysis Management System</p>
      <p>Generated on: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
    `;

    // Create a downloadable HTML file
    const blob = new Blob([htmlBody], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pilates_Report_${customer.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also try to open mailto (without images, as backup)
    const subject = emailData.subject || `Pilates Body Analysis Report - ${customer.name}`;
    const textBody = `Please see the attached HTML file for the complete report with images.\n\n` +
      `Customer: ${customer.name}\n` +
      `Email: ${customer.email}\n` +
      `Total Records: ${records.length}\n\n` +
      `The HTML file has been downloaded to your computer. Please attach it to this email.`;
    
    const mailtoLink = `mailto:${emailData.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;
    window.location.href = mailtoLink;

    setShowEmailModal(false);
    setEmailData({
      recipientEmail: '',
      subject: '',
      message: '',
      includePhotos: true
    });

    alert('HTML report downloaded! Please attach the downloaded file to your email. Your email client will open shortly.');
  };

  const records = customer.records || [];
  const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const beforeRecord = selectedBeforeDate 
    ? records.find(r => r.date === selectedBeforeDate)
    : sortedRecords[0];
  
  const afterRecord = selectedAfterDate
    ? records.find(r => r.date === selectedAfterDate)
    : sortedRecords[sortedRecords.length - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FULLSCREEN IMAGE MODAL */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
              className="absolute -top-12 right-0 bg-white text-gray-800 rounded-full p-3 hover:bg-gray-200 transition-colors z-10 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-4">
              <h3 className="text-white text-2xl font-bold drop-shadow-lg">{fullscreenImage.title}</h3>
            </div>
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-sm drop-shadow-lg">Click outside or X to close</p>
          </div>
        </div>
      )}
      
      {/* NAVIGATION BAR */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <button 
                onClick={() => {
                  setCurrentView('customers');
                  setSelectedCustomer(null);
                }}
                className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Pilates Tracker
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setCurrentView('customers');
                  setSelectedCustomer(null);
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Customer List</span>
              </button>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 flex items-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* EDIT CUSTOMER FORM */}
        {isEditingCustomer && editCustomerData && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Customer Details</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editCustomerData.name}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editCustomerData.email}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={editCustomerData.phone}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={editCustomerData.age}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={editCustomerData.gender}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={editCustomerData.joinDate}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks/Goals</label>
                  <textarea
                    value={editCustomerData.goals}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, goals: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleUpdateCustomer}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setIsEditingCustomer(false);
                    setEditCustomerData(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CUSTOMER DETAILS CARD */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* CUSTOMER HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowEmailModal(true);
                  setEmailData({
                    ...emailData,
                    recipientEmail: customer.email,
                    subject: `Body Analysis Report - ${customer.name}`
                  });
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send Report</span>
              </button>
              <button
                onClick={() => {
                  setIsEditingCustomer(true);
                  setEditCustomerData({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone || '',
                    age: customer.age || '',
                    gender: customer.gender || 'male',
                    joinDate: customer.joinDate,
                    goals: customer.goals || ''
                  });
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Details</span>
              </button>
            </div>
          </div>

          {/* EMAIL MODAL */}
          {showEmailModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Send Customer Report</h3>
                  <button onClick={() => setShowEmailModal(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                    <input
                      type="email"
                      value={emailData.recipientEmail}
                      onChange={(e) => setEmailData({ ...emailData, recipientEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                    <textarea
                      value={emailData.message}
                      onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSendEmail}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Send Email
                    </button>
                    <button
                      onClick={() => setShowEmailModal(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Join Date</span>
              </div>
              <p className="text-gray-800">{new Date(customer.joinDate).toLocaleDateString()}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">Age & Gender</span>
              </div>
              <p className="text-gray-800">{customer.age} years, {customer.gender}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-purple-600 mb-2">
                <Camera className="w-5 h-5" />
                <span className="font-semibold">Total Records</span>
              </div>
              <p className="text-gray-800 text-2xl font-bold">{records.length}</p>
            </div>
          </div>

          {/* BEFORE/AFTER COMPARISON */}
          {records.length > 0 && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Before Date</label>
                  <select
                    value={selectedBeforeDate || (beforeRecord ? beforeRecord.date : '')}
                    onChange={(e) => setSelectedBeforeDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {sortedRecords.map((record) => (
                      <option key={record.date} value={record.date}>
                        {new Date(record.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select After Date</label>
                  <select
                    value={selectedAfterDate || (afterRecord ? afterRecord.date : '')}
                    onChange={(e) => setSelectedAfterDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {sortedRecords.map((record) => (
                      <option key={record.date} value={record.date}>
                        {new Date(record.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* BEFORE SECTION */}
                <div className="border-r pr-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">BEFORE</h3>
                  
                  {beforeRecord && beforeRecord.photo && (
                    <div className="relative group">
                      <img
                        src={beforeRecord.photo}
                        alt="Before"
                        className="w-full h-96 object-cover rounded-lg mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setFullscreenImage({ src: beforeRecord.photo, title: 'Before - ' + new Date(beforeRecord.date).toLocaleDateString() })}
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center mb-4 pointer-events-none">
                        <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-gray-800 text-lg font-semibold flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            Click to Enlarge
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {beforeRecord && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-center mb-3">
                        <span className="text-sm text-gray-500">Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date(beforeRecord.date).toLocaleDateString()}
                        </p>
                      </div>
                      {beforeRecord.notes && (
                        <div className="pt-3 border-t">
                          <p className="text-sm text-gray-600 italic">{beforeRecord.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* AFTER SECTION */}
                <div className="pl-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">AFTER</h3>
                  
                  {afterRecord && afterRecord.photo && (
                    <div className="relative group">
                      <img
                        src={afterRecord.photo}
                        alt="After"
                        className="w-full h-96 object-cover rounded-lg mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setFullscreenImage({ src: afterRecord.photo, title: 'After - ' + new Date(afterRecord.date).toLocaleDateString() })}
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center mb-4 pointer-events-none">
                        <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-gray-800 text-lg font-semibold flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            Click to Enlarge
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {afterRecord && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-center mb-3">
                        <span className="text-sm text-blue-600">Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date(afterRecord.date).toLocaleDateString()}
                        </p>
                      </div>
                      {afterRecord.notes && (
                        <div className="pt-3 border-t border-blue-200">
                          <p className="text-sm text-gray-600 italic">{afterRecord.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REMARKS/GOALS SECTION */}
          <div className="border-t pt-6 mb-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Remarks/Goals</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {customer.goals ? (
                <p className="text-gray-700 whitespace-pre-wrap">{customer.goals}</p>
              ) : (
                <p className="text-gray-400 italic">No remarks or goals added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* ADD NEW RECORD SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Record</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {newRecord.photo && (
                <img src={newRecord.photo} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={newRecord.notes}
                onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Add notes about this record..."
              />
            </div>

            <button
              onClick={handleAddRecord}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;