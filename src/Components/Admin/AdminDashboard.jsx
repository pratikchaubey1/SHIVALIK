import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FiPlus, FiEdit, FiTrash2, FiLogOut, FiBarChart, FiUsers } from 'react-icons/fi';

// Move ProductModal outside to prevent re-creation on each render
const ProductModal = ({ show, onClose, onSubmit, title, isEdit = false, formData, setFormData }) => {
  if (!show) return null;

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, [setFormData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              disabled={isEdit}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={formData.src}
              onChange={(e) => handleInputChange('src', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, recentProducts: [] });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Users state
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersPagination, setUsersPagination] = useState({ totalUsers: 0, totalPages: 1, hasNext: false, hasPrev: false });

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    src: ''
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchDashboardStats();
    fetchUsers(1);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/products', getAuthHeaders());
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error('Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard', getAuthHeaders());
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/users?page=${page}&limit=10`, getAuthHeaders());
      if (response.data.success) {
        setUsers(response.data.users);
        setUsersPagination(response.data.pagination);
        setUsersPage(page);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      price: '',
      src: ''
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/products',
        formData,
        getAuthHeaders()
      );
      
      if (response.data.success) {
        toast.success('Product added successfully!');
        setShowAddModal(false);
        resetForm();
        fetchProducts();
        fetchDashboardStats();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add product';
      toast.error(message);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/${selectedProduct.id}`,
        formData,
        getAuthHeaders()
      );
      
      if (response.data.success) {
        toast.success('Product updated successfully!');
        setShowEditModal(false);
        setSelectedProduct(null);
        resetForm();
        fetchProducts();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update product';
      toast.error(message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/admin/products/${productId}`,
          getAuthHeaders()
        );
        
        if (response.data.success) {
          toast.success('Product deleted successfully!');
          fetchProducts();
          fetchDashboardStats();
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete product';
        toast.error(message);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      src: product.src
    });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    // Auto-generate next ID
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    setFormData({
      id: maxId + 1,
      title: '',
      description: '',
      price: '',
      src: ''
    });
    setShowAddModal(true);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <FiBarChart className="text-blue-600 text-3xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <FiUsers className="text-green-600 text-3xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <FiUsers className="text-purple-600 text-3xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Verified Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.verifiedUsers || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/admin/products" className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
            <p className="text-sm text-gray-600">Add, edit, and delete products</p>
          </a>
          <a href="/admin/users" className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage all users</p>
          </a>
          <a href="/admin/orders" className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
            <p className="text-sm text-gray-600">Review and update orders</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
