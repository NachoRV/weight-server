import Weight from '../models/Weight.js'
import fs from 'fs'
const logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

export const createWeight = async (req, res) => {
  const { date, fat, weight, visceralFat, muscle } = req.body
  const userId = req.userId
  console.log('userId', req.userId)
  const newWeight = new Weight({ date, fat, weight, visceralFat, muscle, userId })
  try {
    const saveWeighr = await newWeight.save()
    logger.write("*******************************************\n")
    logger.write(JSON.stringify(req.body)+ "\n")
    res.status(201).json(saveWeighr)
  } catch (e) {
    logger.write("*******************************************\n")
    logger.write(JSON.stringify(e) + "\n")
    logger.write(JSON.stringify(req.body)+ "\n")
    res.status(400).json(e)
  }
}
export const getWeights = async (req, res) => {
  const weights = await Weight.find()

  res.status(200).json(weights)
}
export const getWeightById = async (req, res) => {
  const weight = await Weight.findById(req.params.weightId)
  res.status(200).json(weight)
}
export const updateWeightById = async (req, res) => {
  const updateWeighr = await Weight.findOneAndUpdate(req.params.weightId, req.body, {
    new: true
  })
  res.status(200).json(updateWeighr)
}
export const deleteWeightById = async (req, res) => {
  const deleteWeight = await Weight.findByIdAndDelete(req.params.weightId)
  res.status(200).json(deleteWeight)
}
