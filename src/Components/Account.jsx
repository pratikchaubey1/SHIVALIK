import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Account() {
  const { user, loading } = useAuth()
  const { isDark } = useTheme()

  const [orders, setOrders] = useState([])
  const [userAddress, setUserAddress] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders and address
        const [ordersRes, addrRes] = await Promise.all([
          axios.get('/payment/orders').catch(() => ({ data: { success: true, orders: [] } })),
          axios.get('/user-auth/address').catch(() => ({ data: { success: false } })),
        ])
        if (ordersRes?.data?.success) setOrders(ordersRes.data.orders || [])
        if (addrRes?.data?.success) setUserAddress(addrRes.data.address || null)
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} flex items-center justify-center`}>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-extrabold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Account Settings</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Manage your profile, orders and addresses</p>
          </div>
          <Link to="/products" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Continue Shopping</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' : 'bg-white border border-blue-100'} rounded-2xl p-5 h-max shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div>
                <div className="text-lg font-bold">{user?.name || 'User'}</div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{user?.email}</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <a href="#profile" className="block px-3 py-2 rounded-lg bg-blue-600/10 text-blue-600 font-medium">Profile</a>
              <a href="#orders" className={`${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} block px-3 py-2 rounded-lg`}>Orders</a>
              <a href="#addresses" className={`${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} block px-3 py-2 rounded-lg`}>Addresses</a>
              <a href="#security" className={`${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} block px-3 py-2 rounded-lg`}>Security</a>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile and Account Details */}
            <section id="profile" className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' : 'bg-white border border-blue-100'} rounded-2xl p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-bold mb-4">Account Details</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{user?.name || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium">{user?.email || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-medium">{userAddress?.phone || 'Not added'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Member Since</span><span className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</span></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                  <div className={`${isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-xl p-4 text-sm leading-6`}>
                    {userAddress ? (
                      <>
                        <div className="font-medium">{userAddress.fullName}</div>
                        <div>{userAddress.phone}</div>
                        <div>{userAddress.line1}</div>
                        {userAddress.line2 && <div>{userAddress.line2}</div>}
                        <div>{[userAddress.city, userAddress.state].filter(Boolean).join(', ')} {userAddress.postalCode}</div>
                        <div>{userAddress.country}</div>
                      </>
                    ) : (
                      <div className="text-gray-500">No address saved</div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Orders */}
            <section id="orders" className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' : 'bg-white border border-blue-100'} rounded-2xl p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Orders</h2>
                <Link to="/products" className="text-sm text-blue-600 hover:underline">Shop more</Link>
              </div>
              {loadingData ? (
                <div className="py-6 text-sm text-gray-500">Loading orders...</div>
              ) : orders?.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className={`${isDark ? 'bg-white/5' : 'bg-gray-50'} text-gray-500`}> 
                      <tr>
                        <th className="text-left px-4 py-2">Order</th>
                        <th className="text-left px-4 py-2">Date</th>
                        <th className="text-left px-4 py-2">Total</th>
                        <th className="text-left px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/30">
                      {orders.map((o) => (
                        <tr key={o._id || o.id} className="hover:bg-white/5">
                          <td className="px-4 py-2 font-medium">#{(o._id || o.id)?.toString().slice(-6)}</td>
                          <td className="px-4 py-2">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '-'}</td>
                          <td className="px-4 py-2 font-semibold">₹{o.total || o.amount || 0}</td>
                          <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs ${ (o.status||'Pending')==='Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.status || 'Pending'}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-6 text-sm text-gray-500">No orders yet</div>
              )}
            </section>

            {/* Addresses */}
            <section id="addresses" className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' : 'bg-white border border-blue-100'} rounded-2xl p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Saved Address</h2>
                <Link to="/checkout/address" className="text-sm text-blue-600 hover:underline">{userAddress ? 'Edit' : 'Add New'}</Link>
              </div>
              {loadingData ? (
                <div className="py-6 text-sm text-gray-500">Loading address...</div>
              ) : userAddress ? (
                <div className={`${isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-xl p-4 text-sm leading-6`}>
                  <div className="font-semibold">{userAddress.fullName}</div>
                  <div>{userAddress.phone}</div>
                  <div>{userAddress.line1}</div>
                  {userAddress.line2 && <div>{userAddress.line2}</div>}
                  <div>{[userAddress.city, userAddress.state].filter(Boolean).join(', ')} {userAddress.postalCode}</div>
                  <div>{userAddress.country}</div>
                </div>
              ) : (
                <div className="py-6 text-sm text-gray-500">No address saved yet</div>
              )}
            </section>

            {/* Security placeholder */}
            <section id="security" className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10' : 'bg-white border border-blue-100'} rounded-2xl p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}>
              <h2 className="text-lg font-bold mb-4">Security</h2>
              <p className="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">For your security, we use OTP-based login. No password stored.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
