import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authStep, setAuthStep] = useState('form'); // 'form' | 'otp'
  const [tempUserId, setTempUserId] = useState(null);
  const [authType, setAuthType] = useState(null); // 'login' | 'register'

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/user-auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      // User is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register user (Step 1 - Send OTP)
  const register = async (userData) => {
    try {
      const response = await axios.post('/user-auth/register', userData);
      if (response.data.success) {
        setTempUserId(response.data.userId);
        setAuthType('register');
        setAuthStep('otp');
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Verify registration OTP (Step 2)
  const verifyRegister = async (otp) => {
    try {
      const response = await axios.post('/user-auth/verify-register', {
        userId: tempUserId,
        otp
      });
      if (response.data.success) {
        setUser(response.data.user);
        setAuthStep('form');
        setTempUserId(null);
        setAuthType(null);
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login user (Step 1 - Send OTP)
  const login = async (credentials) => {
    try {
      const response = await axios.post('/user-auth/login', credentials);
      if (response.data.success) {
        setTempUserId(response.data.userId);
        setAuthType('login');
        setAuthStep('otp');
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      
      // Handle special case for unverified users
      if (error.response?.data?.needsVerification) {
        setTempUserId(error.response.data.userId);
        setAuthType('register');
        setAuthStep('otp');
        toast.error(message);
        return { success: false, needsVerification: true };
      }
      
      toast.error(message);
      return { success: false, message };
    }
  };

  // Verify login OTP (Step 2)
  const verifyLogin = async (otp) => {
    try {
      const response = await axios.post('/user-auth/verify-login', {
        userId: tempUserId,
        otp
      });
      if (response.data.success) {
        setUser(response.data.user);
        setAuthStep('form');
        setTempUserId(null);
        setAuthType(null);
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    if (!tempUserId || !authType) {
      toast.error('No active verification session');
      return { success: false };
    }

    try {
      const response = await axios.post('/user-auth/resend-otp', {
        userId: tempUserId,
        type: authType
      });
      if (response.data.success) {
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('/user-auth/logout');
      setUser(null);
      setAuthStep('form');
      setTempUserId(null);
      setAuthType(null);
      toast.success('Logged out successfully');
    } catch (error) {
      // Even if logout fails on server, clear local state
      setUser(null);
      setAuthStep('form');
      setTempUserId(null);
      setAuthType(null);
      console.error('Logout error:', error);
    }
  };

  // Reset auth state (for canceling OTP step)
  const resetAuth = () => {
    setAuthStep('form');
    setTempUserId(null);
    setAuthType(null);
  };

  const value = {
    user,
    loading,
    authStep,
    authType,
    register,
    verifyRegister,
    login,
    verifyLogin,
    resendOTP,
    logout,
    resetAuth,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
