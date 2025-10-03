import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ hasNext: false, hasPrev: false })
  const navigate = useNavigate()

  useEffect(() => { checkAuth(); fetchUsers(1) }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login')
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return { headers: { Authorization: `Bearer ${token}` } }
  }

  const fetchUsers = async (p = 1) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users?page=${p}&limit=10`, getAuthHeaders())
      if (res.data.success) {
        setUsers(res.data.users)
        setPagination(res.data.pagination || { hasNext: false, hasPrev: false })
        setPage(p)
      }
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

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin • Users</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"><FiLogOut />Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Users</h2>
            <div className="flex gap-2">
              <button onClick={() => pagination.hasPrev && fetchUsers(page - 1)} disabled={!pagination.hasPrev} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
              <button onClick={() => pagination.hasNext && fetchUsers(page + 1)} disabled={!pagination.hasNext} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${u.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{u.isVerified ? 'Yes' : 'No'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
