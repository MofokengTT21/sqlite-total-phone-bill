const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors()); 
const db = require("./db/pricePlans");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
 
function calculateTotalBill(actions, pricePlanData) {
    const { sms_price, call_price } = pricePlanData;
    const { smsCount, callDurationSeconds } = actions; 
    const total = (smsCount * sms_price) + (callDurationSeconds * (call_price / 60));
    return total;
};

// Calculate Phone bill
app.post("/api/phonebill/", async (req, res) => {
    const { price_plan, smsCount, callDurationSeconds } = req.body; 
    const pricePlanData = await db.getPricePlanByName(price_plan); 
    const total = calculateTotalBill({ smsCount, callDurationSeconds }, pricePlanData);
    res.status(200).json({ total }); 
});

// Create a Price plan
app.post("/price_plans", async (req, res) => {
    const results = await db.createPricePlan(req.body);
    res.status(200).json({id: results[0]});
});

// Return list of all Price plans
app.get("/price_plans", async (req, res) => {
    const pricePlans = await db.getAllPricePlans();
    res.status(200).json({pricePlans});
});

// Update a Price plan
app.patch("/price_plans/:id", async (req, res) => {
    const id = await db.updatePricePlan(req.params.id, req.body);
    res.status(200).json({id});
});

// Delete a Price plan
app.delete("/price_plans/:id", async (req, res) => {
    await db.deletePricePlan(req.params.id);
    res.status(200).json({ success: true });
});

  
PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`))