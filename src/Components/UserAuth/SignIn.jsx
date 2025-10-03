import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import { FiMail, FiUser, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const SignIn = () => {
  const navigate = useNavigate();
  const { requestOtp, verifyOtp, authStep, resendOTP, resetAuth } = useAuth();
  
  const [form, setForm] = useState({
    name: '',
    email: ''
  });
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await requestOtp(form);
    // If success, authStep switches to 'otp' by context
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 5) {
      return;
    }
    
    setLoading(true);
    
    const result = await verifyOtp(otp);
    if (result.success) {
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    await resendOTP();
    setResendLoading(false);
  };

  const handleBackToForm = () => {
    resetAuth();
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            {authStep === 'form' ? 'Sign In' : 'Verify OTP'}
          </motion.h1>
          <p className="text-gray-600">
            {authStep === 'form' 
              ? 'Continue with your name and email'
              : `Enter the 5-digit code sent to ${form.email}`
            }
          </p>
        </div>

        {authStep === 'form' ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="w-full px-4 py-4 text-center text-2xl font-mono border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition tracking-widest"
                placeholder="00000"
                maxLength={5}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
              >
                <FiRefreshCw className={`${resendLoading ? 'animate-spin' : ''}`} />
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              disabled={loading || otp.length !== 5}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="button"
              onClick={handleBackToForm}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-2"
            >
              <FiArrowLeft />
              Back to Login
            </motion.button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
