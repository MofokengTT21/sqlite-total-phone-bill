const express = require("express");
const app = express();

app.get("/test", (req, res) => {
    res.status(200).json({success: true});
})

const PORT = 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`))