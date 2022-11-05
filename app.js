const express = require('express');
const connectDB = require('./BD/connection');
require('dotenv').config()
const { userRouter, productRouter, commentRouter, authRouter } = require('./modules/index.router');
const app = express()

app.use(express.json())
app.use(userRouter, productRouter, commentRouter, authRouter)

app.use("/api/v1/auth" , authRouter);

connectDB();



app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT} ...`);
})
