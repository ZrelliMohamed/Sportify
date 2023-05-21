const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51N81TcDhD2qNY2jvrdqAlVPIJmymmjOv9l0QaO6HvkC5TyDq9YVXr8c6gOE9njj2eGqH6hZY8QUJpPKZESSOBpB600FmrtLbnn ')

router.post('/intents',async(req,res)=>{
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:req.body.amount,
    currency:'usd',
    automatic_payment_methods:{
        enabled:true
    }
})
res.json({paymentIntent:paymentIntent.client_secret})  
} catch (e) {
    res.json(e)
}
    
})





module.exports = router