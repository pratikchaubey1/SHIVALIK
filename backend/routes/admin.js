const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/admin/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/products', auth, async (req, res) => {
  try {
    const { id, title, description, price, src } = req.body;

    // Check if product with same ID already exists
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this ID already exists' });
    }

    const product = new Product({
      id,
      title,
      description,
      price,
      src
    });

    await product.save();

    // Emit real-time update to all connected clients
    req.io.emit('productAdded', product);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/products/:id', auth, async (req, res) => {
  try {
    const { title, description, price, src } = req.body;
    
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { title, description, price, src },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Emit real-time update to all connected clients
    req.io.emit('productUpdated', product);

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Emit real-time update to all connected clients
    req.io.emit('productDeleted', { id: req.params.id });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products (admin view)
// @access  Private (Admin only)
router.get('/products', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (admin view)
// @access  Private (Admin only)
router.get('/users', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('name email isVerified createdAt lastLogin cart')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    // Add cart item count for each user
    const usersWithCartCount = users.map(user => ({
      ...user.toObject(),
      cartItemCount: user.cart ? user.cart.reduce((total, item) => total + item.quantity, 0) : 0
    }));

    res.json({
      success: true,
      users: usersWithCartCount,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/dashboard
// @desc    Get dashboard stats
// @access  Private (Admin only)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
    
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email isVerified createdAt lastLogin');

    res.json({
      success: true,
      stats: {
        totalProducts,
        recentProducts,
        totalUsers,
        verifiedUsers,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
