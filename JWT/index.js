const express = require('express');
const app = express();

app.use(express.json());

app.post("/api/TestValidation", (req, res) => {
    res.json({ message: "Test endpoint working" });
});

const PORT = 3001;  // Changed from 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});