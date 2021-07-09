import jwt from 'jsonwebtoken'
import Roles from '../models/Roles.js'
import User from '../models/User.js'

export const veriftToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return res.status(403).json({ message: 'No token provided' })

    const decode = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decode.id, { password: 0 })
    req.userId = decode.id

    if (!user) return res.status(403).json({ message: 'No user found' })
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unautorized' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, { password: 0 })
    const roles = await Roles.find({ _id: { $in: user.roles } })
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }
    return res.status(401).json({ message: 'Unautorized role' })
  } catch (err) {
    res.status(401).json({ message: 'Unautorized' })
  }
}
