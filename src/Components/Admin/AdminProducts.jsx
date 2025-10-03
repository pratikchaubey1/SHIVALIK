import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FiPlus, FiEdit, FiTrash2, FiLogOut } from 'react-icons/fi'

const ProductModal = ({ show, onClose, onSubmit, title, isEdit = false, formData, setFormData }) => {
  if (!show) return null
  const handleChange = useCallback((k, v) => setFormData(prev => ({ ...prev, [k]: v })), [setFormData])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Product ID</label>
            <input type="number" value={formData.id} onChange={e => handleChange('id', e.target.value)} disabled={isEdit} className="w-full text-gray-900 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={formData.title} onChange={e => handleChange('title', e.target.value)} className="w-full p-2 border text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={e => handleChange('description', e.target.value)} className="w-full p-2 border text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input type="text" value={formData.price} onChange={e => handleChange('price', e.target.value)} className="w-full p-2 border text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" value={formData.src} onChange={e => handleChange('src', e.target.value)} className="w-full p-2 border text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium">
              {isEdit ? 'Update' : 'Add'} Product
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 font-medium">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({ id: '', title: '', description: '', price: '', src: '' })
  const navigate = useNavigate()

  useEffect(() => { checkAuth(); fetchProducts() }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login')
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return { headers: { Authorization: `Bearer ${token}` } }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products', getAuthHeaders())
      if (res.data.success) setProducts(res.data.products)
    } catch (e) {
      // no-op
    } finally { setLoading(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
    toast.success('Logged out successfully')
  }

  const openAdd = () => {
    const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0
    setFormData({ id: maxId + 1, title: '', description: '', price: '', src: '' })
    setShowAddModal(true)
  }
  const openEdit = (p) => { setSelectedProduct(p); setFormData({ id: p.id, title: p.title, description: p.description, price: p.price, src: p.src }); setShowEditModal(true) }

  const addProduct = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/admin/products', formData, getAuthHeaders())
      if (res.data.success) { toast.success('Product added'); setShowAddModal(false); fetchProducts() }
    } catch (e) { toast.error('Failed to add product') }
  }

  const editProduct = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/products/${selectedProduct.id}`, formData, getAuthHeaders())
      if (res.data.success) { toast.success('Product updated'); setShowEditModal(false); setSelectedProduct(null); fetchProducts() }
    } catch (e) { toast.error('Failed to update product') }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/products/${id}`, getAuthHeaders())
      if (res.data.success) { toast.success('Product deleted'); fetchProducts() }
    } catch (e) { toast.error('Failed to delete product') }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg text-gray-700">Loading products...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin • Products</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <FiLogOut /><span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Products Management</h2>
            <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <FiPlus /><span>Add Product</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{p.id}</td>
                    <td className="px-6 py-4"><img src={p.src} alt={p.title} className="w-12 h-12 object-cover rounded" /></td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{p.title}</div>
                      <div className="text-sm text-gray-500">{p.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">₹{p.price}</td>
                    <td className="px-6 py-4 text-sm"><div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                        <FiEdit />
                      </button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <FiTrash2 />
                      </button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductModal show={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={addProduct} title="Add New Product" formData={formData} setFormData={setFormData} />
      <ProductModal show={showEditModal} onClose={() => { setShowEditModal(false); setSelectedProduct(null) }} onSubmit={editProduct} title="Edit Product" isEdit formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default AdminProducts
