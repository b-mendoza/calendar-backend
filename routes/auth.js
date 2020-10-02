// auth routes
// /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { registerUser, loginUser, renewToken } = require('../controllers/auth');
const fieldValidator = require('../middlewares/fieldValidator');
const validateJWT = require('../middlewares/validateJWT');

router.post(
    '/register',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check(
            'password',
            'Password must be 5 at least characters long'
        ).isLength({
            min: 6,
        }),
        fieldValidator,
    ],
    registerUser
);

router.post(
    '/',
    [
        check('email', 'Email is mandatory').isEmail(),
        check(
            'password',
            'Password must be 5 at least characters long'
        ).isLength({
            min: 6,
        }),
        fieldValidator,
    ],
    loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
