const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server');
const {JWT_SECRET} = require('../config/env.json')

module.exports = (context) => {
  if(context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      console.log(decodedToken)
      context.user = decodedToken
    })
  }
  return context
}