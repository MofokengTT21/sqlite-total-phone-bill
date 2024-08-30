const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors()); 
const db = require("./db/pricePlans");
const knex = require("./db/knex");
app.use(express.json());

const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
    scheduleDataReset();
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
    scheduleDataReset();
});

// Delete a Price plan
app.delete("/price_plans/:id", async (req, res) => {
    await db.deletePricePlan(req.params.id);
    res.status(200).json({ success: true });
    scheduleDataReset();
});

const resetInterval = 2 * 60 * 1000;
let resetTimeout = null; 

function resetData() {
  const initialDataPath = path.join(__dirname, 'db', 'initialData.json');
  const data = fs.readFileSync(initialDataPath, 'utf8');
  const initialData = JSON.parse(data);
  knex.transaction(trx => {
    return trx('pricePlans').del()  
      .then(() => {
        return trx('pricePlans').insert(initialData); 
      });
  })
  .then(() => {
    console.log('Data reset and repopulated successful!');
  })
  .catch(error => {
    console.error('Error resetting and repopulating data:', error);
  });
  resetTimeout = null;
}

function scheduleDataReset() {
    if (!resetTimeout) { 
        resetTimeout = setTimeout(resetData, resetInterval);
    }
}

PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));