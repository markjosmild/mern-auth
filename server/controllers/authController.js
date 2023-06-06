const Users = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working!')
}

// register endpoint
const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body

        //check username
        if (!username) {
            return res.json({
                error: 'Username is not defined!'
            })
        }

        // check password
        if (!password && password.length < 6) {
            return res.json({
                error: 'Password must be atleast 6 characters long!'
            })
        }

        // check email if existed already
        const emailExisted = await Users.findOne({ email })

        if (emailExisted) {
            return res.json({
                error: 'Email existed already!'
            })
        }

        const hashedPassword = await hashPassword(password)

        // create user in database
        const createUser = await Users.create({
            username,
            email,
            password: hashedPassword
        })

        return res.json(createUser)

    } catch (error) {
        console.log(error)
    }
}

// login endpoint
const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body

        //check if user exists
        const user = await Users.findOne({ email })
        if(!user) {
            return res.json({
                error: 'No user found!'
            })
        }

        //check if password match
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        } else {
            res.json({
                error: 'Password do not match!'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// getprofile endpoint
const getProfile = (req, res) => {
    const {token} = req.cookies

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}