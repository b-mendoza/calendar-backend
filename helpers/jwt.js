const jwt = require('jsonwebtoken');

const generateJWT = (u_id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { u_id, name };

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            { expiresIn: '2h' },
            (error, token) => {
                if (error) {
                    console.log(error);

                    reject("The token can't be generated");
                }

                resolve(token);
            }
        );
    });
};

module.exports = generateJWT;
