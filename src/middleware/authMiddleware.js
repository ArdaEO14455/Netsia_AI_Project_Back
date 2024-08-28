const authMiddleware = (req, res, next) => {
    //check that token exists before allowing route
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    else {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' });
    }}
};

export default authMiddleware;
