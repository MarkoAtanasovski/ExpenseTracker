const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed!" });
    }
};

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
};

const validateRequest = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body cannot be empty" });
    }
    next();
};

module.exports = {
    protect,
    errorHandler,
    validateRequest,
};
