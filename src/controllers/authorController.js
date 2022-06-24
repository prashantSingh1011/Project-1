const jwt = require('jsonwebtoken')
const Author = require("../models/authorModel")
const valid=require('validator')

const createAuthor = async function (req, res) {
    let data = req.body
    if (!data)
        return res
            .status(400)
            .send({ status: false, msg: "please input details " })
    if (!data.firstName)
        return res
            .status(400)
            .send({ status: false, msg: " Please enter First Name(Required Field)" })
    if (!data.lastName)
        return res
            .status(400)
            .send({ status: false, msg: " Please enter Last Name(Required Field)" })
    if (!data.title)
        return res
            .status(400)
            .send({ status: false, msg: " Please enter Title (Required Field)" })
    if(emailId) {
    let validate =valid.isEmail(req.body.emailId)
    if(!validate) return res.status(404).send({status: false, msg:"please input valid email id "})
    }

    let savedData = await Author.create(data)
    res.send({ status: true, msg: savedData })
}

const loginAuthor = async function (req, res) {
    try {
        let username = req.body.emailId
        let pass = req.body.password
        let user = await Author.findOne({ email: username, password: pass })
        if (!user) res.status(400).send({ status: false, msg: "User id or password incorrect" })
        let token = jwt.sign({
            userId: user._id.toString(),
            project: "project 1",
            organisation: "FunctionUp",
        }, "Project1-Blogs");
        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, token: token, authorId: user._id });
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }
}



module.exports.loginAuthor = loginAuthor

module.exports.createAuthor = createAuthor;