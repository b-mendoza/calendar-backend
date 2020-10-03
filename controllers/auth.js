const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const generateJWT = require('../helpers/jwt');

const registerUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ ok: false, msg: 'The email is already in use' });
        }

        user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        // saving the data in the db
        await user.save();

        // if everything is ok we are now able to generate our jwt
        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            u_id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Please contact the admin',
        });
    }
};

const loginUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are not valid',
            });
        }

        // confirm password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res
                .status(400)
                .json({ ok: false, msg: 'Email or password are not valid' });
        }

        // if everything is ok we are now able to generate our jwt
        const token = await generateJWT(user.id, user.name);

        return res
            .status(201)
            .json({ ok: true, u_id: user.id, name: user.name, token });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Please contact the admin',
        });
    }
};

const renewToken = async (req, res = response) => {
    const { u_id, name } = req;

    // generating new token
    const token = await generateJWT(u_id, name);

    res.status(201).json({ ok: true, token, u_id, name });
};

module.exports = { registerUser, loginUser, renewToken };
