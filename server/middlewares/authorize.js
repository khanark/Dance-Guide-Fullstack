const { verifyToken } = require('../services/user_service');

module.exports = async (req, res, next) => {
    const token = req.headers['x-authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No authorization' });
    }
    try {
        const decodedUser = await verifyToken(token);
        req.user = decodedUser;
        next();
    } catch (error) {
        next(error);
    }
};
