const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    // console.log(global.food_items, global.foodCategory);
    res.send([global.food_items, global.foodCategory]); // Send both food_items and foodCategory
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});


module.exports = router;