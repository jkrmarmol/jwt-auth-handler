require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const Users = require('./Users.model');
const authRouters = express.Router();
const bcrypt = require('bcrypt');

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}, async (payload, done) => {
  const {username, password} = payload;
  const checkUserInfo = await Users.findOne({username})
  if (!checkUserInfo) {
    done(null, false)
  } else {
    const decodePassword = await bcrypt.compare(password, checkUserInfo.password);
    if (decodePassword) {
      done(null, await checkUserInfo)
    } else {
      done(null, false)
    }
  }
}))

authRouters.get('/', (req, res, next) => {
  res.send('test')
})

authRouters.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const checkUser = await Users.findOne({username})
    if (checkUser) {
      const checkPassword = await bcrypt.compare(password, checkUser.password)
      if (checkPassword) {
        const token = jwt.sign({username, password}, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 60});
        res.json({token})
      } else {
        res.status(401).json({
          message: 'Username & Password Incorrect.'
        })
      }
    } else {
      res.status(400).json({
        message: 'Username not found.'
      })
    }
    
  } catch (err) {
    console.log(err)
  }
  
})

authRouters.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const newUser = await new Users({username, password});
    const saveUser = await newUser.save();
    res.json(saveUser)
  } catch (err) {
    res.status(400).json({
      message: err.code === 11000 ? 'Username has been taken by another user!' : 'Please try again later',
      code: err.code
    })
  }
})

authRouters.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json('Hello World')
})


module.exports = authRouters;