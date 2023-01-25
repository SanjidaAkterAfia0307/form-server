const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE);
const port = 5000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/create-payment-intent', async (req, res) => {
    const booking = req.body;
    const price = booking.price;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount,
      "payment_method_types": [
        "card"
      ]
    });
    res.send({
      clientSecret: paymentIntent.client_secret,

    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})