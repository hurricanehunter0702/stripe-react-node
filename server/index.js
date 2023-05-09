const express = require('express')
require('dotenv').config()
const stripe = require('stripe')('sk_test_51LyDugD9UnFHOWqaPq9DI6nVQOtKiaZTwe6Amvs9tMXjD1vpOLD25G5xo70oAzAK2ck84C2OvxZi20nO9FJdBmBm00an1erjS2')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Payment',
      payment_method: id,
      confirm: true
    })
    console.log('Payment', payment)
    res.json({
      message: 'Payment was successful',
      success: true
    })
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false
    })
  }
})
app.listen(5000, () => {
  console.log('server is running')
})