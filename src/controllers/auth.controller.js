import User from '../models/User.js'
import Role from '../models/Roles.js'
import jwt from 'jsonwebtoken'

export const singUp = async (req, res) => {
  const { username, email, password, roles } = req.body

  // git show-refconst findUser = User.find({ email })
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: 'user' })
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()
  console.log(process.env.SECRET)
  const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, { expiresIn: '8d' })
  res.status(200).json({ token })
}

export const singIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles')
  console.log(userFound)

  if (!userFound) return res.status(400).json('User not found')

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) return res.status(401).json('Invalid User/Password')

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, { expiresIn: 86400 })
  res.status(200).json({ token })
}
