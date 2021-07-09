import Weight from '../models/Weight.js'

export const createWeight = async (req, res) => {
  console.log(req.body)
  const { date, fat, weight, visceralFat, muscle } = req.body

  const newWeight = new Weight({ date, fat, weight, visceralFat, muscle })

  try {
    const saveWeighr = await newWeight.save()
    res.status(201).json(saveWeighr)
  } catch (e) {
    res.status(400).json('error')
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
