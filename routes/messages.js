var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
        .populate('user', {firstName : 'firstName', lastName : 'lastName'})
        .exec((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An Error Occured',
                    error: err
                })
            }
            res.status(200).json({
                message: "Messages Received Successfully",
                obj: result
            })
        })
})

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: "Not Authorised",
                error: err
            })
        }
        next();
    })
})

router.post('/', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'An Error Occurred',
                error: err
            })
        }
        var message = new Message({
            content: req.body.content,
            user : user
        });
        message.save((err, msg) => {
            if (err) {
                return res.status(500).json({
                    title: "An Error Occured",
                    error: err
                })
            }
            user.messages.push(msg);
            user.save();
            res.status(201).json({
                message: 'Message Saved Successfully !!',
                obj: msg
            })
        })
    })
})

router.patch('/:id', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    console.log("Decoded JWT : " + decoded);
    Message.findById(req.params.id, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: "Internal Server Error",
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: "No Message",
                error: { message: "Message not found" }
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title : "Unauthorised",
                error : {message : "User is not authorised"}
            })
        }
        message.content = req.body.content;
        message.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: "An Error Occured",
                    error: err
                })
            }
            res.status(201).json({
                message: 'Message Updated Successfully !!',
                obj: result
            })
        })
    })
})

router.delete('/:id', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, (err, msg) => {
        if (err) {
            return res.status(500).json({
                title: "An Internal Server Error Occured",
                error: err
            })
        }
        if (!msg) {
            return res.status(404).json({
                title: "No Message Found",
                error: err
            })
        }
        if(msg.user != decoded.user._id){
            return res.status(401).json({
                title : "Unauthorised",
                error : {message : "User is not authorised"}
            })
        }
        msg.remove((err, result) => {
            if (err) {
                return res.send(500).json({
                    title: "Server Error",
                    error: err
                })
            }
            res.status(200).json({
                message: "Message Deleted Successfully",
                obj: result
            })
        })
    })
})

module.exports = router;