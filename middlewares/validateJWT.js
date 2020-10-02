const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // how we are going to recieve the JWT
    // we are going to recieve it in the headers like x-token
    const token = req.header('x-token');

    if (!token) {
        return res
            .status(401)
            .json({ ok: false, msg: 'There is no JWT in the request' });
    }

    try {
        const { u_id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.u_id = u_id;
        req.name = name;
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'JWT not valid' });
    }

    next();
};

module.exports = validateJWT;
