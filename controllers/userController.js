const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var UserModel = require('../models/userModel.js');
const {decode} = require("jsonwebtoken");
const AddressModel = require("../models/polnilnice/addressModel");
const secretKey = 'your-secret-key'; // Poskrbite, da je to močan skrivni ključ



/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            ž : "path..."
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
            //return res.redirect('/users/login');
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;
            user.email = req.body.email ? req.body.email : user.email;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.update()
     */
    changeAvatar: function (req, res) {
        const token = req.cookies.jwt; // Preberemo JWT iz piškotka
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            }

            const userId = decoded.id; // Pridobimo ID uporabnika iz dekodiranih podatkov JWT

            UserModel.findOne({_id: userId}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user',
                        error: err
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                // Check if a new avatar file was uploaded
                if (req.file) {
                    // Set new pathToAvatar based on uploaded file
                    user.pathToAvatar = "/images/" + req.file.filename;
                }

                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating user.',
                            error: err
                        });
                    }

                    return res.json(user);
                });
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var username = req.body.username;

        UserModel.findOneAndRemove({username: username}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showRegister: function(req, res){
        res.render('user/register');
    },

    showLogin: function(req, res){
        res.render('user/login');
    },

    login: function(req, res, next){
        UserModel.authenticate(req.body.username, req.body.password, function(err, user) {
            if (err || !user) {
                const error = new Error('Wrong username or password');
                error.status = 401;
                return next(error);
            }
            const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful', token: token, user: user });
        });
    },

    profile: function(req, res,next){
        const token = req.cookies.jwt; // Preberemo JWT iz piškotka
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            }

            const userId = decoded.id; // Pridobimo ID uporabnika iz dekodiranih podatkov JWT

            UserModel.findById(userId)
                .exec(function(error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        if (user === null) {
                            var err = new Error('Not authorized, go back!');
                            err.status = 400;
                            return next(err);
                        } else {
                            return res.json(user);
                        }
                    }
                });
        });
    },

    logout: function(req, res, next){
        // Če želite izbrisati piškotek, morate nastaviti isto ime in pot kot pri nastavitvi piškotka
        res.clearCookie('jwt'); // Brišemo piškotek, ki vsebuje JWT
        return res.status(201).json({}); // Vrnemo prazen odgovor
    },

    /**
     * userController.protected()
     */
    protected: function(req, res, next) {
        const tokenHeaderKey = 'jwt-token';
        const token = req.headers[tokenHeaderKey];

        if (!token) {
            return res.status(401).send('Token missing');
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            }

            const userId = decoded.id;
            //const username = decoded.username;
            //const mail = decoded.email;
            //const path = decoded.pathToAvatar;

            UserModel.findById(userId)
                .exec(function(error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        if (user === null) {
                            var err = new Error('Not authorized, go back!');
                            err.status = 400;
                            return next(err);
                        } else {
                            res.json(user);
                        }
                    }
                });
            //res.json({ id: userId, username: username, email: mail});
        });
    }

};
