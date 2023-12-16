const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if email exists in the database
    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
});
router.post('/myOrderData', async (req, res) => {
    try {
        
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({orderData:myData})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
