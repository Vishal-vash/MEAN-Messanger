var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user')

router.post('/', (req, res, next) => {
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password, 10),
        email : req.body.email
    });
    user.save((err, result) => {
        if(err){
            return res.status(500).json({
                title : "Internal Server Error",
                error : err
            })
        }
        res.status(201).json({
            title : "User added successfully",
            obj : result
        })
    })
})

router.post('/signin', (req, res, next) => {
    User.findOne({email : req.body.email}, (err, user) => {
        if(err){
            return res.status(500).json({
                title : 'Internal Server Error',
                error : err
            })
        }
        if(!user){
            return res.status(401).json({
                title : 'Email address not found',
                error : {message : "User can not be found with given email address"}
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title : "Password doesn't match",
                error : {message : "Password entered is incorrect"}
            })
        }
        const token = jwt.sign({user : user}, 'secretkey', {expiresIn : 3600});
        res.status(201).json({
            title : "Successfully Signed In",
            token : token,
            userId : user._id
        })
    })
})


module.exports = router