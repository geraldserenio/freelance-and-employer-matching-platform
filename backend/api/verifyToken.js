
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_TOKEN || "temporaryjwttoken";

async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                resolve(false); // Token is invalid
            } else {
                resolve(decoded); // Token is valid, return decoded info
            }
        });
    });
}

module.exports = {
    verifyToken
};