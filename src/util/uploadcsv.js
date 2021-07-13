import csv from 'csv-parser'
import fs from 'fs'
import fetch from 'node-fetch'

const csvFilePath = '/Users/irvb/Documents/code/peso/backend/src/util/peso.csv'

const data = []
const error = []
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    let { date, fat, weight, visceralFat, muscle } = row

    const splitDate = date.split('/')
    const dateAux = new Date(splitDate[2], splitDate[1] - 1, splitDate[0])
    if (!fat) fat = '0'
    if (!visceralFat) visceralFat = '0'
    if (!muscle) muscle = '0'
    fat = fat.replace(',', '.')
    weight = weight.replace(',', '.')
    visceralFat = visceralFat.replace(',', '.')
    muscle = muscle.replace(',', '.')
    data.push({ dateAux, fat, weight, visceralFat, muscle })
    /**
     * DEV
     */
    // fetch('http://localhost:3000/weights', {
    //     method: 'POST',
    //     body:    JSON.stringify({ dateAux, fat, weight, visceralFat, muscle }),
    //     headers: { 'Content-Type': 'application/json',
    //     'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZThiMTMyM2JjODU0M2MxYzg5NDFhYSIsImlhdCI6MTYyNTg2MzMyNCwiZXhwIjoxNjI1OTQ5NzI0fQ.E8veH34EaliU_shzbv26XAJ68Un41Rj7sxetuI06yak' },
    // })
    // .then(res => res.json())
    // .then(json => ´);
    /**
     * PRO
     */
    fetch('https://weight-server.herokuapp.com/weights', {
      method: 'POST',
      body: JSON.stringify({ dateAux, fat, weight, visceralFat, muscle }),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTg4NWEzMWUyOWZiMDAxNTVkZWQwNCIsImlhdCI6MTYyNTg2NTQ3OSwiZXhwIjoxNjI1OTUxODc5fQ.MqvVT1gSQwIe3lcYLiHdMFy4QkDmbVIu3qweKZs6us4'
      }
    })
      .then(res => res.json())
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
    console.log(data.length)
  })
