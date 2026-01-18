import React, { useState, useEffect } from 'react';
import { Camera, User, LogOut, Plus, Search, Calendar, TrendingUp } from 'lucide-react';
import CustomerDetails from './CustomerDetails';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // API Base URL - Change this to your backend URL
  const API_BASE_URL = 'http://localhost:8080';

  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
    joinDate: new Date().toISOString().split('T')[0],
    goals: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchCustomerList();
    }
  }, [isLoggedIn]);

  // API: Get Customer List
  const fetchCustomerList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/client/getClientList`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedData = data.map(client => ({
          ...client,
          joinDate: client.joinDate.split('T')[0], // Convert ISO to YYYY-MM-DD
          records: (client.records || []).map(record => ({
            ...record,
            date: record.date.split('T')[0]
          }))
        }));
        setCustomers(transformedData);
      } else {
        console.error('Failed to fetch customer list');
        alert('Failed to load customer list. Loading sample data for demo.');
        loadSampleData();
      }
    } catch (error) {
      console.error('Error fetching customer list:', error);
      console.log('Using local data for demo.');
      loadSampleData();
    } finally {
      setIsLoading(false);
    }
  };

  // API: Search Customer by Name
  const searchCustomer = async (clientName) => {
    if (!clientName || clientName.trim() === '') {
      fetchCustomerList();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/client/searchClient/${encodeURIComponent(clientName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedData = (Array.isArray(data) ? data : [data]).map(client => ({
          ...client,
          joinDate: client.joinDate ? client.joinDate.split('T')[0] : client.joinDate,
          records: (client.records || []).map(record => ({
            ...record,
            date: record.date.split('T')[0]
          }))
        }));
        setCustomers(transformedData);
      } else {
        console.error('Failed to search customer');
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error searching customer:', error);
      const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(clientName.toLowerCase())
      );
      setCustomers(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  // API: Get Customer Details
  const fetchCustomerDetails = async (clientId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/client/getClient/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedCustomer = {
          ...data,
          joinDate: data.joinDate.split('T')[0],
          records: (data.records || []).map(record => ({
            ...record,
            date: record.date.split('T')[0]
          }))
        };
        setSelectedCustomer(transformedCustomer);
        setCurrentView('details');
      } else {
        console.error('Failed to fetch customer details');
        alert('Failed to load customer details');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      const customer = customers.find(c => c.id === clientId);
      if (customer) {
        setSelectedCustomer(customer);
        setCurrentView('details');
      } else {
        alert('Error loading customer details');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load sample data (fallback for demo)
  const loadSampleData = () => {
    const sampleCustomer = {
      id: 1,
      name: 'John Martinez',
      email: 'john.martinez@email.com',
      phone: '+1 (555) 123-4567',
      age: '28',
      gender: 'male',
      joinDate: '2024-09-15',
      goals: 'Lose 15kg and build lean muscle mass. Improve overall fitness and energy levels.',
      records: [
        {
          date: '2024-09-15',
          photo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect fill="%23e5e7eb" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EBefore%3C/text%3E%3C/svg%3E',
          notes: 'Starting weight - feeling motivated!'
        },
        {
          date: '2024-12-15',
          photo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect fill="%23dbeafe" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%233b82f6"%3EAfter%3C/text%3E%3C/svg%3E',
          notes: '3 months progress - lost 13kg!'
        }
      ]
    };
    setCustomers([sampleCustomer]);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm && isLoggedIn) {
        searchCustomer(searchTerm);
      } else if (isLoggedIn && searchTerm === '') {
        fetchCustomerList();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLogin = () => {
    const username = loginData.username?.trim() || '';
    const password = loginData.password?.trim() || '';
    
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setCurrentView('customers');
    } else {
      alert('Invalid credentials. Please use:\nUsername: admin\nPassword: admin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setLoginData({ username: '', password: '' });
    setCustomers([]);
    setSelectedCustomer(null);
  };

  // API: Add New Customer
  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert('Please fill in name and email');
      return;
    }

    setIsLoading(true);
    try {
      const customerData = {
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        age: newCustomer.age ? parseInt(newCustomer.age) : null,
        gender: newCustomer.gender,
        joinDate: newCustomer.joinDate,
        goals: newCustomer.goals,
        records: []
      };

      const response = await fetch(`${API_BASE_URL}/client/addClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      if (response.ok) {
        alert('Customer added successfully!');
        setNewCustomer({
          name: '',
          email: '',
          phone: '',
          age: '',
          gender: 'male',
          joinDate: new Date().toISOString().split('T')[0],
          goals: ''
        });
        setCurrentView('customers');
        fetchCustomerList();
      } else {
        const error = await response.text();
        alert(`Failed to add customer: ${error}`);
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error connecting to server. Make sure your backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Pilates Tracker</h1>
            <p className="text-gray-600 mt-2">Body Analysis Management System</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Demo: admin / admin
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ADD CUSTOMER PAGE
  if (currentView === 'add') {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <button 
                  onClick={() => setCurrentView('customers')}
                  className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Pilates Tracker
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('customers')}
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

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Customer</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={newCustomer.age}
                    onChange={(e) => setNewCustomer({ ...newCustomer, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={newCustomer.gender}
                    onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
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
                    value={newCustomer.joinDate}
                    onChange={(e) => setNewCustomer({ ...newCustomer, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks/Goals</label>
                  <textarea
                    value={newCustomer.goals}
                    onChange={(e) => setNewCustomer({ ...newCustomer, goals: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter customer's fitness goals, health concerns, or any special notes..."
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddCustomer}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding...' : 'Add Customer'}
                </button>
                <button
                  onClick={() => setCurrentView('customers')}
                  disabled={isLoading}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CUSTOMER DETAILS PAGE
  if (currentView === 'details' && selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        customers={customers}
        setCustomers={setCustomers}
        setSelectedCustomer={setSelectedCustomer}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
        fetchCustomerList={fetchCustomerList}
        API_BASE_URL={API_BASE_URL}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  // CUSTOMER LIST PAGE
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <button 
                onClick={() => setCurrentView('customers')}
                className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Pilates Tracker
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Customer</span>
              </button>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 flex items-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
            
            <div className="relative w-64 h-[42px] flex items-center">
              {/* Left Icon: Centered vertically automatically by flex items-center */}
              <Search className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
              
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition-all shadow-sm"
              />

              {/* Right Icon: Clear Button (Only shows when searchTerm has text) */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-full hover:bg-gray-100"
                  title="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No customers found</p>
              <button
                onClick={() => setCurrentView('add')}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Add your first customer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((customer) => {
                const records = customer.records || [];
                const latestRecord = records.length > 0 ? records[records.length - 1] : null;
                
                return (
                  <div
                    key={customer.id}
                    onClick={() => fetchCustomerDetails(customer.id)}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Join: {new Date(customer.joinDate).toLocaleDateString()}</span>
                      <span className="text-blue-600 font-semibold">{records.length} records</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
