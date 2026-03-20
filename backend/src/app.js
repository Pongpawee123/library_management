const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// import Routes ที่สร้างไว้
const authRoute    = require("./routes/authRoute.js");
const accountRoute = require("./routes/accountRoute.js");
const authorRoute = require('./routes/authorRoute.js');
const bookRoute = require('./routes/bookRoute.js');
const borrowRoute = require('./routes/borrowRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const publisherRoute = require('./routes/publisherRoute.js');
const reportRoute = require('./routes/reportRoute.js');
const userRoute = require('./routes/userRoute.js');


const app = express();
app.use(cors());
app.use(express.json());

// ทดสอบ server ทำงาน
app.get("/", (req, res) => {
    res.send("Library API running");
});

// เชื่อม Routes
app.use("/api/auth",    authRoute);
app.use("/api/account", accountRoute);
app.use("/api/authors", authorRoute);
app.use("/api/books",   bookRoute);
app.use('/api/borrows', borrowRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/publishers', publisherRoute);
app.use('/api/reports', reportRoute);
app.use('/api/users', userRoute);

// เริ่ม server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
