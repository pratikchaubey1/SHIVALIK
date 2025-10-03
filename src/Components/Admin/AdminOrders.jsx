import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { checkAuth(); fetchOrders() }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login')
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return { headers: { Authorization: `Bearer ${token}` } }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', getAuthHeaders())
      if (res.data.success) setOrders(res.data.orders)
      else setOrders([])
    } catch (e) {
      setOrders([])
    } finally { setLoading(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
    toast.success('Logged out successfully')
  }

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin • Orders</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"><FiLogOut />Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders yet</td></tr>
                ) : (
                  orders.map(o => (
                    <tr key={o._id || o.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{o._id || o.id}</td>
                      <td className="px-6 py-4 text-sm">{o.userEmail || (o.user && o.user.email) || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">₹{o.total || o.amount || 0}</td>
                      <td className="px-6 py-4 text-sm">{o.status || 'Pending'}</td>
                      <td className="px-6 py-4 text-sm">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
